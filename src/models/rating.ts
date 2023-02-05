import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { db } from '../db/connection';

class Rating extends Model<
  InferAttributes<Rating>,
  InferCreationAttributes<Rating>
> {
  id: number;
  stars: number;
  review: string;

  static associate(models: any) {
    // define association here
  }
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    review: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
    },
  },
  { sequelize: db.sequelize, tableName: 'rating' }
);

Rating.sync();

export { Rating };
