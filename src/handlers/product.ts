import e, { Request, Response } from "express"
import Product from "../models/Product.models"
import { validationResult } from "express-validator"

export const getProducts = async ( req : Request, res : Response ) => {
    try {
        const products = await Product.findAll()
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async ( req : Request, res : Response ) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        
        if(!product){
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }
        
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async ( req : Request, res : Response ) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}


export const updateProduct = async ( req : Request, res : Response ) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        
        if(!product){
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        //Update 
        await product.update(req.body)
        await product.save()
        
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async ( req : Request, res : Response ) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }
        //Update 
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async ( req : Request, res : Response ) => {

    const { id } = req.params
     const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
     //Delete 
    await product.destroy()
    res.json({data: 'Producto Eliminado'})

}