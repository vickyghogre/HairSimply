let express=require('express');
let router=express.Router();
let Notification = require('../models/notif-DB');
//index
router.get('/notification',async (req, res) => {
    try {
        let allNotifs = await Notification.find({});
        res.render('notification/index-Notif.ejs',{allNotifs});
    } catch (error) {
        console.log('Error while fetchin notification',error);
    }

});
//new notification
router.get('/notification/new',async (req, res) => {
     res.render('notification/new')
});
//create notification
router.post('/notification',async (req, res) =>{
try {
    let notif= new Notification({
        body:req.body.body,
        author:req.body.author
    })
    await notif.save();
    res.redirect('/notification')
} catch (error) {
    console.log('error while creating a notification',error);
}
});
//delete notification
router.delete('/notification/:id', async (req, res)=>{
  try {
    Notification.findByIdAndDelete(req.params.id);
    res.redirect('/notification');
  } catch (error) {
    console.log('error while deleting notification',error);
  }
});



module.exports = router;