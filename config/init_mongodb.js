const mongoose = require("mongoose");
const pupilModel = require("../models/pupil");
const mongoUrl =
  process.env.MONGO_URI ||
  "mongodb+srv://athirapaul2995:5WKETvH638Ru4b1O@athira.jpekch9.mongodb.net/school-diary retryWrites=true&w=majority";
const dbName = process.env.DB_NAME || "school-diary";

mongoose
  .connect(mongoUrl, {
    dbName: dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const item = {
      fullName: "Admin",
      email: "admin@classtrackr.com",
      password: "admin@123",
      teacher: true,
      admin: true,
    };

    const doesExist = await pupilModel.findOne({ email: item.email });
    if (!doesExist) {
      const data = new pupilModel(item);
      await data.save();
    }

    console.log(`mongodb connected `);
  })
  .catch((error) => {
    console.log(`Error:${error.message}`);
  });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbName}`);
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
