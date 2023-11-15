// index.js
const express = require('express');
const apiRoutes = require('./routes/api');
const path = require('path'); // Node.js path module for working with file paths
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const rateLimit = require("express-rate-limit");

//models
const Flow = require('./models/UserDataModel');
const Schedule = require('./models/scheduleModel');
const publicSchedule = require('./models/publicScheduleModel');
const SessionKey = require('./models/sessionKeys');
const InventoryData = require('./models/inventoryModel');


const app = express();
const PORT = 3001;

// go to terminal in VS code upper right
// use "node ." to start the server
// use "http://localhost:3000" on browser, change the port (last number part) as necessary matching PORT constant
// use "ctrl + c" keys (keyboard) on terminal to stop (it stops the mentioned port on the code) the local server

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window to avoid DDoS attacks, hey im keeping the security
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware to parse request bodies
app.use(express.json());

// This one sends the user from here to index.html (root > here > html) heres the path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Connect API routes
app.use('/api', apiRoutes);

// runs the entire directory(the ones outside folders)
app.use(express.static(path.join(__dirname, '')));




// here are the req (get data) and res (send data)
app.post('/users', limiter, async (req, res) => {
  try {
    const existingUser = await Flow.findOne({ _id: req.body._id });
    if (existingUser) {
      // If user with the same _id already exists, send a custom error response
      res.status(400).json({ error: "Username already exists." });
    } else {
      // If no duplicate, create the user and send a success response
      const flow = await Flow.create(req.body);
      res.status(200).json(flow);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

//getting user info
app.get('/users/:id', limiter, async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Flow.findById(id);
    res.status(200).json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }

})

//logging user via id and pass
app.get('/login/:id', limiter, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.query;

    // Check if the provided _id and password are valid
    const existingUser = await Flow.findOne({ _id: id, password: password });


    if (existingUser) {
      const session = await Flow.findById(id);
      res.status(200).json(session);
    } else {

      // If user is not found or password doesn't match, return an error response
      res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    // Handle any other errors that might occur
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

//creation of schedule
app.post('/queue', limiter, async (req, res) => {
  try {
    const { _id, date, time, package } = req.body;
    if (!_id || !date || !time || !package) {
      // If any required field is missing, send a detailed bad request response
      return res.status(400).json({ error: "Please fill the followting fields, select the schedule" });
    }

    const Queue = await Schedule.findOne({ _id });
    if (Queue) {
      // If user with the same _id already exists, send a custom error response
      return res.status(400).json({ error: "User already has an appointment scheduled" });
    } else {
      // If no duplicate and all required fields are present, create the user and send a success response
      const schedule = await Schedule.create(req.body);
      return res.status(200).json(schedule);
    }
  } catch (error) {
    console.error(error.message);
    // Handle other errors here
    return res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});


//admin view
app.get('/queue', async (req, res) => {
  try {
    const queueItems = await Schedule.find();
    res.status(200).json(queueItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

app.delete('/queue/:id', limiter, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRow = await Schedule.findByIdAndDelete(id);

    // Check if row was found and deleted
    if (!deletedRow) {
      return res.status(404).json({ error: "Row not found." });
    }

    res.status(200).json({ message: "Row deleted successfully.", deletedRow });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});


app.get('/usersDB', async (req, res) => {
  try {
    const perm = 'user';
    const usersDB = await Flow.find({ perms: perm });
    res.status(200).json(usersDB);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});
app.get('/adminDB', async (req, res) => {
  try {
    const perm = 'admin';
    const usersDB = await Flow.find({ perms: perm });
    res.status(200).json(usersDB);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});
app.get('/stylistDB', async (req, res) => {
  try {
    const perm = 'stylist';
    const usersDB = await Flow.find({ perms: perm });
    res.status(200).json(usersDB);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

//admin click
app.post('/publicQueue', async (req, res) => {
  try {
    const pQueue = await publicSchedule.findOne({ _id: req.body._id });
    if (pQueue) {
      // If user with the same _id already exists, send a custom error response
      res.status(400).json({ error: "User already has appointment." });
    } else {
      // If no duplicate, create the user and send a success response
      const Pschedule = await publicSchedule.create(req.body);
      res.status(200).json(Pschedule);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

app.delete('/publicQueue/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRow = await publicSchedule.findByIdAndDelete(id);

    // Check if row was found and deleted
    if (!deletedRow) {
      return res.status(404).json({ error: "Row not found." });
    }

    res.status(200).json({ message: "Row deleted successfully.", deletedRow });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});


//public queue
app.get('/publicQueue', async (req, res) => {
  try {
    const pQueueItems = await publicSchedule.find();
    res.status(200).json(pQueueItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

//session key
app.post('/sessionKey', limiter, async (req, res) => {
  try {
    const { _id, sessionid } = req.body; // Extract _id and session_id from request body.

    const sessionKeyData = {
      _id: _id,
      sessionid: sessionid,
    };
    const SessionKeyRes = await SessionKey.findOneAndUpdate({ _id: _id }, sessionKeyData, { upsert: true, new: true });
    res.status(200).json(SessionKeyRes);
    console.log('Worked')

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get('/sessionKey/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionKey.findById(id);
    res.status(200).json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

app.get('/inv', async (req, res) => {
  try {
    const queueItems = await InventoryData.find();
    res.status(200).json(queueItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

mongoose.set("strictQuery", false)
// Start the server
mongoose.connect('mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });


  