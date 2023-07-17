const express = require('express'); 
const Datastore = require('nedb');

const app = express();
const db = new Datastore();

// add the body parser
app.use(express.json());

const PORT = 9000;

// this is our iterating id
let id = 1;

// -------------
// CREATE route
app.post('/', (req, res) => {
    console.log('Creating item:');
   
    // our item object
    let item = {
        _id : id.toString(),
        name : req.body.name
    }

    // iterating our id by one
    id++;

    // insert the item into our database
    db.insert(item, (err, item) => {
        if (err) res.send(err); // error handling

        res.status(201).send(`ITEM CREATED: ${JSON.stringify(item)}`); // send a respose with status 201 and body of item

        console.log(JSON.stringify(item)); // log item to server console
    })

});

// ------------
// READ routes
app.get('/', (req, res) => {
    console.log('Reading Items:');
    // LIST OF ITEMS IN DATABASE
    db.find({}, (err, items) => {
        if (err) res.send(err);

        res.status(200).send(items);

        console.log(JSON.stringify(items));
    })
});

app.get('/:id', (req, res) => {
    console.log(`Reading item id: ${req.params.id}`);
    // THE ITEM THAT WE ARE READING FROM DATABASE
    db.find({ _id : req.params.id }, (err, item) => {
        if (err) res.send(err);

        res.status(200).send(item);

        console.log(JSON.stringify(item));
    })

});

// -----------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Express server is running on PORT: ${PORT}`);
    console.log('to stop the server press ctrl+c')
});

/*
curl -s -X POST http://localhost:9000/ -H 'Content-type:application/json' -d '{"name":"Cameron"}'

curl -s -X POST http://localhost:9000/ -H 'Content-type:application/json' -d '{"name":"Basil"}'

curl -s -X GET http://localhost:9000/

curl -s -X GET http://localhost:9000/1
*/
