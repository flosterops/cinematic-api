import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { db } from '../db/connection';

class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  id: number;
  name: string;
  description: string;
  duration: number;
  age: string;

  static associate(models: any) {
    this.hasMany(models.Show, {
      foreignKey: 'movieId',
    });
    // define association here
  }
}

Movie.init(
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
    description: {
      type: DataTypes.STRING(128),
      defaultValue: '',
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'movie',
    createdAt: false,
    updatedAt: false,
  }
);

export { Movie };
