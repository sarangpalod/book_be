const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express ();
dotenv.config();

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

app.use(bodyParser.urlencoded ({ extended: true}))
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is runing at PORT: ${process.env.PORT}`);
  });