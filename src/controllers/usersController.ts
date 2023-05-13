import { Request,Response } from "express"
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from "../config"
import bcrypt from "bcrypt"
import { signupSchema } from "../validate/validateUsers"

//INSERT INTO assessUserTable(id,username,email,userpassword)
// VALUES (@id,@username,@email,@userpassword)
export const addUser =async(req:Request, res:Response)=>{
    try{
         //server connection
        const{username,email,userpassword}=req.body
       const {error}= signupSchema.validate({username,email,userpassword})
       if(error){
         return res.status(404).json(error.details[0].message)
       }
        let pool= await mssql.connect(sqlConfig)
        let id= uid();
        console.log(id);
        
        
        let hashedPassword=await bcrypt.hash(userpassword,10);
        await(await pool.request())
        .input("id",id)
        .input("username",username)
        .input("email",email)
        .input("userpassword",hashedPassword)
        .execute("addUsers")
        return res.status(200).json({message:"user added successfully"})
  
    }
    catch(error:any){
      return res.status(404).json(error.message)
     }
}


export const getUserByName= async(req:Request, res:Response)=>{
    try{
        let pool= await mssql.connect(sqlConfig)
        // const{id,username,email,userpassword}=req.body;
        
        let {username} = req.params
        
        let userFound:any=(await(await pool.request())
        .input("username",username)

        .execute("getUserByName")).recordset[0]
        // return res.status(200).json({message:"user found"})

        // if(!userFound){
        //    return res.status(404).json({message:"user does not exist"})

        // }
        // (await(await pool.request())
        // .input("id",id)
        // .input("username",username)
        // .input("email",email)
        // .input("userpassword",userpassword)
        //  .execute("getUserByName")).recordset[0]
         return res.status(404).json(userFound)



    }
    catch(error:any){
       return res.status(404).json(error.message)    
    }
}

export const resetPassword =async(req:Request<{email:string, newPassword:string}>, res:Response)=>{
  try{
    let pool=await mssql.connect(sqlConfig)
    const{email,newPassword}=req.body;
    let hashedPassword=await bcrypt.hash(newPassword,10);
    await pool.request()
    .input("email",email)
    .input("newPassword",hashedPassword)
    .execute("resetPassword")
    return res.status(200).json({message:"password updated successfully"})
  }
  catch{
    return res.status(404).json({message:"user cannot be founs"})
  }
}
export const getUserById =async(req:Request<{id:string}>, res:Response)=>{
  try{  let pool=await mssql.connect(sqlConfig)
    const{id}=req.params
    let userFound:any=(await(await pool.request())
        .input("id", id)
        .execute("getUserById")).recordset[0]
        return res.status(200).json(userFound)
  }
  catch{
     res.status(404).json({message:"user not found or doees not exist"})
  }


  
}