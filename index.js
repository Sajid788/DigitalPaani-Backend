const express = require("express");
const { connection, PORT } = require("./config/db");

const { userRouter } = require("./routes/user_routes");
const { bookRouter} = require("./routes/book_routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running!"});
});


app.use("/user", userRouter);
app.use("/book", bookRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DataBase");
  } catch (error) {
    console.log(`${error} is giving while connecting`);
  }
  console.log(`Listening on PORT: ${PORT}`);
});
