let mongoose=require('mongoose');


let jobSchema = new mongoose.Schema({
    name: String,
    address: String,
    image: String,
    package: String,
    // description: String,
    cgpa:Number,
    deadline:{
        type:Date,
        default:Date.now
    },
    type: {
        type:String,
        default:'Fulltime'
    }
});

let Job = mongoose.model('job', jobSchema);

module.exports=Job;