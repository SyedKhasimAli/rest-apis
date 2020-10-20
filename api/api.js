var express = require('express');
var app = express();
var port = process.env.PORT || 7800;
var bodParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var mongourl = "mongodb+srv://syed_123:syed@123@cluster0.aimnl.mongodb.net/RestData?retryWrites=true&w=majority";
var cors = require('cors');
var db;

app.use(cors());

app.get('/health',(req,res) => {
    res.send("Api is working")
});

app.get('/',(req,res) => {
   res.send("First MongoDB data")
})

//List of city
app.get('/location',(req,res) => {
    db.collection('city').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//mealtype
app.get('/mealtype',(req,res) => {
    db.collection('mealType').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//cusine
app.get('/cuisine',(req,res) => {
    db.collection('cuisine').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//restaurents
app.get('/restaurents',(req,res) => {
    var query = {};
    if(req.query.city){
        query={city:req.query.city}
    }else{
        query={}
    }
    db.collection('restaurent').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//order
app.get('/orders',(req,res) => {
    db.collection('orders').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl,(err,connection) => {
    if(err) throw err;
    db = connection.db('RestData');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})
