import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    price:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    }
},
{    timestamps: true}

)
const Cart = mongoose.model("carts", cartSchema)
export default Cart;
