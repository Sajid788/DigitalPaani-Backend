const express = require("express");
const { connection, PORT } = require("./config/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running!"});
});


app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DataBase");
  } catch (error) {
    console.log(`${error} is giving while connecting`);
  }
  console.log(`Listening on PORT: ${PORT}`);
});
