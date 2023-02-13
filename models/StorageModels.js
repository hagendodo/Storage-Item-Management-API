const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connect')

class Storage extends Model {}

Storage.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('masuk', 'keluar'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Storage',
    schema: 'storage',
    tableName: 'item',
    freezeTableName: true,
    timestamps: false,
})

module.exports = Storage