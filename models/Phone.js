const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'The phone brand is required']
      },
      name: {
        type: String,
        required: [true, 'The phone name is required']
      },
      image: {
        type: String, default: ''
      },
      specs: {
        type: Array,
        default: []
      }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('Phone', phoneSchema)