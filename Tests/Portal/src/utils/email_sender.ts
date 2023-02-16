const nodemailer = require('nodemailer');
export class EmailSender {

    static async transporter() {
        return nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: '***********',
                pass: '***********'
            }
        });
    }

    static async getMailOptions() {
        return {
            from: 'durgaprasad555555@gmail',
            to: 'vemula.d.prasad.tpr@vialto.com',
            subject: 'this testing mail from automation',
            html: `<h2 style="color:#ff6600;">Hello People!, 
                      Welcome to Vialto!</h2>`,
            attachments: [
                { filename: 'test.js', path: './resources/test.js' }
            ]
        }
    }

    static async sendMail() {
        const transporter = await this.transporter();
        transporter.sendMail(this.getMailOptions(), function (error, info) {
            if (error) {
                console.log(error);

            } else {
                console.log("email sent: " + info.message);
            }
        });
    }

}