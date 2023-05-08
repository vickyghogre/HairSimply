let express=require('express');
let router =express.Router();
let mongoose=require('mongoose')

let Job = require('../models/job-DB.js');
//landing
router.get('/',(req,res)=>{
    res.render('landing');
});
//index
router.get('/jobs',async function(req,res){
   try {
     //extract all the job
     let foundJob = await Job.find({});
     res.render('index',{foundJob});
   } catch (error) {
     console.log('error while extracting jobs',error);
   }
});

//new
router.get('/jobs/new',async (req,res)=>{
     res.render('new');
});

//create
router.post('/jobs',async (req,res)=>{
    try {
        //make a atabase object
        let newJob = new Job({
            name : req.body.name,
            address:req.body.address,
            image:req.body.image,
            package:req.body.package,
            cgpa:req.body.cgpa,
            deadline:req.body.deadline
        });
        await newJob.save();
        res.redirect('/jobs');
    } catch (error) {
        console.log('error while posting new job',error);
    }
});

//show
router.get('/jobs/:id',async(req,res)=>{
    try {
       // fetching a job
       let id = req.params.id;
       let job= await Job.findById(id);
       res.render('show',{job});
    } catch (error) {
        console.log('error while fetching a job',error);
    }
});

//edit
router.get('/jobs/:id/edit',async (req,res)=>{
    try {
        let id =req.params.id;
        let job=await Job.findById(id);
        res.render('edit',{job});
    } catch (error) {
        console.log('error while fetching a job to edit',error);
    }
});

//update
router.patch('/jobs/:id',async(req,res)=>{
   try {
     let id=req.params.id;
     let updatedJob={
        name:req.body.name,
        adddress:req.body.address,
        image:req.body.image,
        package:req.body.package,
        cgpa:req.body.cgpa,
        deadline:req.body.deadline
     }
     await Job.findByIdAndUpdate(id,updatedJob);
     res.redirect(`/jobs/${id}`);
   } catch (error) {
    console.log('error while updating the job',error);
   }
});

//delete
router.delete('/jobs/:id', async(req,res)=>{
    try {
        let id=req.params.id;
        await Job.findByIdAndDelete(id);
        res.redirect('/jobs');
    } catch (error) {
        console.log('error while deleting the job',error); 
    }
});

module.exports = router;
