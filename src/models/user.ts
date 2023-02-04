import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { db } from '../db/connection';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;

  static associate(models: any) {
    // define association here
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(128),
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING(128),
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING(128),
      defaultValue: '',
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: 'user',
    },
  },
  { sequelize: db.sequelize, tableName: 'user' }
);

User.sync();

export { User };
