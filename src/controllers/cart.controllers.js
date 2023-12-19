import CartsManager from "../managers/cart.manager.js"


const cartsManager = new CartsManager();

export const getAllCarts = async (req, res)=>{
    try {
        
        const carts = await cartsManager.getAll();
        return res.status(200).json(carts);

    } catch (error) {
        console.log(error)
    };

};

export const getCartById = async (req, res)=>{
    try {
        const {cid} = req.params;
        const cart = await cartsManager.getById(cid);
        if(!cart) return res.status(400).json({msg: "cart not fount"});
        else return res.status(200).json(cart);
    } catch (error) {
        console.log(error)
    };
};


export const deletProductByIdFromCart = async (req, res)=>{
    try {
        const {cid, pid} = req.params;
        const cart = await cartsManager.deletProductByIdFromCart(cid, pid);
        if(!cart) return res.status(400).json({msg: "cart not fount"});
        else return res.status(200).json(cart);
    } catch (error) {
        console.log(error)
    };
};

export const create = async (req, res)=>{
    try {
        const cart = await cartsManager.create();
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error)
    };
};

export const updateProdQuantityToCart = async (req, res)=>{
    try {
        const {cid, pid} = req.params;
        const {updateQuantity} = req.body;
        const cart = await cartsManager.updateProdQuantityToCart(cid, pid, updateQuantity);
        if(!cart) return res.status(400).json({msg: "cart not fount"});
        else return res.status(200).json(cart);
    } catch (error) {
        console.log(error)
    };
};

export const updateCart = async (req, res)=>{
    try {
        const {products} = req.body;
        const {cid} = req.params;
        console.log("req.body",products) //borrar
        if(!cartsManager.getById(cid)) return res.status(400).json({msg: "cart not fount"});
        const cart = await cartsManager.updateCart(cid, products);
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error)
    };
};

export const addProductToCart = async (req, res)=>{
    try {
        const {cid, pid} = req.params;
        const cart = await cartsManager.getById(cid);
        console.log("ver cart a agregar product: ", cart) //borrar
        //verificar si el cart con _id existe
        if(!cart) return res.status(400).json({msg: "cart not fount"});

        const checkProduct = cart.products.find((element) => {
            return element.product._id == pid
        });
        console.log("verificacion de producto", checkProduct) //borrar

        //verificar si el producto ya fue agregado en el cart
        if(checkProduct) return res.status(400).json({msg: "existing product"});

        //agregar producto al cart
        const updateCart = await cartsManager.addProductToCart(cid, pid);
        return res.status(200).json(updateCart);
         
    } catch (error) {
        console.log(error)
    };
};

export const removeAllProductsFromCart = async (req, res)=>{
    try {
        const {cid} = req.params;
        const cart = await cartsManager.removeAllProductsFromCart(cid);
        if(!cart) return res.status(400).json({msg: "cart not fount"});
        else return res.status(200).json(cart);
    } catch (error) {
        console.log(error)
    };
};

