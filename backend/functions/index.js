const functions = require("firebase-functions");
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { cors } = require("./middleware/cors");
const {fb} = require('./config');
const { getFirestore } = require("firebase-admin/firestore");
const admin = require('firebase-admin');

app.use(bodyParser.json());
app.use(cors);

app.get('/test', async (req,res,next) => {
    try{
        console.log('test endpoint');
        let db = getFirestore(fb);
        let cols = await db.listCollections();
        console.log('collections',cols);
        let collection = db.collection('test-collection');
        let vals = await collection.get();
        let docs = vals.docs;
        for (let doc of docs) {
            console.log(`Document found at path: ${doc.ref.path}`);
        }
        return res.json({
            message: fb.name,
            test:process.env?.TESTVAL
        });
    }
    catch(e){
        console.log(e);
        return res.json({
            error:'error'
        })
    }
});

app.use((req,res,next) => {
    res.status(500);
    let err = res.err ? res.err : 'no error provided';
    console.log('error: ',err);
    return res.json({
        message:'An error occured',
        error:err.message ? err.message : err
    })
});

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
