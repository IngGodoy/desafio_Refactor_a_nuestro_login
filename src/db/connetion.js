//configuración de la conexión de la base de datos mongoDb
import { connect } from "mongoose";

const MONOGO_URL = "mongodb://127.0.0.1/practica_mongoose_express";

export const initMongoDb = async ()=> {
    try {
        await connect(MONOGO_URL);
        console.log("conectado a MongoDb");
    } catch (error) {
        console.log(error);
    };
};
