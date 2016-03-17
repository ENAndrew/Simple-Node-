var express = require('express');
var bodyParser = require('body-parser');  //parses the body section of http

var booksCtrl = require('./controllers/books_controller.js');

// ./ references the current folder

var app = express(); //app is the return of the express function

//req.body comes in as a string

//always parse http body as JSON
//assigns result to req.body
app.use(bodyParser.json());   //.use means it happens on all http methods

//req.body is now parsed into a JSON object

app.use(function(req, res, next){
    console.log(req.body);
});


//calling next() will go to next registered function



app.use(function(req, res, next){
    console.log(req.params);
});










//The following methods are now referencing an object in books_controller.js

//checks to see if the url path === '/books', runs if matches
 //this only does its thing on http GET methods
app.get('/books', booksCtrl.index); //Does not need to be called, express will call it

app.post('/books', booksCtrl.build);

//lets assume that from the front end we receive an object that looks like: 
//{
//    position: 2, 
//    newName: 'dragonbone chair'
//}

app.put('/books', booksCtrl.update);
// :id is a variable portion of the URL, so it is looking for /books/anything_goes_here, will pass test (could be :anythingatall)
//req.params begins as an empty object.  For /books/2' req.params = { id: 2 }

app.delete('/books/:id', booksCtrl.destroy);

//how this works:  went into PostMan, provided a url of localhost:3000/books/1  DELETE method
//nothing in the body
//because we have /books/1 and our function is looking for /books/:id, req.params will now be { id: 1 }
//we received back the array with position 1 deleted.  



//starts the loop that's looking for requests to come in, 3000 is a local port
var port = 3000;
app.listen(port, function(){
    console.log('listening on port ' + port);
});

//now when we run >node index.js it console.logs that's it's listening, then continues to run indefinitely (input prompt does not return)


///////////EXAMPLE ONE, POST METHOD ////////////////////////////////////////////////

//in previous example using a POST method: 
//
//////checks to see if the url path === '/books', runs if matches
//app.post('/books', function(req, res, next){  //this only does its thing on http POST methods
//    var incomingBody = req.body;
//    console.log(incomingBody);
//    res.send(incomingBody); //we're just sending back the same thing we got in our request
//});
//at this point we go over to PostMan, and set up a POST to localhost:3000/books
//sent the following in the body, set to raw >> JSON: 

//{
//    "name": "Morty", 
//    "grandpa": "Rick", 
//    "rating": 99
//}

//and we receive back the same thing, since we're res.send the initial incoming body