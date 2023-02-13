const { Op } = require('sequelize')
const sequelize = require('../models/connect')
const Storage = require('../models/StorageModels')
const PageService = require('../services/PageService')

class StorageController{
    
    async get(req, res){
        try {
            const pageService = new PageService()
            const page = req.query.page
            const result = await Storage.findAll({offset:pageService.getPageOffset(page), limit: 20})

            if(!result.length){
                res.status(404).json({"message": "Jumlah halaman melebihi batas"})
                return
            }
            res.status(200).json(result)
        } catch (error) {
            console.error(`Server had some trouble: ${error}`)
            res.status(500).json({"message": "Terdapat masalah pada server"})
        }
    }

    async add(req, res){
        try{
            const data_item = req.body.data
            await Storage.create(data_item)
            res.status(201).json({"message": `${data_item.item_name} is successfully added to the database`})
        } catch (error) {
            console.error(`Server had some trouble: ${error}`)
            res.status(500).json({"message": "Terdapat masalah pada server"})
        }
        
    }

    async update(req, res){
        try {
            const data_item = req.body.data
            const id_data_item = req.query.id
            req.body.data['modified_at'] = sequelize.fn('NOW')
            await Storage.update(data_item, {
                where: {
                    id: id_data_item
                }
            })
            res.status(201).json({"message": `${id_data_item} is sucessfully update some data`})
        } catch (error) {
            console.error(`Server had some trouble: ${error}`)
            res.status(500).json({"message": "Terdapat masalah pada server"})
        }
    }

    async delete(req, res){
        try {
            const id_data_item = req.query.id
            await Storage.destroy({
                where: {
                    id: id_data_item
                }
            })
            res.status(200).json({"message": `${id_data_item} successfully deleted from the database`})
        } catch (error) {
            console.error(`Server had some trouble: ${error}`)
            res.status(500).json({"message": "Terdapat masalah pada server"})
        }
    }

    async search(req, res){
        try {
            const result = await Storage.findAll({
                where: {
                    item_name: {
                        [Op.iLike]: '%'+req.query.keyword+'%'
                    }
                }
            })
            
            if(!result.length){
                res.status(404).json({"message": req.query.keyword+" is not found on the database"})
                return    
            }
    
            res.status(200).json(result) 
        } catch (error) {
            console.error(`Server had some trouble: ${error}`)
            res.status(500).json({"message": "Terdapat masalah pada server"})
        }
    }
    
}

module.exports = StorageController