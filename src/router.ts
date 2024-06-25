import { Router } from "express";
import { createProduct, getProducts, getProductById } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

//Routing
router.get('/', getProducts) 
router.get('/:id', 

    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
) 

router.post('/',
   body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
   body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Valor no válido'),
    handleInputErrors,
    createProduct
) 


export default router