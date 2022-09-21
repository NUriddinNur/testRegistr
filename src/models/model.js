import sequelize from '../utils/db.js'
import {DataTypes} from 'sequelize'

const User = sequelize.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    fullName: {type: DataTypes.STRING, allowNull: false},
    userName: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false}
})

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    userId: {type: DataTypes.UUID, allowNull: false},
    token: {type: DataTypes.STRING, allowNull: false}
})

export default {
    Token,
    User
}