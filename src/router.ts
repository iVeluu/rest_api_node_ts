import { Router } from "express";

const router = Router();

//Routing
router.get('/', ( req, res) => {
    res.json('Desde GET')
}) 


export default router