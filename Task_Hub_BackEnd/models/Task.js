import mongoose,{Schema, model} from 'mongoose';
const TasksSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User_Model'
    },
    description : {
        type: String,
        required: true
    }
});
const Task = model('Task_Model', TasksSchema);
export default Task;