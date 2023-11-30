const mongoose = require("mongoose");
mongoose.connect(process.env.mongourl)
    .then(() => { console.log("Database has been connected now!") })
    .catch(err => console.log(err));
    