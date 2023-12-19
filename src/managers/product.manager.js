import {ProductModel} from "../models/product.model.js"; 

export default class ProductsManager {
    
    async getAll(limit = 10, page = 1, sort = {}, filtro = ""){
        try {
            // aqui agrego el metodo para paginar los productos
            return await ProductModel.paginate(
                {
                    category : filtro  
                },
                {
                    page,
                    limit, 
                    sort
                }
            );
        } catch (error) {
            console.log(error);
        };
    };

    async getById(id){
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.log(error);
        };
    };

    async create(objeto){
        try {
            console.log("objeto en el manager", objeto); //borrar
             const updateCart = await ProductModel.create(objeto);
             return updateCart
        } catch (error) {
            console.log(error);
        };
    };

    async update(id, product){
        try {
            return await ProductModel.findByIdAndUpdate({_id : id}, product, {new: true}); 
            //new true retorne el objeto
        } catch (error) {
            console.log(error);
        };
    };

    async delet(id){
        try {
            return await ProductModel.findByIdAndDelete(id); 
        } catch (error) {
            console.log(error);
        };
    };

};