const mongoose = require( 'mongoose' );

/* Your code goes here */
const sportsSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required : true
    },
    num_players:{
        type: Number,
        required: true,
    }
})

const sportsCollection = mongoose.model('sports',sportsSchema);

const Sports ={

    createSport : function(newSport){
        return sportsCollection.create(newSport)
        .then(createdSport =>{
            return createdSport
        })
        .catch(err =>{
            console.log(err);
            return err;
        })
    }






}

module.exports = {
    Sports
};