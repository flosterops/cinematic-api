import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  DATE,
} from 'sequelize';
import { db } from '../db/connection';

class Show extends Model<InferAttributes<Show>, InferCreationAttributes<Show>> {
  id: number;
  date: number;

  price: number;

  static associate(models: any) {
    // define association here
    this.belongsTo(models.Theater, { foreignKey: 'theaterId' });
    this.belongsTo(models.Movie, { foreignKey: 'movieId' });
    this.hasMany(models.Ticket, { foreignKey: 'showId' });
  }
}

Show.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new DATE(),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'show',
    createdAt: false,
    updatedAt: false,
  }
);

export { Show };
