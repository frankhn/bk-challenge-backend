import {
  Model,
  DataTypes,
} from 'sequelize';
import db from '../../database/models';

export interface CountryAttributes {
  id?: string
  userid: number
  jobid: number
}

class Application extends Model
  implements CountryAttributes {

  public jobid!: number
  public userid!: number

  // Auto generated
  public id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;



  public static associations: {
  };
}

Application.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db.sequelize,
  tableName: 'applications'
})


export default Application;
