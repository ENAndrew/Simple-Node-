
//when used, this is essentially wrapped in an iife - the object is essentially returned
// .require() brings in the entire file and executes it

var books = require('../models/book.js')

//For part two we're moving all our cb functions into an object

//these were all previously attached to the .post or .get methods being used in index.js

module.exports = {                            //this is a nodeJS method
    index: function(req, res, next){ 
        if(req.query.rating){   //if there is a query parameter of 'rating'
            var rating = parseInt(req.query.rating);  //req.query stuff is all strings, needs to be parsed to numeral
            ratedBooks = [];
            books.forEach(function(book, index, array){
                if(book.rating === rating) {
                    ratedBooks.push(book);
                }
            });
            res.send(ratedBooks);
        } else {
            res.send(books);
        }
        },
    build: function(req, res, next){
        books.push(req.body.name); //just putting in the name value, not the whole object
        res.send(books);
        },
    update: function(req, res, next){  //this only does it's thing if the incoming method is PUT
        var newPosition = req.body.position;  // gives 2
        books[newPosition] = req.body.newName; // gives 'dragonbone chair'
        res.send(books);
        },
    destroy: function(req, res, next){
        books.splice(req.params.id, 1);
        res.send(books);
        }
};

