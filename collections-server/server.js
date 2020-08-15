// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/collections");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Collection = mongoose.model('Collection', {
    name: String,
    description: String,
    condition: String,
    quantity: Number,
    image: String,
    barcode: Number
});


// AWS / S3 Upload - WIP
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAJKW2FKPIXXIZFKHA',
    secretAccessKey: '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',
    region: 'us-east-2'
});

const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'swdv665-mcarrington-final',
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        cb(null, file.originalname)
        // cb(null, Date.now().toString() + '-' + file.originalname)
      }
    })
  });

    // temporary file upload to AWS
    app.post('/upload', uploadS3.single('file'),(req, res) => {
        console.log(req.file);
        console.log("Location is :: " + req.file.location);
      });

//AWS.config.loadFromPath('./s3_config.json');
//var s3 = new AWS.S3();


  // Multer + MongoDB Storage - WIP

  var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })

//   const upload = multer({inMemory: true});

  app.post('/uploadphoto', upload.single('picture'), (req, res) => {
	var img = req.file.buffer;
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
 
    var finalImg = {
        contentType: req.file.mimetype,
        image:  new Buffer(encode_image, 'base64')
    };

    Collection.create(finalImg, (err, result) => {
        console.log(result)

        if (err) return console.log(err)

        console.log('saved to database')    
  })
})


// Get all collections items
app.get('/api/collections', function (req, res) {

    console.log("Listing collections items...");

    //use mongoose to get all collections in the database
    Collection.find(function (err, collections) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(collections); // return all collections in JSON format
    });
});

// Create a collections Item
app.post('/api/collections', function (req, res) {

    console.log("Creating collection item...");

    Collection.create({
        name: req.body.name,
        description: req.body.description,
        condition: req.body.condition,
        quantity: req.body.quantity,
        image: req.body.image,
        barcode: req.body.barcode,
        done: false
    }, function (err, collection) {
        if (err) {
            res.send(err);
        }

        // create and return all the collections
        Collection.find(function (err, collections) {
            if (err)
                res.send(err);
            res.json(collections);
        });
    });

});

// Update a collections Item
app.put('/api/collections/:id', function (req, res) {
    const collection = {
        name: req.body.name,
        description: req.body.description,
        condition: req.body.condition,
        quantity: req.body.quantity,
        image: req.body.image,
        barcode: req.body.barcode,
    };
    console.log("Updating item - ", req.params.id);
    Collection.update({_id: req.params.id}, collection, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a collections Item
app.delete('/api/collections/:id', function (req, res) {
    console.log("Deleting item - ", req.params._id)
    Collection.remove({
        _id: req.params.id
    }, function (err, collection) {
        if (err) {
            console.error("Error deleting collections item :: ", err);
        }
        else {
            Collection.find(function (err, collections) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(collections);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Collections server listening on port  - ", (process.env.PORT || 8080));