const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Sports} = require('./models/sport-model');

const app = express();


/* Your code goes here */

app.post('/sports/addSport/:sportId',jsonParser,(req,res)=>{

    let name = req.body.name;
    let num = req.body.num_players;
    let id_body = req.body.id;

    let id_param = req.params.sportId;

    if(!id_body || !num || !name){
        res.statusMessage = "Plese send all params in the body";
        return res.status(406).end();
    }

    if(id_body != id_param){
        res.statusMessage = "id does not match";
        return res.status(409).end();
    }

    let newSport = {
        id : id_body,
        name : name,
        num_players : num};
    Sports.createSport(newSport)
    .then(result =>{
        if(result.name === "MongoError"){
            res.statusMessage = "id duplicated"
            res.status(400).end();
        }
        return res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.statusMessage = "Something went wrong"
        return res.status(500).end();
    })







})


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});