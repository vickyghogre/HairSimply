let express = require('express'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	path = require('path'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	moment = require('moment'),
	flash = require('connect-flash');
let app = express();

mongoose
    .connect('mongodb+srv://vicky:vicky@hirehub.vfuozdt.mongodb.net/?retryWrites=true&w=majority')
    .then(function(){
        console.log('DB Connected');
    })
    .catch(function(error){
        console.log(error);
    });


    app.use(
        session({
            secret: 'SuperSecretPasswordForHireHub',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                // secure: true,
                expires: Date.now() + 1000 * 60 * 60 * 24,
                maxAge: 1000 * 60 * 60 * 24
            }
        })
    );

    // ! SERVER SETUP AND MIDDLEWARES
app.set('view engine','ejs'); //ejs extension
app.use(express.urlencoded({ extended : true })); //body parsing
app.use(methodOverride('_method')); //patch delete request
app.use(express.static(__dirname + '/public')); //static resource
app.use(flash()); // alerts
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.moment = moment;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});


let jobRoutes= require('./routes/jobs.js');
let notifRoutes= require('./routes/notification.js');
let authRoutes = require('./routes/auth.js')
let userRoutes = require('./routes/user.js')
let questionRoutes = require('./routes/questions')

app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(questionRoutes);

app.listen(3000,function(req,res){
    console.log('Server is Running');
});