const express=require('express');
const mongoose=require('mongoose');
const app=express();
const MONGO_URL='mongodb://127.0.0.1:27017/Database';
const Listing=require("./models/listing.js");
const path=require('path');
const methodOverride=require('method-override');
const { constants } = require('fs/promises');
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static("public"));
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("DB is Connected");
})
.catch((err)=>{
    console.log(err);
});
app.get("/",async(req,res)=>{
res.render("layout/homepage");
});
app.get("/listing",async(req,res)=>{
const allListing=await Listing.find({});
res.render("index",{allListing});
});
app.get("/listing/new",async(req,res)=>{
res.render("newOrder");
});
app.post("/listing/new",async(req,res)=>{
const newListing=new Listing(req.body.listing);
await newListing.save();
res.redirect("/listing");
});
app.get("/listing/:id/edit",async(req,res)=>{
let {id}=req.params;
const listing=await Listing.findById(id);
res.render("edit",{listing});
});
app.put("/listing/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listing/${id}`);
});
app.get("/listing/:id",async(req,res)=>{
let {id}=req.params;
const listing=await Listing.findById(id);
res.render("show",{listing});
});
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const deleteing=await Listing.findByIdAndDelete(id);
    console.log(deleteing);
    res.redirect("/listing");
});

app.listen(8080,()=>{
console.log("Server is runnging on 8080");
});