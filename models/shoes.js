const mongoose = require('mongoose');


const shoesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required:true,
    },
    imgs:{
        // type:[String],
        type:String,
    },
});
const Shoes = mongoose.model('Shoes', shoesSchema);
module.exports = Shoes;