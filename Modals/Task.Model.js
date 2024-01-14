const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  image: { type: String},
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: String, required: true },
  profileImg:{type:String}
},
{
    timestamps: true 
}
);

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
