const express = require('express')
const app = express()

const bodyParser = require('body-parser')
//connection to db
const { MongoClient} = require('mongodb')
const {isEmptyPayload,isInvalidEmail} = require('./validator')
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'company_db'
const CollName = 'employees' 

app.use(bodyParser.json())
app.use('/',express.static(__dirname + '/dist'))

app.get('/get-profile', async function (req, res) {
  
    
    // connect to mongodb database
    await client.connect()
    console.log('connected successfully to server')
    //initiate or get the db & collections
    const db = client.db(dbName)
    const collection = db.collection(CollName)


    //get data from database
    const result = await collection.findOne({id: 1})
    client.close()
    var response ={}
    
    if (result !== null){
      response = {
        name: result.name,
        email: result.email,
        interests: result.interests
    }
    }
    res.send(response)

    
  })

 app.post('/update-profile',async function(req, res){
  const payload =  req.body
  console.log(payload)
 
 

  if ( isEmptyPayload(payload) ||isInvalidEmail(payload)){
    res.status(404).send({error: "empty payload. couldn't update user profile data"})
  }else{
     //connect to mongodb database
  await client.connect()
  console.log('connected successfully to server')

    // initiates or connect the db & collections
  const db = client.db(dbName)
const collection = db.collection(CollName)

 //save payload data to the database
 
 payload['id'] = 1
 const updatedValues = {$set: payload}
 await collection.updateOne({id:1 }, updatedValues,{upsert: true})
 client.close()
    res.status(200).send({info: "user profile data updated successfully"})
  }
 
} )

const server = app.listen(4000, function (){
    console.log("app listening on port 4000")
})

module.exports = {
  app,
  server
}