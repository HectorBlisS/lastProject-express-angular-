const router = require('express').Router();
const User = require('../models/User');
const Phone = require('../models/Phone')
// const Profile = require('../models/Profile');
// const Product = require('../models/Product');
//const bcrypt = require('bcrypt');
const passport = require('passport');
//const sendWelcomeMail = require('../helpers/mailer').sendWelcomeMail;
//const sendTemplate = require('../helpers/mailer').sendTemplate;

//multer config
const multer = require('multer');
const upload = multer({dest: './public/assets'});


function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log(req.user)
        return next()
    }else{
        res.json({message:"no tienes permiso"});
    }
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/private')
    }else{
        next();
    }
}


// router.get('/profile', isAuthenticated, (req,res, next)=>{
//     User.findById(req.user._id)
//     .populate('profile')
//     .populate('products')
//     .then(user=>{
//         res.send(user);
//     })
//     .catch(e=>next(e))
// });

router.get('/logout', (req,res,next)=>{
    req.logout();
    res.send('cerrado ??? ');
    // req.session.destroy(()=>{
    //     res.redirect('/login');
    // })

});

router.get('/private', isAuthenticated, (req,res)=>{
    //const admin = req.user.role === "ADMIN";
    //res.json({message:"esto es privao"});
    Phone.find()
    .then(phones=>res.json(phones))
    .catch(e=>next(e))
});

// router.get('/login', isLoggedIn, (req,res)=>{
//     res.render('auth/login')
// });

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    res.json(req.user)
});


// router.get('/signup', (req,res)=>{
//     res.render('auth/signup');
// });

//1 crear la ruta post (recibe)
//2 necesitamos chear las contraseñas que coincidan
//3 crear al usuario en la db
//upload.single('photo')
router.post('/signup', (req,res,next)=>{
   // req.body.photoURL = '/assets/' + req.file.filename;
    User.register(req.body, req.body.password)
    .then(user=>{
        res.json(user)
        //sendTemplate(user);
        //res.redirect('/login')
    })
    .catch(e=>next(e));


    // if(req.body.password !== req.body.password2){
    //     req.body.error = 'escribe bien la contraseña!';
    //     return res.render('auth/signup', req.body)
    // }
    // //encriptar la contraseña
    // const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // req.body.password = hash;
    // User.create(req.body)
    // .then(user=>res.send(user))
    // .catch(e=>next(e))
})


module.exports = router;