import * as functions from 'firebase-functions'
import { createTransport } from 'nodemailer'

const config = functions.config().email

const transporter = createTransport(config)

interface Message {
    to: string
    subject: string
    body: string
}

async function sendMail({ to, subject, body }: Message) {
    await transporter.sendMail({
        from: {
            name: 'DonateABLE',
            address: config.auth.user,
        },
        to: to,
        subject: subject,
        html: body,
    })
}

export const helloWorld = functions.https.onRequest(async (request, response) => {
    await sendMail({
        to: "adambibby00@gmail.com",
        subject: "new message",
        body: "a new message body",
    })
    response.send(JSON.stringify(config));
});
