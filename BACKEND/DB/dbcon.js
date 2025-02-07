import mongoose from "mongoose";

export const dbconn=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"HMS"
    }).then(()=>{
        console.log("Connected")
    }).catch(()=>{
        console.log("Not connecting")
    })
};
