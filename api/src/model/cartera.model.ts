import { DataTypes, Model, Optional } from 'sequelize'
import { conection } from '../connections'
import { Sellers } from './sellers.model'
import { Bases } from './bases.model';

export type CarteraAttributes = {
  EMPRESA: string
  CUENTA: string
  VINCULADO: string
  FECHA: Date
  BASE: number
  RASPAS: number
  EXCP2: number
  EXCP3: number
  SALDO_ANT: number
  DEBITO: number
  CREDITO: number
  NUEVOSALDO: number
  VTABNET: number
  VTASIISS: number
  VTASFLEX: number
  VTA_S1: number
  VTA_S2: number
  VTA_S3: number
  RECHAZADOS: number
  ACEPTADOS: number
  DIGITADOS: number
  OBSERVACION1: string | null
  OBSERVACION2: string | null
  OBSERVACION3: string | null
  VERSION: string
  PENDIENTES_CONT: number
}

type CarteraCreationAttributes = Optional<CarteraAttributes, 'VINCULADO'>

class Cartera extends Model<CarteraAttributes, CarteraCreationAttributes> {
  declare EMPRESA: string
  declare CUENTA: string
  declare VINCULADO: string
  declare FECHA: Date
  declare BASE: number
  declare RASPAS: number
  declare EXCP2: number
  declare EXCP3: number
  declare SALDO_ANT: number
  declare DEBITO: number
  declare CREDITO: number
  declare NUEVOSALDO: number
  declare VTABNET: number
  declare VTASIISS: number
  declare VTASFLEX: number
  declare VTA_S1: number
  declare VTA_S2: number
  declare VTA_S3: number
  declare RECHAZADOS: number
  declare ACEPTADOS: number
  declare DIGITADOS: number
  declare OBSERVACION1: string | null
  declare OBSERVACION2: string | null
  declare OBSERVACION3: string | null
  declare VERSION: string
  declare PENDIENTES_CONT: number
}

Cartera.init({
  EMPRESA: { type: DataTypes.STRING, allowNull: false },
  CUENTA: { type: DataTypes.STRING, primaryKey: true },
  VINCULADO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  FECHA: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  BASE: { type: DataTypes.INTEGER, allowNull: true },
  RASPAS: { type: DataTypes.INTEGER, allowNull: true },
  EXCP2: { type: DataTypes.INTEGER, allowNull: true },
  EXCP3: { type: DataTypes.INTEGER, allowNull: true },
  SALDO_ANT: { type: DataTypes.INTEGER, allowNull: true },
  DEBITO: { type: DataTypes.INTEGER, allowNull: true },
  CREDITO: { type: DataTypes.INTEGER, allowNull: true },
  NUEVOSALDO: { type: DataTypes.INTEGER, allowNull: true },
  VTABNET: { type: DataTypes.INTEGER, allowNull: true },
  VTASIISS: { type: DataTypes.INTEGER, allowNull: true },
  VTASFLEX: { type: DataTypes.INTEGER, allowNull: true },
  VTA_S1: { type: DataTypes.INTEGER, allowNull: true },
  VTA_S2: { type: DataTypes.INTEGER, allowNull: true },
  VTA_S3: { type: DataTypes.INTEGER, allowNull: true },
  RECHAZADOS: { type: DataTypes.INTEGER, allowNull: true },
  ACEPTADOS: { type: DataTypes.INTEGER, allowNull: true },
  DIGITADOS: { type: DataTypes.INTEGER, allowNull: true },
  OBSERVACION1: { type: DataTypes.STRING, allowNull: true },
  OBSERVACION2: { type: DataTypes.STRING, allowNull: true },
  OBSERVACION3: { type: DataTypes.STRING, allowNull: true },
  VERSION: { type: DataTypes.STRING, allowNull: true },
  PENDIENTES_CONT: { type: DataTypes.INTEGER, allowNull: true }
}, {
  sequelize: conection,
  modelName: 'Cartera',
  tableName: 'CARTERA',
  timestamps: false
});

// TODO: Relación entre CARTERA.VINCULADO Y VENDEDORES.DOCUMENTO
Cartera.hasOne(Sellers, { foreignKey: 'DOCUMENTO', sourceKey: 'VINCULADO' })

// TODO: Relación entre CARTERA.VINCULADO Y BASES.VINCULADO
Cartera.hasOne(Bases, { foreignKey: 'VINCULADO', sourceKey: 'VINCULADO' })


export { Cartera }