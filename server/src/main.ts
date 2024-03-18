import express from 'express';
import { readFileSync } from 'node:fs';
import nodemailer from 'nodemailer';
import { GoogleAuth } from 'google-auth-library';
import { drive_v3 as drive } from '@googleapis/drive';
import { File } from 'node:buffer';
import { json } from 'stream/consumers';

const app = express();

const user = process.env['USER_EMAIL'];
const pass = process.env['USER_PASS'];
const sendTo = process.env['SEND_TO'];
const host = process.env['HOST'] ?? 'localhost';
const frontendPort = process.env['FRONTEND_PORT'] ?? 8157;
const prod = process.env['NODE_ENV'] != 'production';
const keyFilename = process.env['KEY_FILE']
const driveId = process.env['DRIVE_ID'];

const corsUrl = `${prod ? 'https' : 'http'}://${host}:${frontendPort}`;

const auth = new GoogleAuth({
    keyFilename,
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
});
export const driveApi = new drive.Drive({ auth });

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



    app.get('/AgricultureFencePhotos', async (req, res) => {
            let result = await driveApi.files.list({
                q: `'1jGxjUhtJiGH3wgabdeQ_CH7xMN4uEt1L' in parents`,
                fields: 'files(id)'
            });
            res.send(result.data.files.map(file => file.id))
});


let driveIDs = [
    '1k5vFkZvd5FtKj1JEjjk5B3_-6TRnnZDV', //GatePhotos
    '18G715MLGZtk75leJLUkQ8Vy2-gbtgZq0', //GradingAndGravelPhotos
    '1OR5n7aawS_pcgObDu7dW-hGMO1Vdb5uf', //BarnPhotos
    '1uNdp9Fvbgzla0rCg_bK3f1angzjJ5tUQ', //RetainingWallPhotos
    '1_bWdsFYRHWTBtOT1BVePwm0QRhr-jcqH', //ResidentialFencePhotos
    '1jGxjUhtJiGH3wgabdeQ_CH7xMN4uEt1L'  //AgricultureFencePhotos
]



// Start the server
const port = process.env['BACKEND_PORT'] || 8158;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
}
main();

process.on("SIGTERM", () => {
    console.log("Ctrl-C was pressed");
    process.exit();
});


