"use server"
import { getCollection } from "../config";

class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

}
export default UserModel;
