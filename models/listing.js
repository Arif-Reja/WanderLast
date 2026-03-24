const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:String,
        url:{
            type:String,
            default:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        }
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;