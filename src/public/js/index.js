const socketClient = io();

socketClient.on('arrayProducts', (productsArray)=>{
    console.log("escucador desde el fronted")
    products.innerHTML = "";
    let infoProducts = '';
    console.log("productos del lado del front", productsArray); //borrar
    productsArray.forEach(product=>{
        infoProducts += `Nombre Producto: ${product.title} - Precio: $${product.price} - Codigo: ${product.code} - Stock: ${product.stock} unidades </br> </br>`
    });
    products.innerHTML = infoProducts;
    
});

document.getElementById('logoutButton').addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/views'; 
});
