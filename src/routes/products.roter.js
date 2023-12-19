import { Router } from "express";
import {
    getAllProducts,
    getProductById, 
    createProduct, 
    updateProduct,
    deletProduct } from "../controllers/product.controllers.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deletProduct);

export default router;

