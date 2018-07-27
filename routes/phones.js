const express = require('express')
const router = express.Router()
const Phone = require('../models/Phone')
//archivos
const multer = require('multer')
const uploads = multer({dest: './public/images'})

//RESTful API

//get phone
router.get('/', (req, res) => {
    // res.send('phone')
    Phone.find()
        .then(phones => {
            return res.status(200).json(phones); //200: The request was fulfilled.                       
        })
        .catch(e => next(e))

});

//post new phone
router.post('/',  uploads.single('image'), (req, res) => {
    if(req.file) req.body.image = 'http://localhost:3000/images/' + req.file.filename
    Phone.create(req.body)
        .then(phone => {
            return res.status(201).json(phone)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
                        
})

//get one phone
router.get('/:id', (req, res) => {
    Phone.findById(req.params.id)
        .then(phone => {
            if (!phone) return res.status(404)
            return res.status(200).json(phone);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});



//edit a phone
/* 
    this route make an update to the model phone, 
    but respect the filed even when they don't come in the update
*/
router.put('/:id', (req, res, next) => {
    Phone.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(phone => {
            return res.status(202).json(phone)
        }).catch(err => {
            return res.status(404).json(err);
        });

})
//delete a phone

router.delete('/:id', (req, res, next) => {
    Phone.findByIdAndRemove(req.params.id)
        .then(phone => {
            res.status(200).json(phone)
        })
        .catch(e=>{
            res.status(500).json({message:"algo falló"})
            next(e)
        });
});

module.exports = router