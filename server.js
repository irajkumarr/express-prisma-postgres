const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//routes
const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
