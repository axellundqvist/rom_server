var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var drinksSchema =  new Schema ( {

    brand: String,
    model: String,
    country: String,
    number: String,
    alkohol: String,
    volume: String,
    price: String,
    comment: String
});

module.exports = mongoose.model('Drinks', drinksSchema); // exportera Schemat ut i mappstrukturen