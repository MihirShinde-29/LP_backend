const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./models");
dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(
    cookieSession({
        name: "LP",
        keys: ["key1", "key2"],
    })
);

db.mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});
    
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require('./routes/auth.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - http://localhost:5000/`);
});