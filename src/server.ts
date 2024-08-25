import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

// databas connection
main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/auth");
    console.log("Database is connected!");
  } catch (error) {
    console.log("Error connecting to Database!", error);
  }
}

// app listening
app.listen(config.database_url, () => {
  console.log(`app listening on port ${config.database_url}`);
});
