import { DataTypes, Model, Optional } from 'sequelize'
import { conection } from '../connections'

export type SellerAttributes = {
    DOCUMENTO: string
    NOMBRES: string
    GRPVTAS_CODIGO: string
    CARGO: string
    VERSION: string
    NOMBRECARGO: 'COLOCADOR_INDEPENDIENTE' | 'VENDEDOR' | 'CAJERO_RESORERIA' | null
    CCOSTO: string
}

type UserCreationAttributes = Optional<SellerAttributes, 'DOCUMENTO'>

class Sellers extends Model<SellerAttributes, UserCreationAttributes> {
    declare DOCUMENTO: string
    declare NOMBRES: string
    declare GRPVTAS_CODIGO: string
    declare CARGO: string
    declare VERSION: string
    declare NOMBRECARGO: 'COLOCADOR_INDEPENDIENTE' | 'VENDEDOR' | 'CAJERO_RESORERIA' | null
    declare CCOSTO: string
}

Sellers.init({
    DOCUMENTO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    CARGO: { type: DataTypes.STRING, allowNull: true },
    GRPVTAS_CODIGO: { type: DataTypes.STRING, allowNull: true },
    NOMBRES: { type: DataTypes.STRING, allowNull: true },
    VERSION: { type: DataTypes.STRING, allowNull: true },
    NOMBRECARGO: { type: DataTypes.STRING, allowNull: true },
    CCOSTO: { type: DataTypes.STRING, allowNull: true }
}, {
    sequelize: conection,
    modelName: 'Seller',
    tableName: 'VENDEDORES',
    timestamps: false
})

export { Sellers }
