import { REGISTER_INPUT, LOGIN_INPUT } from '../utils/validation.js'
import ApiError from '../error/ApiError.js'


export default (req, res, next) => {
    try {
        if(req.url === '/user/register' && req.method === 'POST') {
            const {error} = REGISTER_INPUT.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }

        if(req.url === '/user/login' && req.method === 'POST') {
            const {error} = LOGIN_INPUT.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }

        next()
    }catch(error) {
        next(error)
    }
}