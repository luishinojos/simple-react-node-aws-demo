// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({ region: 'us-west-1' });

// Create S3 service object
s3 = new AWS.S3({ apiVersion: '2006-03-01' });


app.get("/test", (req, res) => {
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Buckets);
            res.json({ datda: data.Buckets });
        }
    });
});

app.get("/signed", (req, res) => {
    var params = { Bucket: 'luishinojos-demobucket', Key: 'it-worked.gif', Expires: 60 };
    var url = s3.getSignedUrl('getObject', params);
    console.log('The URL is', url); // expires in 60 seconds
    res.json({ url: url });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});