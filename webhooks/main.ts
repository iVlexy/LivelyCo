import express from 'express';
import * as crypto from 'crypto';

const WEBHOOK_SECRET: string = process.env.WEBHOOK_SECRET;

const main = express();
main.use(express.json());

main.post('/webhook', (request, res) => {
    if (!verify_signature(request)) {
        res.status(401).send("Unauthorized");
        return;
    }

    res.status(202).send('Accepted');

    const githubEvent = request.headers['x-github-event'];

    if (githubEvent.includes('workflow_run')) {
        const workflow = request.body.workflow;
        console.log(request.body);
    }
});

// Start the server
const port = 8111;
main.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});

const verify_signature = (req: Request) => {
    const signature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted =  Buffer.from(req.headers.get("x-hub-signature-256"), 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
};
