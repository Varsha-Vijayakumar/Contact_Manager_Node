const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cor = require('cors');
const app = express();

var { Contact } = require('./conmodel');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mycon');
app.use(cor());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/con', function (req, res) {
    Contact.find().then(function (Data) {
        res.json(Data)
    }).catch(function (err) {
        res.status(500).json({
            message: "error"
        })
    })
})

app.post('/add', function (req, res) {
    console.log(req.body);
    var conData = req.body;
    var data = new Contact(conData);
    data.save().then(function (data) {
        res.json({
            message: "success"
        })
    }).catch(function (err) {
        res.status(500).json({
            message: "error"
        })
    })
});
app.put('/update/:id', function (req, res) {
    console.log(req.params)
    console.log(req.body)
    Contact.updateOne({ _id: req.params.id }, req.body).then(function (Data) {
        res.json({
            message: "success"
        })
    }).catch(function (err) {
        res.status(500).json({
            message: "error"
        })
    })

})

app.delete('/del/:id', function (req, res) {
    console.log(req.params)
    Contact.remove({ _id: req.params.id }).then(function (Data) {
        res.json({
            message: "deleted"
        })
    }).catch(function (err) {
        res.json({
            message: "error"
        })
    })
})

app.listen(3001);