var express = require('express');
var bodyParser = require('body-parser');  //parses the body section of http

var books = ['doom', 'grapes of wrath', '1984'];

var app = express(); //app is the return of the express function

//req.body comes in as a string

//always parse http body as JSON
//assigns result to req.body
app.use(bodyParser.json());   //.use means it happens on all http methods

//req.body is parsed into a JSON object



//checks to see if the url path === '/books', runs if matches
app.get('/books', function(req, res, next){  //this only does its thing on http GET methods
    res.send(books);
});

app.post('/books', function(req, res, next){
    // req.body = { "name": "hyperion" } at the moment, coming from PostMan, manually entered in body
    books.push(req.body.name); //just putting in the name value, not the whole object
    res.send(books);
});

//lets assume that from the front end we receive an object that looks like: 
//{
//    position: 2, 
//    newName: 'dragonbone chair'
//}

app.put('/books', function(req, res, next){  //this only does it's thing if the incoming method is PUT
    var newPosition = req.body.position;  // gives 2
    books[newPosition] = req.body.newName; // gives 'dragonbone chair'
    res.send(books);
});




// :id is a variable portion of the URL, so it is looking for /books/anything_goes_here, will pass test (could be :anythingatall)
//req.params begins as an empty object.  For /books/2' req.params = { id: 2 }

app.delete('/books/:id', function(req, res, next){
    books.splice(req.params.id, 1);
    res.send(books);
});




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