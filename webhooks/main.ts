import express from 'express';

const main = express();
main.use(express.json());

main.post('/webhook', (request, res) => {
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
