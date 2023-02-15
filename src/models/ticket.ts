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

  static associate(models: any) {
    this.belongsTo(models.Show, { foreignKey: 'showId' });
    this.belongsTo(models.Seat, { foreignKey: 'seatId' });
    this.belongsTo(models.User, { foreignKey: 'userId' });
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
  },
  {
    sequelize: db.sequelize,
    tableName: 'ticket',
    createdAt: false,
    updatedAt: false,
  }
);

export { Ticket };
