const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors')

const app = express ();
dotenv.config();

app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose.connect(`mongodb+srv://${username}:${password}@cluster539.ubtj2zi.mongodb.net/booking_details`),{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}



const book = new mongoose.Schema({ 
    name: { 
        type: String, 
        require: true
    }, 
    address: { 
        type: String, 
        require: true
    }, 
    email: { 
        type: String, 
        require: true
    },
    contact_no: Number, 
    car_model: { 
        type: String, 
        require: true
    }
})

const Book = mongoose.model("Book" ,book );


const test_drive = new mongoose.Schema({ 
    name: { 
        type: String, 
        require: true
    }, 
    address: { 
        type: String, 
        require: true
    }, 
    email: { 
        type: String, 
        require: true
    },
    contact_no: Number, 
    car_model: { 
        type: String, 
        require: true
    }
})

const TestDrive = mongoose.model("TestDrive" ,test_drive );

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use(bodyParser.urlencoded ({ extended: true}))
app.use(bodyParser.json());


//I need a post api to save the data in the database
app.post("/book", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.send(book);
    } catch (error) {
        console.log(error);
    }
});
//please help me with body structure
app.post("/test-drive", async (req, res) => {
    try {
        // return res.status(200).json({
        //     message: "test drive booked successfully",
        //     data: req.body
        // })
        const test_drive = new TestDrive(req.body);
        await test_drive.save();
        res.send(test_drive);
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.PORT || 5500, () => {
    console.log(`server is runing at PORT: ${process.env.PORT}`);
  });