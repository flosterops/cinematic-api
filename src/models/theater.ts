import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { db } from '../db/connection';

class Theater extends Model<InferAttributes<Theater>, InferCreationAttributes<Theater>> {
  id: number;
  name: string;
  // tslint:disable-next-line:variable-name
  number_of_seats: number;
  age: number;

  static associate(models: any) {
    // define association here
  }
}

Theater.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      defaultValue: '',
    },
    number_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize: db.sequelize, tableName: 'theater' }
);

Theater.sync();

export { Theater };
