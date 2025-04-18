import nodemailer from "nodemailer";



export var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export async function callToDeveloper(error) {
    try {

        const developerEmails = process.env.DEVELOPER_EMAILS.split(',');
        const emailHost = process.env.EMAIL_HOST;
        const emailPort = process.env.EMAIL_PORT;
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        // بررسی وجود متغیرهای محیطی
        if (!developerEmails || !emailHost || !emailPort || !emailUser || !emailPass) {
            console.error("Error: Email configuration is incomplete in .env file.");
            return;
        }


         const info = await transport.sendMail({
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }catch (e) {
        console.log(e)
        console.log("error on send email to admins")
    }


}