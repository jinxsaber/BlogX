const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    }
},{timestamps : true}
)


export default mongoose.models.Post || mongoose.model('Post',createSchema);
