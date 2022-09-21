import ApiError from '../error/ApiError.js'

export default function (err, req, res, next) {
    if (err instanceof ApiError ) {
        return res.status(err.status).json({status: err.status, message: err.message})
    }

    console.log(err);

    return res.status(500).json({ message: 'Unexpected error'})
}