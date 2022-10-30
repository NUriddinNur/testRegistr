import ApiError from '../error/ApiError.js'
import models from '../models/model.js'
import otpGenerator from 'otp-generator'
import sendEmail from '../utils/sendEmailer.js'
import { RESET_PASS_INPUT } from '../utils/validation.js'
import model from '../models/model.js'
import bcrypt from 'bcrypt'


class passwordReset {
    async passwordReset(req, res, next) {
        try {
            let { email } = req.body
            const user = await models.User.findOne({ where: { email }, attributes: ["id", "fullName", "userName", "phone", "email"] })

            if (!user) {
                return next(ApiError.badRequest("Email topilmadi !"))
            }

            await models.Token.destroy({ where: { userId: user.id } })
            let token = await models.Token.create({ userId: user.id, token: otpGenerator.generate(6, { specialChars: false }) })

            sendEmail(user.email, 'Parolni tiklash', token.token)
            return res.status(200).json({ status: 200, message: "Tasdiqlash kodi pochta manzilingizga yuborildi !", user })
        } catch (e) {
            ApiError.internal(e.message)
        }
    }

    async resetPass(req, res, next) {
        try {
            let user = await models.User.findOne({ where: { id: req.params.userId }, attributes: ["id", "fullName", "userName", "phone", "email"] })
            if (!user) {
                return next(ApiError.badRequest("User topilmadi !"))
            }
    
            let token = await models.Token.findOne({ where: { token: req.params.token } })
            if (!token) {
                return next(ApiError.badRequest("Tasdiqlash kodi noto'g'ri !"))
            }
    
            const {error} = RESET_PASS_INPUT.validate({ body: req.body})
    
            if(error) {
                return next(ApiError.validationError(error.message))
            }
    
            let {password} = req.body
            const hashPassword = await bcrypt.hash(password, 2)
    
            user = await model.User.update(
                {password: hashPassword},
                {where: {id: user.id}}
            )
            return res.status(200).json({status: 200, message: "Parol o'zartirildi !"})
        } catch(e) {
            return next(ApiError.internal(e.message))
        }

    }
}

export default new passwordReset()