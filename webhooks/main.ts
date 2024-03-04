import express from 'express';
import * as crypto from 'crypto';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execPromise = promisify(exec);

const WEBHOOK_SECRET: string = process.env.WEBHOOK_SECRET;
const DOCKER_USER = process.env.DOCKER_USER;
const DOCKER_PAT = process.env.DOCKER_PAT;

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
            info('Github image build job succeeded, pulling...');
            await execPromise('docker pull ethanbrowning/livelyfencing:latest');
            info('Pulled image, deploying...');
            await execPromise('docker container restart livelyco')
            info('Deployment Successful.');
        }
    } else {
        info(`Skipped handling ${ githubEvent }`);
    }
});

// Start the server
const port = 8111;
main.listen(port, async () => {
    console.log(`Server listening on port ${ port }`);
    await execPromise(`docker login -u ${ DOCKER_USER } -p ${ DOCKER_PAT }`);
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
