const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session');

const tempelatePath = path.join(__dirname, '../tempelates');

app.use(session({
    secret: 'your_secret_key', // Change this to a secure random key
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/HarmonyWithLife")
    .then(() => {
        console.log("MongoDB connected");
        // Start the server once MongoDB is connected
        createServer();
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });

//

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


// // Define the schema and model for login and signup
const SignUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

const Signup = mongoose.model("Signup", SignUpSchema);

// // Define the schema and model for journal entry
const journalEntrySchema = new mongoose.Schema({
    datetime: {
        type: Date,
        required: true
    },
    entry: {
        type: String,
        required: true
    }
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

// Routes

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/home", authenticateUser, (req, res) => {
    // Render the home page only if the user is authenticated
    res.render("home");
});

app.get("/journal", (req, res) => {
    // Render the journal page
    res.render("journal");
});


app.get("/expense", (req, res) => {
    res.render("expense");
});

app.get("/meditation",  (req, res) => {
    res.render("meditation");
});

app.get("/diet",  (req, res) => {
    res.render("diet");
});



app.post("/signup", async(req,res)=>{

    const data = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email 

    }

    try {
        // Insert data into the database
        await Signup.insertMany(data);
        
        // Redirect to the journal page upon successful login
        res.redirect("/");
    } catch (error) {
        // Handle errors
        console.error("Error inserting signup data:", error);
        // Redirect to an error page or display an error message
        res.status(500).send("An error occurred while logging in.");
    }
});

app.post("/login", async (req, res) => {
   //verification and authentication 

   const { name, password } = req.body;

   try {
       // Check if the user exists in the database
       const user = await Signup.findOne({ name: name });

       if (!user) {
           // User not found, redirect to login page or display an error message
           return res.status(404).send("User not found.");
       }

       // Check if the password matches
       if (password !== user.password) {
           // Incorrect password, redirect to login page or display an error message
           return res.status(401).send("Incorrect password.");
       }

       req.session.user = user;

       // Authentication successful, redirect to the home page
       res.redirect("/home");
   } catch (error) {
       // Handle errors
       console.error("Error during login:", error);
       res.status(500).send("Internal Server Error");
   }
});
//     res.redirect("/home");
// });

// Route for saving a journal entry

app.post("/journal", async (req, res) => {
    const data1= {
        datetime:req.body.datetime,
        entry: req.body.entry

    };

    await JournalEntry.create([data1]);

    res.redirect("/journal"); 

    // Check if entry is provided
    // if (!data.entry) {
    //     return res.status(400).send("Entry is required.");
    // }

    // try {
    //     // Save journal entry to database
    //     await JournalEntry.insertMany([data1]);
    //     console.log("Journal entry saved successfully.");
    //     res.redirect("/journal"); // Redirect to journal page after saving
    // } catch (error) {
    //     console.error("Error saving journal entry:", error);
    //     res.status(500).send("Internal Server Error");
    // }
});


// // app.post("/journal", async (req, res) => {
// //     const { entry } = req.body;

// //     try {
// //         // Save journal entry to the database
// //         await JournalEntry.create({ entry });
// //         console.log("Journal entry saved successfully.");
// //         res.redirect("/journal"); // Redirect to journal page after saving
// //     } catch (error) {
// //         console.error("Error saving journal entry:", error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });



// // Function to create server
function createServer() {
    const desiredPort = 3001;
    let currentPort = desiredPort;

    const server = app.listen(currentPort, () => {
        console.log(`Server is running on port ${currentPort}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            // Port is already in use, try the next port
            console.log(`Port ${currentPort} is already in use. Trying the next port...`);
            currentPort++;
            createServer();
        } else {
            console.error('Server error:', error);
        }
    });
}

function authenticateUser(req, res, next) {
    // Check if user is logged in
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to login page
        res.redirect("/"); // Assuming "/" is your login page
    }
}


