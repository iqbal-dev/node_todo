const express = require('express');
const password = '7PIBrvrCsHKiasiO';
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://todo:7PIBrvrCsHKiasiO@cluster0.x1s8i.mongodb.net/todoDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });





const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
    const collection = client.db("todoDb").collection("todoCollection");
    app.post('/addTodo', (req, res) => {
        const todo = req.body;
        todo.id = Math.floor((Math.random() * 1000) + 10);
        collection.insertOne(todo)
        res.send(todo);
    })
    app.get('/getTodo', (req, res) => {
        collection.find({})
            .toArray((err, document) => {
                res.send(document);
        })
    })
    app.delete('/delete/:id', (req, res) => {
        collection.deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
            
        })
        
    })
    app.get('/update/:id', (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, document) => {
                res.send(document[0]);
                console.log(document);
        })
    })
    app.patch('/submitUpdate/:id', (req, res) => {
        collection.updateOne({ _id: ObjectId(req.params.id) },
        {
            $set:{todoName: req.body.name}
        })

    })
    
});


app.listen(4000, () => {
    console.log('listening on port 3000')
})