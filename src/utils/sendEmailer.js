import nodeEmailer from 'nodemailer'
import ApiError from '../error/ApiError.js'
import dotenv from 'dotenv'

dotenv.config()


export default async (email, subject, text) => {
    try {
        const transporter = nodeEmailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.PASS
            }
        })

        let a = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: "Parolni tiklash uchun tasdiqlash kodi: " + text
        })

        console.log("Emailga habar yuborildi !");
    } catch (e) {
        ApiError.internal(e.message)
    }
}
