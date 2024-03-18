import { drive_v3 as drive } from '@googleapis/drive';
import express from 'express';
import { GoogleAuth } from 'google-auth-library';
import { verifyTransporter } from './email/transporter';
import { contactRouter } from './routes/contact.router';
import { googleImagesRouter } from './routes/google-images.router';
import { healthRouter } from './routes/health.router';

const app = express();

const host = process.env['HOST'] ?? 'localhost';
const frontendPort = process.env['FRONTEND_PORT'] ?? 8157;
const prod = process.env['NODE_ENV'] != 'production';

const corsUrl = `${ prod ? 'https' : 'http' }://${ host }:${ frontendPort }`;

const main = async () => {

    await verifyTransporter();

    console.info(`Allowing CORS from ${ corsUrl }`);

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", corsUrl);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.json());

    app.use(healthRouter);
    app.use(contactRouter);
    app.use(googleImagesRouter);

// Start the server
    const port = process.env['BACKEND_PORT'] || 8158;
    app.listen(port, () => {
        console.log(`Server listening on port ${ port }`);
    });
}
main();

process.on("SIGTERM", () => {
    console.log("Ctrl-C was pressed");
    process.exit();
});


