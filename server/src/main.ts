import express from 'express';
import { writeFileSync } from 'node:fs';
import { format } from 'date-fns';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8157");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.post('/contact', (req, res) => {
    writeFileSync(
        `data/contact-entry-${format(new Date(), 'dd-MM-yyyy-hhmmss') }.json`,
        JSON.stringify(req.body, null, 4)
    );
    res.send({});
});

// Start the server
const port = 8158;
app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});

process.on("SIGTERM", () => {
    console.log("Ctrl-C was pressed");
    process.exit();
});
