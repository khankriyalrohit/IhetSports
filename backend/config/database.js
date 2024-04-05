// import mongoose from "mongoose"

// const connectDatabase = async()=>{
//   try{
//     await mongoose.connect(`${process.env.DB_URI}`);
//     console.log(
//       `Connected to Mongodb Database ${mongoose.connection.host}`
//     );
//   } 
//   catch(err){
//     console.log(`Mil gya error ${err}`) 
//   }
// };

// module.exports = connectDatabase; 

import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDatabase = async()=>{
  try{
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`
    );
  } 
  catch(err){
    console.log(`Mil gya error ${err}`) 
  }
};