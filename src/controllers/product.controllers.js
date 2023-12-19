// instancio la clase de productsManager para obtener los metodos de mongoDb
// esto con el fin de traernos la logica de los router...
import ProductsManager from "../managers/product.manager.js"

const productsManager = new ProductsManager();

export const getAllProducts = async (req, res)=>{
    try {
        
        const {limit, page, sort, filtro} = req.query
        const products = await productsManager.getAll(limit, page, sort, filtro);
        console.log("productos del get all",products) // borrar

        const next = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null;
        const prev = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null;
        
        // respuesta en formato de paginación
        res.status(200).json({
            payload: products.docs,
            info: {
             count: products.totalDocs,
             pages: products.totalPages,
             next,
             prev
            }
        }); 
        
    } catch (error) {
        console.log(error)
    };
};

export const getProductById = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await productsManager.getById(id);
        if(!product) return res.status(400).json({msg: "product not fount"});
        else return res.status(200).json(product);
    } catch (error) {
        console.log(error)
    };
};


export const createProduct = async (req, res)=>{
    try {
        const newProduct = req.body
        console.log("req.body", req.body) //borrar
        const products = await productsManager.getAll();
        console.log("ver productos: ", products) //borrar

        // verificar si el código del producto ya existe
        let checkProductByCode = products.find((product) => newProduct.code === product.code);

        // verificar que no se repita el código y que tenga todos los campos el producto
        if(checkProductByCode || !checkNewProdut(newProduct)){
            return res.status(400).json({msg: "error create product"});
        } else {
            const product = await productsManager.create(newProduct);
            console.log("producto creado",product);
            return res.status(200).json(product)};
    } catch (error) {
        console.log(error)
    };
};

//función para verificar si el producto tiene todo los campos
const checkNewProdut = (newProduct)=> {
    for (let key in newProduct) {
        if (key === 'status' || key === 'thumbnail') {
            continue; // Saltar la verificación de la llave 'status'y 'thumbnail'
        }
        if (typeof newProduct[key] === 'undefined' || newProduct[key] === null || newProduct[key] === '') {
            return false;
        };
    };
    return true;
};


export const updateProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await productsManager.update(id, req.body);
        if(!product) return res.status(400).json({msg: "product not fount"});
        else return res.status(200).json(product);    
    } catch (error) {
        console.log(error)
    };
};

export const deletProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await productsManager.delet(id);
        if(!product) return res.status(400).json({msg: "product not fount"});
        else return res.status(200).json(product);    
    } catch (error) {
        console.log(error)
    };
};




