import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { conection } from '../connections'
import exp from 'constants';

class Carteraxhoras extends Model<InferAttributes<Carteraxhoras>, InferCreationAttributes<Carteraxhoras>> {
  declare FECHA: Date;
  declare EMPRESA: string;
  declare HORA: string | null;
  declare VLR_CA: number;
  declare VLR_CI: number;
  declare VLR_CT: number;
  declare VERSION: string | null;
}

Carteraxhoras.init({
  FECHA: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  EMPRESA: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  HORA: { type: DataTypes.STRING, allowNull: true },
  VLR_CA: { type: DataTypes.INTEGER, allowNull: true },
  VLR_CI: { type: DataTypes.INTEGER, allowNull: true },
  VLR_CT: { type: DataTypes.INTEGER, allowNull: true },
  VERSION: { type: DataTypes.STRING, allowNull: true }
}, {
  sequelize: conection,
  modelName: 'Carteraxhoras',
  tableName: 'CARTERAXHORAS',
  timestamps: false
});

export { Carteraxhoras };