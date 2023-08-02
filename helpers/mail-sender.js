const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendEmail = async (email) => {
    try {
        const mailSent = await transporter.sendMail({
            text: "Obrigado por se cadastrar em meu site",
            subject: "Cadastro em um novo site",
            from: "Blog <noreplyfrontblog@gmail.com>",
            to: email,
            html: `
                <html>
                    <body>
                        <table
                            style="
                                width: 100%;
                                height: 100vh;
                                background-color: #f5f5f5;
                                text-align: center;
                            "
                        >
                            <tr>
                                <td>
                                    <div
                                        style="
                                            max-width: 600px;
                                            margin: 0 auto;
                                            background-color: #fff;
                                            padding: 20px;
                                            border-radius: 10px;
                                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                                            font-family: Arial, Helvetica, sans-serif;
                                        "
                                    >
                                        <h1 style="color: #007bff; font-size: 2.5rem;">
                                            Olá, obrigado por se cadastrar em nosso site!
                                        </h1>
                                        <p style="font-family: Arial, sans-serif; font-size: 1.5rem">
                                            Aqui está uma mensagem personalizada para você.
                                        </p>
                                        <a
                                            href="https://blog-frontend-eosin.vercel.app/"
                                            target="_blank"
                                            ><button
                                                style="
                                                    background: #007bff;
                                                    border: 1px solid #007bff;
                                                    padding: 1rem;
                                                    border-radius: 0.5rem;
                                                    color: white;
                                                    font-size: 1rem;
                                                    cursor: pointer;
                                                "
                                            >
                                                Visite nosso site
                                            </button></a
                                        >
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </body>
            </html>
            `
        })

        console.log(mailSent)
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendEmail
