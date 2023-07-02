let collectioncourses // declare a new variable

const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://dariotao01:U2lz6UlVYc4FVVSh@cluster0.ztilryq.mongodb.net/"; 

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const res = await client
            .db("UofTCourses")
            .collection("courses")
            .findOne({});
        console.log(res);
        collectioncourses = await client  // this allows database available globally
            .db("UofTCourses")
            .collection("courses")
    } finally {
    }
}
run().catch(console.dir);




const express = require('express')  // require means import
const app = express()
const port = 3000  // const: immutable variable cannot be reassigned

app.use(express.static('public'))  // express is a library that allows you to make middleware easily

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {  // listen starts the server; the server exists on port 300 on my computer
  console.log(`Example app listening on port ${port}`)
})


app.post('/courses/:coursecode', async(req, res) => {  // app.post is an HTTP method. Post is when you want to return stuff
    const result = await collectioncourses.findOne({course_code: {$eq: req.params.coursecode}})
    console.log(result)
    res.send(result)
})


// need to get data front end is sending us. We can do it through URL or request body.
// grab it through the URL.

// now we can pass in variable called coursecode (/courses/:coursecode)

// write code to get coursecode from database.
// database is in async function
