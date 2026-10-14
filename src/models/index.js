// Central export for all Sequelize models and their associations

import { User } from './User.js'
import { Product } from './Product.js'
import { ProductAttribute } from './ProductAttribute.js'

User.hasMany(Product, { foreignKey: 'ownerId', as: 'products' })
Product.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' })

Product.hasMany(ProductAttribute, { foreignKey: 'productId', as: 'attributes' })
ProductAttribute.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

export { User, Product, ProductAttribute }