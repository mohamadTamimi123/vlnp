import nodemailer from "nodemailer";


export function callToDeveloper(error) {
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


        const transporter = nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            secure: false, // true for 465, false for other ports
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: emailUser,
            to: developerEmails,
            subject: 'خطا در برنامه',
            text: `پیام خطا:\n\n${error}`,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }catch (e) {
        console.log("error on send email to admins")
    }


}