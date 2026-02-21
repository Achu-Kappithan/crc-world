const { default: mongoose } = require("mongoose")

const dbconnect = async () => {
    const uri = process.env.DATABASE_CONFIG;

    if (!uri) {
        console.error("-----------------------------------------")
        console.error(" ERROR: DATABASE_CONFIG environment variable is missing!")
        console.error("-----------------------------------------")
        return;
    }

    // Sanitize URI for logging (hide password)
    const sanitizedUri = uri.replace(/\/\/.*:.*@/, "//****:****@");
    console.log(`📡 Attempting to connect to: ${sanitizedUri}`);

    try {
        await mongoose.connect(uri);
        console.log("-----------------------------------------")
        console.log(" Database connected successfully")
        console.log(`Host: ${mongoose.connection.host}`)
        console.log("-----------------------------------------")
    } catch (error) {
        console.error("-----------------------------------------")
        console.error(" ERROR: Database connection failed!")
        console.error(` Message: ${error.message}`)
        if (error.name === 'MongooseServerSelectionError') {
            console.error("TIP: This usually means your IP is not whitelisted in MongoDB Atlas.")
            console.error("Please add 0.0.0.0/0 to your Atlas Network Access settings for Render.")
        }
        console.error("-----------------------------------------")
        throw error; 
    }
}


mongoose.connection.on("error", (err) => {
    console.error(` MongoDB connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});

module.exports = dbconnect

