const express = require('express');
const multer = require('multer');
const fs = require("fs");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "files/");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("Arquivo recebido!");
});

app.get('/files', (req, res) => {
    fs.readdir("./files", (err, paths) => {
        if (err) {
            console.log(err);
            return;
        }

        return res.send(paths);
    });
})

app.listen(3003, () => console.log('Server is running on port 3003'));