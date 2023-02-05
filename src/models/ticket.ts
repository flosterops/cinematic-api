import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { db } from '../db/connection';

class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  id: number;
  price: number;

  static associate(models: any) {
    // define association here
  }
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize: db.sequelize, tableName: 'ticket' }
);

Ticket.sync();

export { Ticket };
