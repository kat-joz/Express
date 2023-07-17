const express = require('express'); 
const Datastore = require('nedb');
const cors = require('cors');

const app = express();
const db = new Datastore();

// add the body parser
app.use(express.json());
// add the static middleware
app.use(express.static(__dirname + '/public'));
app.use(cors());

const PORT = 9000;

// this is our iterating id
let id = 1;

// -------------
// CREATE route
app.post('/api', (req, res) => {
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

        res.status(201).send(item); // send a respose with status 201 and body of item

        console.log(JSON.stringify(item)); // log item to server console
    })

});

// ------------
// READ routes
app.get('/api', (req, res) => {
    console.log('Reading Items:');
    // LIST OF ITEMS IN DATABASE
    db.find({}, (err, items) => {
        if (err) res.send(err);

        res.status(200).send(items);

        console.log(JSON.stringify(items));
    })
});

app.get('/api/:id', (req, res) => {
    console.log(`Reading item id: ${req.params.id}`);
    // THE ITEM THAT WE ARE READING FROM DATABASE
    db.find({ _id : req.params.id }, (err, item) => {
        if (err) res.send(err);

        res.status(200).send(item);

        console.log(JSON.stringify(item));
    })

});

// DELETE request by unique identifier
app.delete('/api/:id', (req, res) => {
    console.log(`Deleting item id: ${req.params.id}`);
    db.remove({ _id : req.params.id }, (err, item) => {
        if (err) res.send(err);
        res.sendStatus(200);
        console.log('Delete successful');
    })

})

// -----------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Express server is running on PORT: ${PORT}`);
    console.log('to stop the server press ctrl+c')
});