const express = require('express');
const {MongoClient} = require('mongodb');

const app = express();

const ejs = require('ejs');

app.set('view engine', 'ejs');

// express stuff
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true })); // Add this line to parse the form data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit',async (req, res) => {
  const courseName = req.body.courseName;
  console.log('User entered course name:', courseName);

//   res.send('Course name received successfully!');

  const course = await findOneListingByName(courseName); 

  if (course) {
    res.render('course-details', {course: course});
  } else {
    res.send('Course not found!');
  }

  // call the function passing the courseName
//   await findOneListingByName(courseName);  // the entire program ends after this line (it ends in the function called)
});


// mongoDB stuff
async function findOneListingByName(nameOfCourse) {
    const uri = "mongodb+srv://dariotao01:U2lz6UlVYc4FVVSh@cluster0.ztilryq.mongodb.net/"; 
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
        
        // find the listing by nameOfCourse
        const result = await client.db("UofTCourses").collection("courses").findOne({course_code: nameOfCourse});
        
        if (result) {
            console.log(`Found a listing in the collection with the name '${nameOfCourse}':`);
            console.log(result);
            return result; // Return the course details
        } else {
            console.log(`No listings found with the name '${nameOfCourse}'`);
            return null; // Return null if course is not found
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
