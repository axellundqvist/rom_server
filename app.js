// Axel Lundqvist
// JavaScriptbaserad webbutveckling
// Projektuppgift
// 2018-12-20

// SERVER

// Importera
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path"); // Kolla om denna används?!
var mongoose = require("mongoose");
var cors = require('cors');

// Lokal import
var Drinks = require("./app/models/drinks.js"); // Utgå från den katalog vi står i

// Uppkoppling till databasen på mlab.
mongoose.connect('mongodb://admin:Secrets1@ds115592.mlab.com:15592/rom', { useNewUrlParser: true }, (err) => { // Sökväg till databasen på mlab.
    if (!err)
    console.log('MongoDB connected successfully\n'); // Meddela om man etablerat kontakt med databasen.
    else
    console.log('Ingen kontakt med databasen: ' + JSON.stringify(err, undefined, 2)); // Om något gick fel med databasanslutningen.
});



// Instans av express
var app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

// CORS
app.use(cors());

// Statisk sökväg
// app.use(express.static(path.join(__dirname, 'public'))); // gå till index.html i public




// GET - Hämta alla drycker
app.get("/drinks/", function(req, res) {

    Drinks.find(function(err, Drinks) {
        if(err) {
            res.send(err);
        }
        res.json(Drinks); //Konvertera till JSON  -> Hämta dryckerna
    });
});



// POST - Lägg till dryck
app.post("/drinks/add", function(req, res){

    // Ny instans av Drinks
    var drink = new Drinks();

    // Skapa nytt objekt
    drink.brand = req.body.brand;
    drink.model =  req.body.model;
    drink.country = req.body.country;
    drink.number =  req.body.number;
    drink.alkohol =  req.body.alkohol;
    drink.volume =  req.body.volume;
    drink.price =  req.body.price;
    drink.comment =  req.body.comment;

     // Spara dryck, skriv ev felmeddelanden
     drink.save(function (err) {
        if(err) {
            res.send(err);
        }
    });

    res.redirect("/") //Skicka till startsidan
});


// DELETE - Ta bort dryck
app.delete("/drinks/delete/:id", function(req, res){
    
    var deleteId = req.params.id;

    console.log(deleteId);

   Drinks.deleteOne( {
       _id: deleteId
   }, function(err, Drinks) {
       if(err) {
           res.send(err)
       }
       res.json({message: "Dryck raderad, id:" + deleteId});
   });
});

// GET - Sök enskild dryck
app.get("/drinks/:id", function(req, res){
    var theId = req.params.id;

    Drinks.find( {
        _id: theId
    }, function(err, Drinks) {
        if(err) {
            res.send(err)
        }
        res.json({Drinks});
    });
    
});



// UPDATE - Ändra en dryck

app.put('/drinks/:id', (req, res) => {
    
    let id = req.params.id;
    
    data = {
        brand: req.body.brand,
        model: req.body.model,
        country: req.body.country,
        number: req.body.number,
        alkohol: req.body.alkohol,
        volume: req.body.volume,
        price: req.body.price,
        comment: req.body.comment
    };
    
    Drinks.findByIdAndUpdate(id, data, function(err, drink) {
        if (err) throw err;
     
        res.send('Drink updated - '+drink.model);
        });
    
    
});



// Port för anslutning
var port = process.env.PORT || 3000;

// Starta servern
app.listen(port, function() {
    console.log("Server is running on port " + port);
});
