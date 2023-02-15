import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { db } from '../db/connection';

class Theater extends Model<
  InferAttributes<Theater>,
  InferCreationAttributes<Theater>
> {
  id: number;
  name: string;
  // tslint:disable-next-line:variable-name
  number_of_seats: number;
  // tslint:disable-next-line:variable-name
  list_of_features: string;

  static associate(models: any) {
    this.hasMany(models.Seat, {
      foreignKey: 'theaterId',
    });
    this.hasMany(models.Show, {
      foreignKey: 'theaterId',
    });
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
    list_of_features: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'theater',
    createdAt: false,
    updatedAt: false,
  }
);

export { Theater };
