import {CartModel} from "../models/carts.moldel.js"

export default class CartsManager {
    async getAll(){
        try {
            return await CartModel.find();
        } catch (error) {
            console.log(error);
        };
    };

    async getById(cid){
        try {
            return await CartModel.findById(cid).populate("products.product");
        } catch (error) {
            console.log(error);
        };
    };

    //borrar el producto de un carro
    async deletProductByIdFromCart(cid, pid){
        try {

            return await CartModel.updateOne(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            )
            
        } catch (error) {
            console.log(error);
        };
    };

    async create(){
        try {
            return await CartModel.create({ products: [] });
        } catch (error) {
            console.log(error);
        };
    };

    //actualizar la cantidad de un producto en el cart
    async updateProdQuantityToCart(cid, pid, updateQuantity) {
        try {
        
            const cart = await CartModel.findOne({ _id: cid });
            const index = cart.products.findIndex(element => element.product == pid);
            if (index !== -1 && cart) {
                // Si se encontró el producto, actualizar la cantidad
                cart.products[index].quantity = updateQuantity;
                await cart.save(); 
                return cart;
            };
            return false;

        } catch (error) {
            console.error(error);
        }
    }
    
    
    

    //actualizar array de productos del cart
    async updateCart(cid, updateProducts) {
        try {
            console.log("ver array:  ", updateProducts) //borrar
            const cart = await CartModel.findByIdAndUpdate(cid, { products: updateProducts }, { new: true });
            return cart
        } catch (error) {
            console.log(error);
        };
    };

    async addProductToCart(cid, pid) {
        try {
            console.log("ir a agregar el producto");
            console.log("cid: " +cid+ "/ pid: " + pid) //borrar
            const cart = await CartModel.findById(cid);
            cart.products.push({product:pid});
            cart.save(); // guardar los cambios en mongoDb
            return cart;
        } catch (error) {
            console.log(error);
        };
    }; 

    async removeAllProductsFromCart(cid){
        try {
            return await CartModel.updateOne(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
            );  
        } catch (error) {
            console.log(error);
        };
    };
};