import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { db } from '../db/connection';

class Seat extends Model<InferAttributes<Seat>, InferCreationAttributes<Seat>> {
  id: number;
  number: number;
  row: number;
  type: string;
  removable: string;

  static associate(models: any) {
    // define association here
  }
}

Seat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    removable: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
  },
  { sequelize: db.sequelize, tableName: 'seat' }
);

Seat.sync();

export { Seat };
