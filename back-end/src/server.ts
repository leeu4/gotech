import express, { Request, Response } from 'express';
import { User,Reviews,Products } from '@prisma/client';
import { protect,authorize } from './middleware/auth';
import {prisma,connectDB}from './config/db';
import cors from 'cors';
import * as jwt from 'jsonwebtoken';

const server = express();
const port = 3000;
server.use(cors());
server.use(express.json());

server.post('/register',async(req:Request,res:Response)=>{
  const new_user = req.body as User
  await prisma.user.create({data:new_user});
  return res.status(201).json({
        message:`Welcome ${new_user.username} The Account Has been added successfully`
    })
});
server.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body as User;
  
    const user = await prisma.user.findFirst({
      where: { username:username,password:password },
    });

    
  
    if (!user) {
      return res.status(400).json({
        message: "الرجاء التأكد من المدخلات والمحاولة مرة اخرى",
      });
    }
  
  
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECERT as string
    );
  
    return res.status(200).json({
      message: `Welcome back ! ${username}`,
      token,
    });
  });
server.post("/addproduct",authorize("ADMIN","SUPERADMIN"),async (req:Request,res:Response)=>{
  const new_product = req.body as Products;
  prisma.products.create({data:new_product});
  return res.status(200).json({message:`Product ${new_product.product_name} has been added successfully`})
})

server.listen(port,()=>{
    connectDB()
    console.log(`Server is Running on Port:${port}`)
})