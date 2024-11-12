import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { conection } from '../connections'

class Recaudo extends Model<InferAttributes<Recaudo>, InferCreationAttributes<Recaudo>>{
  declare FECHA: Date;
  declare RECAUDADOR: string;
  declare ID_RECAUDO: string;
  declare CAJADNO: string;
  declare VINCULADO: string;
  declare VALOR: number;
  declare ESTADO: string;
  declare RESPALDO: string;
  declare HORASYNC: string;
  declare HORAMOVI: string;
  declare USR_CONTEO: string;
  declare HORA_CONTEO: string;
  declare NOTA_CONTEO: string;
  declare VERSION: string;
  declare EMPRESA: string;
} 

Recaudo.init({
  FECHA: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  RECAUDADOR: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  ID_RECAUDO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  CAJADNO: { type: DataTypes.STRING, allowNull: false },
  VINCULADO: { type: DataTypes.STRING, allowNull: false },
  VALOR: { type: DataTypes.INTEGER, allowNull: true },
  ESTADO: { type: DataTypes.STRING, allowNull: false },
  RESPALDO: { type: DataTypes.STRING, allowNull: true },
  HORASYNC: { type: DataTypes.TIME, allowNull: true },
  HORAMOVI: { type: DataTypes.TIME, allowNull: true },
  USR_CONTEO: { type: DataTypes.STRING, allowNull: true },
  HORA_CONTEO: { type: DataTypes.TIME, allowNull: true },
  NOTA_CONTEO: { type: DataTypes.STRING, allowNull: true },
  VERSION: { type: DataTypes.STRING, allowNull: true },
  EMPRESA: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize: conection,
  modelName: 'Recaudo',
  tableName: 'DETALLERECAUDO',
  timestamps: false
})

export { Recaudo }