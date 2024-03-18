import nodemailer from 'nodemailer';

const user = process.env['USER_EMAIL'];
const pass = process.env['USER_PASS'];

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
});

export const verifyTransporter = async () => {
    console.info('Logging into email...');
    await transporter.verify()
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
    console.info('Successfully logged into email!');
}
