const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const data = require("./data.json");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.post("/api/message", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({
      success: false,
      error: "Please do not leave the input field empty!!",
    });
  } else {
    const resMsg = data.filter((q) => {
      return q.question.match(req.body.message);
    });
    if (!resMsg.length) {
      res.json({ result: "Did not get what did you say ? Please try again" });
    }
    res.json({ result: resMsg[0] });
  }
});

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
  console.log(`Ready for Q & A`);
});
