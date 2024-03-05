import * as crypto from 'crypto';
import express from 'express';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

const { DOCKER_USER, DOCKER_PAT, COMPOSE_FILE_DIR, COMPOSE_FILE_NAME, COMPOSE_PROJECT, WEBHOOK_SECRET } = process.env;

const main = express();
main.use(express.json());

main.post('/webhook', async (request, res) => {
    if (!verify_signature(request)) {
        res.status(401).send("Unauthorized");
        return;
    }

    res.status(202).send('Accepted');

    const githubEvent = request.headers['x-github-event'];

    info(`Received event: ${ githubEvent }`);

    if (githubEvent.includes('workflow_run')) {
        const { workflow, workflow_run } = request.body;

        if (workflow.name === 'Docker Image CI' && workflow_run.conclusion === 'success') {
            info('Github image build job succeeded, pulling and redeploying...');
            await execPromise(`docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v ${ COMPOSE_FILE_DIR }:/compose docker:cli /bin/sh -c "`
                + `docker login -u ${ DOCKER_USER} -p ${ DOCKER_PAT }; `
                + `docker compose -p ${ COMPOSE_PROJECT } -f ./compose/${ COMPOSE_FILE_NAME } up -d"`);
            info('Deployment Successful.');
        }
    } else {
        info(`Skipped handling ${ githubEvent }`);
    }
});

// Start the server
const port = 8111;
main.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});

const verify_signature = (req) => {
    const signature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted =  Buffer.from(req.headers['x-hub-signature-256'], 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
};


const info = (message: string) => {
    const now = new Date();
    console.log(`INFO - ${now.toLocaleDateString()} ${now.toLocaleTimeString()} - ${ message }`);
}

process.on("SIGINT", () => {
    info("Ctrl-C was pressed, exiting!");
    process.exit();
});

process.on("SIGTERM", () => {
    info("SIGTERM received... exiting!");
    process.exit();
});

process.on("SIGKILL", () => {
    info("SIGKILL received... exiting!");
    process.exit();
});
