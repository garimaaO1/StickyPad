const express = require("express");
const app = express();
const PORT = 8000;
require("./db");
require("dotenv").config();
const Note = require("./MODELS/Note");
const User = require("./MODELS/User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoints to serve the HTML
app.get("/", (req, res) => {
  res.sendFile("./pages/index.html", { root: __dirname });
});

app.get("/signup", (req, res) => {
  res.sendFile("./pages/signup.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  res.sendFile("./pages/login.html", { root: __dirname });
});

//Endpoints for API's
app.post("/getnotes", async (req, res) => {
  let notes = await Note.find({ email: req.body.email });
  res.status(200).json({ success: true, notes });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body);
  if (!user) {
    res.status(200).json({ success: false, message: "No user found!" });
  } else {
    res
      .status(200)
      .json({
        success: true,
        user: { email: user.email },
        message: "User found!",
      });
  }
});

app.post("/signup", async (req, res) => {
  let user = await User.create(req.body);
  res.status(200).json({ success: true, user: user });
});

app.post("/addnote", async (req, res) => {
//   const { userToken } = req.body;
  let note = await Note.create(req.body);
  res.status(200).json({ success: true, note });
});

// app.post("/deletenote", async (req, res) => {
// const { noteId } = req.body;
// try {
//     const deletedNote = await Note.findByIdAndRemove(noteId);

//     if (!deletedNote) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     res.status(200).json({ message: "Note deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting note:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
