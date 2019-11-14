let mongoServer = require('mongodb').Server;
const url = 'localhost';
let MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const nome_database = 'chimera';
const key = 'data';
const SESSION = 'session';
let db = undefined;

async function connect(){
    return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost:27017/"+nome_database,function (err, database) {
                if(err) reject(err);
                db = database;
                resolve("Database connesso");
            });
        }
    );
}

async function disconnect(){
    return new Promise((resolve, reject) => {
            try{
                db.close();
                resolve("Database disconnesso");
            }catch(e){
                reject(e);
            }
        }
    );
}

/*
This function retrieve a record starting from its timestamp
 */
async function selectFromTimestamp(timestamp){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        collection.find({timestamp}).toArray(function(err, result){
            if(err) reject(err);
            resolve(result);
        });
    });
}

/*
This function return all the records with timestamp between start and finish (start and finish included)
 */
async function selectManyFromTimestamp(start, finish){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        const query = {
            timestamp: {
                $gte: start,
                $lte: finish
            }
        };
        collection.find(query).toArray(function(err, result){
            if(err) reject(err);
            resolve(result);
        });
    });
}

/*
This function returns all the data with timestamp between start and finish with the marker set
 */
async function getMarks(start, finish){
    return new Promise((resolve, reject) => {
        const collection = db.collection(key);
        const query = {
            timestamp: {
                $gte: start,
                $lte: finish
            },
            marker: true
        };
        const field = {
            timestamp: 1,
            marker: 1,
            mark: 1
        };
        collection.find(query, field).toArray(function (error, result){
            if(error) reject(error);
            resolve(result);
        });
    });
}


module.exports = {
    connect : connect,
    disconnect:disconnect,
    selectManyFromTimestamp : selectManyFromTimestamp,
    selectFromTimestamp : selectFromTimestamp,
    getMarks: getMarks
};
