import express from 'express';
import { writeFileSync } from 'node:fs';
import { format } from 'date-fns';
import nodemailer from 'nodemailer'
import { readFileSync } from 'fs';

const app = express();

const user = process.env['USER_EMAIL'];
const pass = process.env['USER_PASS'];
const sendTo = process.env['SEND_TO'];
const host = process.env['HOST'] ?? 'localhost';
const frontendPort = process.env['FRONTEND_PORT'] ?? 8157;
const corsUrl = `http://${host}:${frontendPort}`;

const main = async () => {

    console.info('Logging into email...');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    });

    await transporter.verify()
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
    console.info('Successfully logged into email!');

    console.info(`Allowing CORS from ${corsUrl}`);

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", corsUrl);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.json());

    app.get('/healthy', (req, res) => {
        res.send('Healthy');
    });

    app.post('/contact', async (req, res) => {
        writeFileSync(
            `data/contact-entry-${format(new Date(), 'dd-MM-yyyy-hhmmss')}.json`,
            JSON.stringify(req.body, null, 4)
        );
        try {
            const message = req.body
            let html = readFileSync('./src/QuoteBot.html', 'utf-8');
            html = html.replace("$NAME", message.name).replace("$PHONE", message.phone).replace("$EMAIL", message.email).replace("$SERVICES", message.selectedServices.join(', ')).replace("$DESCRIPTION", message.description);
            await transporter.sendMail({
                from: `"Lively Fencing Bot" <${user}>`,
                to: sendTo,
                subject: "New Quote Request",
                html,
            });
            console.info(`Sent email successfully to ${sendTo}`);
            res.send({ message: 'Success' });
        } catch (error) {
            console.log('\n');
            console.info("ERROR: failed to send email");
            console.error(error);
            res.status(500);
            res.send({ message: 'Something went wrong' });
        }
    });
    // Start the server
    const port = 8158;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
main();

process.on("SIGTERM", () => {
    console.log("Ctrl-C was pressed");
    process.exit();
});


