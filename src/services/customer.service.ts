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
        const tempData: ICustomer[] = await getCustomerById(id);
        const result:any = await pool.query("UPDATE customers SET full_name = IFNULL(?, full_name), nss = IFNULL(?, nss), rfc = IFNULL(?, rfc), phone = IFNULL(?, phone) WHERE id = ?", [params.full_name, params.nss, params.rfc, params.phone, id]);
        
        if(result[0]['affectedRows'] > 0){
            console.log(tempData);
            await pool.query("INSERT INTO versions(id, id_customer, full_name, nss, rfc, phone) VALUES (?,?,?,?,?,?)", [UUID(), id, tempData[0]["full_name"], tempData[0]["nss"], tempData[0]["rfc"], tempData[0]["phone"]])
                .then(res => console.log(res))
                .catch(err => console.log(err))
        
        }
        
        return result;
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}

export const createCustomer = async(params:any) =>{
    try{
        const [customers]:any = await pool.query("INSERT INTO customers(id, full_name, nss, rfc, phone, is_deleted) VALUES (?,?,?,?,?,?)", [UUID(), params.full_name, params.nss, params.rfc, params.phone, 0]);
        
        if(customers['affectedRows'] > 0){
            return({message: "Updated successfully"});
        }else{
            return({message: "Customer not created"});
        }

    }catch(err){
        console.log(err)
        return {message: 'Something goes wrong'}
    }
}

export const deleteCustomerById = async(id: string)=>{
    try{
        const [rows]:any = await pool.query("UPDATE customers SET is_deleted = 1  WHERE id = ?", [id]);
        
        if(rows['affectedRows'] > 0){
            
            return {message:"Deleted Succesfully"}
        }else{
            return {message:"Customer not found"}
        }
    
    }catch(err){
        return {message: 'Something goes wrong'}
    }

}

export const resetVersion = async(id: string)=>{
    try{
        const [rows]:any = await pool.query("SELECT * FROM versions WHERE id = ?", [id]);
        const customer_id = rows[0]["id_customer"];
        if(customer_id){
            const [customers]:any = await pool.query("UPDATE customers SET full_name=?, nss=?, rfc=?, phone=?  WHERE id = ?", [rows[0]["full_name"], rows[0]["nss"], rows[0]["rfc"], rows[0]["phone"], customer_id])
                .then((_res) => {
                    return {message: 'Reset version successfully'};
                })
                .catch((_err) => {
                    return{message: `Something goes wrong`}
                });
            if(customers){
                return customers
            }
        }
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}

export const takeOutTrash = async(id: string)=>{
    try{
        const [rows]:any = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
       
        const customer_id = rows[0]["id"];
        
        if(customer_id){
            const [customers]:any = await pool.query("UPDATE customers SET is_deleted = 0  WHERE id = ?", [customer_id])
                .then((res) => {
                    console.log(res)
                    return {message: 'Take out trash successfully'};
                })
                .catch((err) => {
                    console.log(err)
                    return{message: `Something goes wrong`}
                });
            if(customers){
                return customers
            }
        }
    }catch(err){
        return {message: 'Something goes wrong'}
    }
}