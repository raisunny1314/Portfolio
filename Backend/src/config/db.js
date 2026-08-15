const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log("DataBase Connected Succesfully");

    } catch (err) {
       console.error("Database Failed",err.message);
       process.exit(1);
    }
};

module.exports = connectDB;