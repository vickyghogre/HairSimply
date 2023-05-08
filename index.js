let express = require('express');
let mongoose= require('mongoose');
let methodOverride = require('method-override');
let path=require('path');
let app = express();

mongoose
    .connect('mongodb+srv://vicky:vicky@hirehub.vfuozdt.mongodb.net/?retryWrites=true&w=majority')
    .then(function(){
        console.log('DB Connected');
    })
    .catch(function(error){
        console.log(error);
    });

app.set('view engine','ejs');
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

let jobRoutes= require('./routes/job.js');
let notifRoutes= require('./routes/notification.js');
app.use(jobRoutes);
app.use(notifRoutes);

app.listen(3000,function(req,res){
    console.log('Server is Running');
});