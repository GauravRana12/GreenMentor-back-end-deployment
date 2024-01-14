const mongoose=require('mongoose');
require('dotenv').config();
const connection=mongoose.connect(`mongodb+srv://gauravp1335:gggsss3011@cluster0.p6p0ny0.mongodb.net/GreenMentor`);

module.exports=connection;