import { pool } from "../db";
import { unionVersions } from "../helpers/unionVersions";
import { ICustomer } from "../models/customer.models";
import { v4 as UUID } from 'uuid';


export const getCustomers = async () => {
    try{
        const [customers] = await pool.query("SELECT * FROM customers WHERE is_deleted = 0");
        const [versions] = await pool.query("SELECT * FROM versions");
        const data = unionVersions(customers, versions);
        return data;
    }catch(err){
        return {message: 'Something goes wrong'};
    }
}

export const getDeletedCustomers = async () => {
    try{
        const [customers] = await pool.query("SELECT * FROM customers WHERE is_deleted = 1");
        
        return customers;
    }catch(err){
        return {message: 'Something goes wrong'};
    }
}

export const getCustomerById = async (id: string) =>{
    try{
        const [customers]:any = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
        const [versions] = await pool.query("SELECT * FROM versions WHERE id_customer = ?", [id]);
        const data = unionVersions(customers, versions);
        return data;
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}

export const updateCustomerById = async (id: string, params:any) =>{
    
    try{
        const tempData: ICustomer = await getCustomerById(id);
        const result:any = await pool.query("UPDATE customers SET full_name = IFNULL(?, full_name), nss = IFNULL(?, nss), rfc = IFNULL(?, rfc), phone = IFNULL(?, phone), address = IFNULL(?, address) WHERE id = ?", [params.full_name, params.nss, params.rfc, params.phone, params.address, id]);
        
        if(result[0].affectedRows > 0){
            await pool.query("INSERT INTO versions(id, id_customer, full_name, nss, rfc, phone, address) VALUES (?,?,?,?,?,?,?)", [UUID(), id, tempData.full_name, tempData.nss, tempData.rfc, tempData.phone, tempData.address]);
        }

        return result;
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}

export const createCustomer = async(params:any) =>{
    try{
        const [customers]:any = await pool.query("INSERT INTO customers(id, full_name, nss, rfc, phone, address, is_deleted) VALUES (?,?,?,?,?,?,?)", [UUID(), params.full_name, params.nss, params.rfc, params.phone, params.address, 0]);
        console.log(params)
        if(customers[0].affectedRows > 0){
            return({message: "Updated successfully"});
        }

        return customers;
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}

export const deleteCustomerById = async(id: string)=>{
    try{
        const [rows]:any = await pool.query("UPDATE customers SET is_deleted = 1  WHERE id = ?", [id]);
    
        if(rows[0].affectedRows > 0){
            
            return {message:"Deleted Succesfully"}
        }else{
            return {message:"Customer not found"}
        }
    
    }catch(err){
        return {message: 'Something goes wrong'}
    }

}