const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name:{type:String,required:true },
    email : {type:String,required:true,unique:true},
    password:{type:String, required: true},
    image:{type:String},
    location:{type:String},
    lastname:{type:String},
    organization:{type:String},
    phone:{type:String}
})

const UserModel=mongoose.model('signup',UserSchema);
module.exports=UserModel;