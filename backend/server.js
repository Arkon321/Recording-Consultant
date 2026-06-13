const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const DATA_FILE = "./data/recordings.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/recordings", (req, res) => {
  res.json(readData());
});

app.post("/api/recordings", upload.single("file"), (req, res) => {
  const recordings = readData();

  const newRecording = {
  id: Date.now(),
  title: req.body.title,
  clientName: req.body.clientName,
  consultantName: req.body.consultantName,
  duration: req.body.duration,
  notes: req.body.notes,
  filePath: req.file.path,
  status: "Uploaded",
  createdAt: new Date()
};

  recordings.push(newRecording);

  writeData(recordings);

  res.status(201).json(newRecording);
});

app.delete("/api/recordings/:id", (req, res) => {
  const recordings = readData();

  const filtered = recordings.filter(
    recording => recording.id != req.params.id
  );

  writeData(filtered);

  res.json({
    message: "Recording deleted"
  });
});


app.put("/api/recordings/:id", (req, res) => {

  const recordings = readData();

  const recording = recordings.find(
    r => r.id == req.params.id
  );

  if (!recording) {
    return res.status(404).json({
      message: "Recording not found"
    });
  }

  recording.notes = req.body.notes;

  writeData(recordings);

  res.json(recording);
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.use(
  "/uploads",
  express.static("uploads")
);