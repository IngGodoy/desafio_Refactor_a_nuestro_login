import {UserModel} from "../models/user.model.js"
import {createHash, isValidPass} from "../utils.js"

export default class User {

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  };
  
  async register(user) {
    try {
      const { email, password } = user;
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          return await UserModel.create({...user, role: 'admin', password:createHash(password) });
        }
      const exists = await this.findByEmail(email);
      console.log(exists);
      if (!exists) {
        user.password = createHash(password);
        return await UserModel.create(user);
      } else return false;
    } catch (error) {
        console.log(error);
    }
    };
  
  async login(email, password) {
      try {
       
        console.log('body', email, password);
        const userExist = await UserModel.findOne({ email });
        console.log("user BD", userExist) //borrar

        //verificar si el usuario esta en la base datos
        if (!userExist) return false;

        //verificar la contraseña
        const checkPassword = isValidPass(password,userExist);
        console.log("checkPassword", checkPassword)
        if (!checkPassword) return false; 
        return userExist; //login exitoso
      } catch (error) {
        console.log(error);
      }
    }
    
};