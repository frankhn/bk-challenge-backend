import bcrypt from 'bcryptjs';
import {
    Model,
    DataTypes,
} from 'sequelize';
import db from '../../database/models';
/**
 * User Class Model
 */
class User extends Model {
    public id!: number;
    public email!: string;
    public firstname!: string;
    public lastname!: string;
    public age!: string;
    public address!: string
    public gender!: string
    public birthdate!: string;
    public phone!: string
    public password!: string
    public cv!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: {};
}

User.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        phone: DataTypes.STRING,
        birthdate: {
            type: DataTypes.STRING,
        },
        password: DataTypes.STRING,
        cv: DataTypes.STRING

    },
    {
        sequelize: db.sequelize,
        tableName: 'users',
    },
);

User.beforeCreate((data) => {
    if (data.password) {
        data.password = bcrypt.hashSync(data.password, 10);
    }
});

export default User;
