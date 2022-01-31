const mongoose = require("mongoose");

export default async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to DB Successful");
  } catch (err) {
    console.log("Connection to DB Failed:");
  }
};
