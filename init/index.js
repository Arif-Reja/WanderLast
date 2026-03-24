const express=require('express');
const mongoose=require('mongoose');
const app=express();
const MONGO_URL='mongodb://127.0.0.1:27017/Database';
const initData = require("./data.js");
const listing=require("../models/listing.js");
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(async()=>{
    console.log("DB is Connected");
    await initDB();
})
.catch((err)=>{
    console.log(err);
});
const initDB=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data was initilized");
};
