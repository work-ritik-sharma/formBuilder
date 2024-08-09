const mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
    formHeader: String,

    fields: [{
        inputType: String,
        inputLabel: String,
        inputPlaceholder: String
    }],

    formFooter: String,
});

//Export the model
module.exports = mongoose.model('Form', formSchema);
