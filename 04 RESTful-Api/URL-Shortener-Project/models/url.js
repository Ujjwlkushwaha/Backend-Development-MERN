const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    shortId : {
        type : String,
        required : true,
        unique : true
    },
    originalUrl : {
        type : String,
        required : true
    },
    visitCount : [ 
        { 
            timestamp : { 
                type : Number
            },
            user_ip : {
                type : String
            },
            _id : false
        }
    ]
} , { timestamps: true }) //✅  ye ak property add kar dega jisme hme pta chalga koi entry kab create hui and kab update hui 

module.exports = mongoose.model('Url', urlSchema);