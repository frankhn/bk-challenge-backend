import {
  Model,
  DataTypes,
} from 'sequelize';
import db from '../../database/models';

export interface CountryAttributes {
  id?: string
  title: string
  description: string
}

class Job extends Model
  implements CountryAttributes {

  public title!: string
  public description!: string

  // Auto generated
  public id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;



  public static associations: {
  };
}

Job.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 100],
        msg: 'title must be descriptive'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [3, 500],
        msg: 'description must be descriptive'
      }
    }
  },
}, {
  sequelize: db.sequelize,
  tableName: 'jobs'
})


export default Job;
