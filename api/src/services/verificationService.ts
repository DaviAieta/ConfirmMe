import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendMail = async (to: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
        })

        const mailOptions = {
            from: `"ConfirmMe" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent:', info.messageId)
    } catch (error) {
        console.log(error)
    }
}