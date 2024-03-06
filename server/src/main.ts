import express from 'express';
import { writeFileSync } from 'node:fs';
import { format } from 'date-fns';

const app = express();

const host = process.env['HOST'] ?? 'localhost';
const frontendPort = process.env['FRONTEND_PORT'] ?? 8157;
const corsUrl = `http://${ host }:${ frontendPort }`;

console.info(`Allowing CORS from ${ corsUrl }`);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", corsUrl);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.get('healthy', (req, res) => {
    res.send('Healthy');
});

app.post('/contact', (req, res) => {
    writeFileSync(
        `data/contact-entry-${format(new Date(), 'dd-MM-yyyy-hhmmss') }.json`,
        JSON.stringify(req.body, null, 4)
    );
    res.send({});
});

// Start the server
const port = 8158;
app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});

process.on("SIGTERM", () => {
    console.log("Ctrl-C was pressed");
    process.exit();
});
