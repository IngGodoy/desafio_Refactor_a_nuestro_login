import {UserGithubModel} from "../models/user.github.model.js"

export default class User {

  async findByEmail(email) {
    return await UserGithubModel.findOne({ email });
  };
  
  async register(user) {
    try {
      const { email } = user;
      const exists = await this.findByEmail(email);
      if (!exists) {
        return await UserGithubModel.create(user);
      } else return false;
    } catch (error) {
        console.log(error);
    };
    };
  
  async getById(id){
    try {
      const userExist = await UserGithubModel.findById(id)
      if(userExist){
        return userExist
      } return false
      } catch (error) {
        console.log(error)
      };
  };
    
};