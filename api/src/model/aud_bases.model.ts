import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { conection } from '../connections'

class Aud_Bases extends Model<InferAttributes<Aud_Bases>, InferCreationAttributes<Aud_Bases>> {
  declare FECHA: Date;
  declare VINCULADO: string;
  declare BASE_ANT: number;
  declare BASE_NEW: number;
  declare RASPE_ANT: number;
  declare RASPE_NEW: number;
  declare EXCP2_ANT: number;
  declare EXCP2_NEW: number;
  declare EXCP3_ANT: number;
  declare EXCP3_NEW: number;
  declare LOGIN: string;
  declare OBSERVACION: string;
  declare VERSION: string;
}

Aud_Bases.init({
  FECHA: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  VINCULADO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  BASE_ANT: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  BASE_NEW: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  RASPE_ANT: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  RASPE_NEW: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  EXCP2_ANT: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  EXCP2_NEW: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  EXCP3_ANT: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  EXCP3_NEW: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  LOGIN: { type: DataTypes.STRING, allowNull: false },
  OBSERVACION: { type: DataTypes.STRING, allowNull: false },
  VERSION: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize: conection,
  modelName: 'Aud_Bases',
  tableName: 'AUD_BASES',
  timestamps: false
})

export { Aud_Bases }