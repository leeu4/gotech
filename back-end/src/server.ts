import express, { Request, Response } from 'express';
import { User,Reviews,Products } from '@prisma/client';
import {prisma,connectDB}from './config/db';

const server = express();
const port = 3000;
server.use(express.json());
server.post('/register',async(req:Request,res:Response)=>{
    const new_user = req.body as User
    await prisma.user.create({data:new_user});
});
server.post('/login',async(req:Request,res:Response)=>{
    const {username,password} = req.body as User;
    const user = await prisma.user.findFirst({where:{username:username,password:password}});
    if(!user){}

    else{}
})
server.get('/products',async(req:Request,res:Response)=>{
    const products = await prisma.products.findMany();
    return res.json(products);
})
server.get('/home',(req:Request,res:Response)=>{
    
})
server.listen(port,()=>{
    connectDB()
    console.log(`Server is Running on Port:${port}`)
})