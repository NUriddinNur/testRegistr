import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import models from '../models/model.js'
import generateJwt from '../utils/generateJwt.js'
import {Op} from "sequelize"


class UserController {
    async register (req, res, next) {
        const {fullName, userName, phone, password, email} = req.body
        const hashPassword = await bcrypt.hash(password, 2)

        let checkUser = await models.User.findOne({where: {userName}})
        let checkEmail = await models.User.findOne({where: {email}})
        let checkUserAndEmail = await models.User.findOne({where: {[Op.and]: [{userName}, {email}]}})


        if(checkUserAndEmail) {
            return next(ApiError.badRequest('Bu elektron pochta va foydalanuvchi nomi allaqachon mavjud !'))
        }
        if(checkUser) {
            return next(ApiError.badRequest('Bu foydalanuvchi nomi allaqachon mavjud !'))
        }
        if(checkEmail) {
            return next(ApiError.badRequest('Bu elektron pochta allaqachon mavjud !'))
        }


        let user = await (await models.User.create({fullName, userName, email, phone, password: hashPassword})).toJSON()
        user.token = generateJwt(user.id)
        delete user.password
        return res.status(200).json({message: "Muvafaiyatli ro'yhatdan o'tdingiz !", status: 200, user})
    }


    async login(req, res, next) {
        let {email, password} = req.body
        let user = await models.User.findOne({where: {email}})
        
        if(!user) {
            return next(ApiError.badRequest("Email topilmadi !"))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword) {
            return next(ApiError.badRequest("Parol noto'g'ri kiritildi !"))
        }

        const token = generateJwt(user.id, user.role)
        return res.status(200).json({ message: "Foydalunivchi sahifasiga muvafaqiyatli kirildi !", status: 200, token })
    }


    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.role)
        return res.status(200).json({ status: 200, token})
    }

    async getAll(req, res) {

        let {limit, page } = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit

        const users = await models.User.findAndCountAll({ attributes: ["id", "fullName", "userName", "phone", "email"], limit, offset})
        return res.status(200).json({message: 'Users !', status: 200, data: users})
    }

    async forgetPassword(req, res) {
        let {email} = req.body

        email = models.User.findOne({where: { email }})


        if(email) {
            return next(ApiError.badRequest("Email topilmadi !"))
        }

        console.log(email);
    }
} 

export default new UserController()