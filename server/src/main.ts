import express from 'express';

const app = express();

// Expose the frontend build
app.use('/', express.static('public/browser'));

// Start the server
const port = 8156;
app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});
