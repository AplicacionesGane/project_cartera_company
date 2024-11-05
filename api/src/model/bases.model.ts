import { conection } from '../connections'
import { DataTypes, Model, Optional } from "sequelize";
import { Sellers } from './sellers.model';

export interface BaseAtributes {
  VINCULADO: string;
  BASE: number;
  RASPE: number;
  EXCP2: number;
  EXCP3: number;
  LOGIN: string;
  OBSERVACION: string;
  VERSION: string;
}

type BaseCreationAttributes = Optional<BaseAtributes, 'VINCULADO'>;

class Bases extends Model<BaseAtributes,BaseCreationAttributes> {
  declare VINCULADO: string;
  declare BASE: number;
  declare RASPE: number;
  declare EXCP2: number;
  declare EXCP3: number;
  declare LOGIN: string;
  declare OBSERVACION: string;
  declare VERSION: string;
}

Bases.init({
  VINCULADO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  BASE: { type: DataTypes.INTEGER, allowNull: true },
  RASPE: { type: DataTypes.INTEGER, allowNull: true },
  EXCP2: { type: DataTypes.INTEGER, allowNull: true },
  EXCP3: { type: DataTypes.INTEGER, allowNull: true },
  LOGIN: { type: DataTypes.STRING, allowNull: true },
  OBSERVACION: { type: DataTypes.STRING, allowNull: true },
  VERSION: { type: DataTypes.STRING, allowNull: true },
}, {
  sequelize: conection,
  modelName: 'Bases',
  tableName: 'BASES',
  timestamps: false
});

Bases.belongsTo(Sellers, { foreignKey: 'VINCULADO', targetKey: 'DOCUMENTO'});

export { Bases }