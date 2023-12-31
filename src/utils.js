import { dirname } from "path";
import { fileURLToPath } from "url";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

//este código proporciona una manera de obtener dinámicamente el directorio del archivo actual
export const __dirname = dirname(fileURLToPath(import.meta.url));


//registro => retorna la password hash
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
};

//registro => verifica que la contraseña en login sea igual a la base datos hash
export const isValidPass = (password, user) => {
    return compareSync(password, user.password);
};