import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { conection } from '../connections'

class Sellers extends Model<InferAttributes<Sellers>, InferCreationAttributes<Sellers>> {
  declare DOCUMENTO: string
  declare NOMBRES: string
  declare GRPVTAS_CODIGO: string
  declare CARGO: string
  declare VERSION: string
  declare NOMBRECARGO: 'COLOCADOR_INDEPENDIENTE' | 'VENDEDOR' | 'CAJERO_RESORERIA' | null
  declare CCOSTO: string
}

Sellers.init({
  DOCUMENTO: { type: DataTypes.STRING(20), allowNull: false, primaryKey: true },
  CARGO: { type: DataTypes.STRING(60), allowNull: true },
  GRPVTAS_CODIGO: { type: DataTypes.STRING(30), allowNull: true },
  NOMBRES: { type: DataTypes.STRING(30), allowNull: true },
  VERSION: { type: DataTypes.STRING(20), allowNull: true },
  NOMBRECARGO: { type: DataTypes.STRING(30), allowNull: true },
  CCOSTO: { type: DataTypes.STRING(10), allowNull: true }
}, {
  sequelize: conection,
  modelName: 'Seller',
  tableName: 'VENDEDORES',
  timestamps: false
})



export { Sellers }
