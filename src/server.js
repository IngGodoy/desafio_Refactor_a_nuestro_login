// configuraciones para levantar el servidor
import express from "express";
import {initMongoDb} from "./db/connetion.js"
import productsRouter from "./routes/products.roter.js"
import cartsRouter from "./routes/carts.router.js"
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js"
import session from "express-session";
import { Server } from "socket.io";
import {ProductModel} from "./models/product.model.js"; 

//falta agregar rauter de views y users


const app = express();

app.use(express.json()); // me permite ver los body req
app.use(express.urlencoded({ extended: true })); // nos permite recibir req.body
app.use(express.static(__dirname + "/public"));

//configuraciones para usar el mongoStore para las sessiones
const mongoStoreOptions = {
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/practica_mongoose_express",
      ttl: 120,
      crypto: {
        secret: '1234'
      }
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000,
    },
};

app.use(cookieParser()); 
app.use(session(mongoStoreOptions));

//handlebars
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');



//rutas handlebars y users
app.use("/users", userRouter);
app.use('/views', viewsRouter);
  

const PORT = 8080;

app.use("/api/products", productsRouter); //rutas del crud productos

app.use("/api/carts", cartsRouter); //rutas del crud carts

initMongoDb(); //función que mantiene la conexión con MongoDb

const httpServer = app.listen(PORT, ()=> console.log("server ok on port: " + PORT));
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket)=>{

  console.log("usuario conectado");
  const arrayProducts = await ProductModel.find({}); //leer datos desde mongoDb
  console.log("productos backend al frontend", arrayProducts);
  socket.emit('arrayProducts', arrayProducts);

 
});
