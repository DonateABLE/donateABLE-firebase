import * as functions from "firebase-functions";
import { createTransport } from "nodemailer";

interface Message {
    to: string;
    subject: string;
    body: string;
}

const config = functions.config().email;
const transporter = createTransport(config);

async function sendMail({ to, subject, body }: Message) {
    await transporter.sendMail({
        from: {
            name: "DonateABLE",
            address: config.auth.user,
        },
        to: to,
        subject: subject,
        html: body,
    });
}

export const testMail = functions.https.onRequest(async (request, response) => {
    await sendMail({
        to: request.query.to,
        subject: "new message",
        body: "a new message body",
    });
    response.send("");
});
