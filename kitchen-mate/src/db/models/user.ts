import { ObjectId } from "mongodb";
import { hashText } from "../helpers/hash";
import { z } from "zod";
import { db } from "../config";
import { UserType } from "@/types/type";

const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5)
});


export type NewInput = Omit<UserType, "_id">;


class UserModel {
    static getCollection() {
        return db.collection("Users");
    }

    static async getAll() {
        return await this.getCollection().find().project({ password: 0 }).toArray() as UserType[];
    }

    static async getById(id: string) {
        return await this.getCollection().findOne({
            _id: new ObjectId(id)
        }, { projection: { password: 0 } }) as UserType | null;
    }

    static async getUserByUsername(username: string) {
        return await this.getCollection().findOne({
            username: username
        }) as UserType | null;
    }

    static async getUserByEmail(email: string) {
        return await this.getCollection()
            .findOne({ email }) as UserType | null;
    }

    static async register(newUser: NewInput) {
        const existingUserByUsername = await this.getUserByUsername(newUser.username);
        const existingUserByEmail = await this.getUserByEmail(newUser.email);

        if (existingUserByUsername || existingUserByEmail) {
            throw { message: "Username or email already exists", status: 400 };
        }

        const parsed = userSchema.safeParse(newUser);
        if (!parsed.success) {
            throw parsed.error
        }

        const result = await this.getCollection().insertOne({
            ...newUser, password: hashText(newUser.password)
        });

        return {
            _id: result.insertedId,
            ...newUser
        } as UserType;
    }
}

export default UserModel;