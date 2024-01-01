const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// const PORT = require("./config/server.config");
// const { mongoDbUri } = require("./config/db.config");

const env = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token");
    next();
});

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
authRoutes(app);
userRoutes(app);
ticketRoutes(app);

// mongoose.connect(mongoDbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// const db = mongoose.connection;

app.use(bodyParser.json());
mongoose.set('debug', true);
// db.on("error", () => {
//     console.log("Error while connecting to data base");
// })

// db.once("open", () => {
//     console.log("Connected to MongoDB Successfully");
// })


// // app.listen(PORT, () => {
// //     console.log("server is listening to the port: ", PORT);
// // })


// app.listen(PORT, ()=>{
//     console.log("server is listening to the port: ", PORT);
//     /* connect to mongo db */
//     mongoose.connect(mongoDbUri).then(
//         () => {
//             /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
//             console.log("connected to mongo db successfully");
//         },
//         err => {
//             /** handle initial connection error */
//             console.log("Error occurred: ", err);
//         }
//     );
// })
app.get('/', (req, res) => {
    res.send('Home');
})

app.listen(process.env.PORT, async () => {
    // this callback gets execcuted, once we successfully start the server on the given port
    console.log(`Server started on Port ${process.env.PORT} !!`);

    try {
        if(process.env.NODE_ENV == 'production') {
            await mongoose.connect(process.env.PROD_DB_URL); // connected to the mongo server
        } else {
            await mongoose.connect(process.env.DB_URL); // connected to the mongo server
        }
        
        console.log("Successfully connected to mongo");
    } catch (err) {
        console.log("Not able to connect mongo", err);
    }
});
