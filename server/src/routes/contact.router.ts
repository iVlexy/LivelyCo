import { Router } from 'express';
import { readFileSync } from 'node:fs';
import { transporter } from '../email/transporter';

const sendTo = process.env['SEND_TO'];
const user = process.env['USER_EMAIL'];

export const contactRouter = Router();

contactRouter.post('/contact', async (req, res) => {
    try {
        const message = req.body
        let html = readFileSync('./src/QuoteBot.html', 'utf-8');
        html = html.replace("$NAME", message.name).replace("$PHONE", message.phone).replace("$EMAIL", message.email).replace("$SERVICES", message.selectedServices.join(', ')).replace("$DESCRIPTION", message.description);
        await transporter.sendMail({
            from: `"Lively Fencing Bot" <${ user }>`,
            to: sendTo,
            subject: "New Quote Request",
            html,
        });
        console.info(`Sent email successfully to ${ sendTo }`);
        res.send({ message: 'Success' });
    } catch (error) {
        console.log('\n');
        console.info("ERROR: failed to send email");
        console.error(error);
        res.status(500);
        res.send({ message: 'Something went wrong' });
    }
});


