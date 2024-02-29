import express from 'express';

const app = express();

// Expose the frontend build
app.use('/', express.static('public/browser'));

app.get('/hello', (req, res) => {
    res.send('goodbye');
});

// Start the server
const port = process.env['PORT'] || 8156;
app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});
