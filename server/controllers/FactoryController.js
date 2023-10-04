import FactoryModel from "../models/Factory.js";


export const getAll = async (req, res) => {
    try {
        const factories = await FactoryModel.find()
        res.json(factories)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить все записи'
        })
    }
}

export const removeFactory = async (req, res) => {
    try {
        const factoryId = req.params.id
        await FactoryModel.findOneAndDelete({
            _id: factoryId
        })

        res.json({
            success: true
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error'
        })
    }
}


export const addFactory = async (req, res) => {
    try {
        const doc = new FactoryModel({
            name: req.body.name,
            index: req.body.index,
            host: req.body.host
        })


        await doc.save()
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }


}

export const updateFactory = async (req, res) => {
    try {
        const factoryId = req.params.id
        await FactoryModel.updateOne({
            _id: factoryId
        }, {
            name: req.body.name,
            index: req.body.index,
            host: req.body.host
        })

        res.json({
            success: true
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить запись'
        })
    }
}