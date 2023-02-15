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
  reserved: boolean;

  static associate(models: any) {
    // define association here
    this.hasMany(models.Ticket, { foreignKey: 'seatId' });
    this.belongsTo(models.Theater, {
      foreignKey: 'theaterId',
    });
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
    reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'seat',
    createdAt: false,
    updatedAt: false,
  }
);

export { Seat };
