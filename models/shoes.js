const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    size:{
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        required:true
    },
    
})



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