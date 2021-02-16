"use strict";
var express = require("express");
var app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


app.use(express.static(__dirname + "/public", { index: false }));
app.use(express.static(__dirname + "/views", { index: false }));
app.use(express.static(__dirname + "/js", { index: false }));
app.use(express.static(__dirname + "/public/css", { index: false }));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

/* 接続先URL */
const url = 'mongodb://127.0.0.1:27017';

/* データベース名 */
const dbName = 'wa32db';

/**
 * 追加オプション
 * MongoClient用オプション設定
 */
const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//-----------------------------トップページ-------------------------------
app.get('/', function(req, res) {
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection('wa32data');
        collection.find({}).toArray(function(err, docs) {
            console.log(docs);
            res.render('index.ejs', { value: docs });
        })
    });
})

// app.post('/users', function(req, res) {
//     MongoClient.connect(url, connectOption, function(err, client) {
//         console.log("Connected");
//         const db = client.db(dbName);
//         insertDocuments(req.body.name, db, function() {
//             const collection = db.collection('wa32data');
//             collection.find({}).toArray(function(err, docs) {
//                 console.log(docs);
//                 res.send(docs);
//             })
//         });
//     });
// })
app.post('/users', function(req, res) {
    var senddata = {
        name: req.query.name,
        val1: req.query.val1,
        val2: req.query.val2
    }
    console.log(senddata);
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connect");
        const db = client.db('wa32db');

        insertDocuments(db, function() {
            findDocuments(db, function() {

            });
        });
    });
    const insertDocuments = function(db, callback) {
        const collection = db.collection('wa32data');
        console.log("insert");
        collection.insertMany([
            { name: senddata.name }, { val1: senddata.val1 }, { val2: senddata.val2 }
        ], function(err, result) {
            console.log("insert");
            callback(result);
        });
    }
    const findDocuments = function(db, callback) {
        const collection = db.collection('wa32db');
        collection.find({}).toArray(function(err, docs) {
            console.log(docs);
            callback(docs);
        });
    }

    res.render("index.ejs");
})

app.get('/users', function(req, res) {
    console.log(req.query.sort, req.query.number, req.query.offset);
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection('wa32data');
        console.log("findOne");
        collection.find().sort({ name: Number(req.query.sort) }).skip(Number(req.query.offset)).limit(Number(req.query.number)).toArray(function(err, result) {
            res.send(result);
        })
    });
})

app.get('/users/:name', function(req, res) {
    console.log(req.params.name);
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection('wa32data');
        console.log("findOne");
        collection.find({ name: req.params.name }).toArray(function(err, result) {
            console.log('name:' + JSON.stringify(result));
            res.send(result);
        })
    });
})
app.post('/delete', function(req, res) {
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection('wa32data');
        console.log("findOne");
        deleteDocuments(db, req.body.delete, function() {
            collection.find({}).toArray(function(err, docs) {
                console.log(docs);
                res.send(docs);
            })
        })
    });
})
app.get('/search', function(req, res) {
    console.log(req.query.name);
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection('wa32data');
        collection.find({ name: req.query.name }).toArray(function(err, docs) {
            console.log(docs);
            res.send(docs);
        })
    });
})
app.put('/search', function(req, res) {
    MongoClient.connect(url, connectOption, function(err, client) {
        console.log("Connected");
        const db = client.db(dbName);
        const collection = db.collection('wa32data');
        updateDocuments(db, req.body.name, req.body.val1, req.body.val2, req.body.signup, function() {
            collection.find({}).toArray(function(err, docs) {
                console.log(docs);
                res.send(docs);
            })
        })
    });
})

const findDocuments = function(db, callback) {
    const collection = db.collection('wa32data');
    console.log("findOne");
    collection.find({}, function(err, result) {
        console.log("Inserted");
        callback(result);
    });
}

const insertDocuments = function(val, db, callback) {
    const collection = db.collection('wa32data');
    console.log("Insert");
    collection.insertOne(val, function(err, result) {
        console.log("Inserted");
        callback(result);
    });
};

const updateDocuments = function(db, name, val1, val2, signup, callback) {
    const collection = db.collection('wa32data');
    collection.update({ name: name }, { $set: { val1: val1, val2: val2, signup: signup } }, function(err, docs) {
        console.log(docs);
        callback(docs);
    })
}

const deleteDocuments = function(db, name, callback) {
    const collection = db.collection('wa32data');
    collection.remove({ name: name }, function(err, docs) {
        console.log(docs);
        callback(docs);
    })
}

app.listen(9000);