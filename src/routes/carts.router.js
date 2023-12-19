import { Router } from "express";
import {
    getAllCarts,
    getCartById,
    deletProductByIdFromCart,
    create,
    updateProdQuantityToCart,
    updateCart,
    addProductToCart,
    removeAllProductsFromCart


} from "../controllers/cart.controllers.js";

const router = Router();

router.get("/", getAllCarts);

router.get("/:cid", getCartById);

router.delete("/:cid/products/:pid", deletProductByIdFromCart);

router.post("/", create);

router.put("/:cid/products/:pid", updateProdQuantityToCart);

router.put("/:cid", updateCart);

router.post("/:cid/products/:pid", addProductToCart);

router.delete("/clearCart/:cid", removeAllProductsFromCart);

export default router;