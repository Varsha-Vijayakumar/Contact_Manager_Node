var mongoose = require('mongoose');
var Contact = mongoose.model('contacts', {
    name: {
        type: String
    },
    phone: {
        type: Number
    }
})
module.exports = { Contact };