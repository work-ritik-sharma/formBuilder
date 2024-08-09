const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1/FormBuilder").then(()=>  console.log("connection established"));

module.exports = mongoose;
