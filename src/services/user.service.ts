import md5 from "md5";
import { IAuthData } from "../models/users.model";
import { pool } from "../db";

export const authuser  = async(data:IAuthData)=>{
    const { user, password } = data;
    const hashPassword = md5(password);
    try{
        const [users]:any = await pool.query("SELECT id,user  FROM `users` WHERE user = ? AND password = ?", [user, hashPassword])
        return users
    }catch(err){
        return({message: "Something goes wrong"});
    }

}