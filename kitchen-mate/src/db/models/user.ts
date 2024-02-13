"use server"
import { z } from "zod";
import { getCollection } from "../config";
import { UserType } from "@/types/type";
import { hashText } from "../helpers/hash";

const UserInputSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters" }),
});

class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

  static async Register(newUser: UserType) {
    const parseResult = UserInputSchema.safeParse(newUser);
    if (!parseResult.success) {
      console.log(parseResult.error);
      throw parseResult.error;
    }
    const uniqueUser = await this.getCollection().findOne({
      username: newUser.username,
    });
    if (uniqueUser) {
      throw new Error("Username already exists");
    }
    return await this.getCollection().insertOne({
      ...newUser,
      password: hashText(newUser.password),
    });
  }

}
export default UserModel;
