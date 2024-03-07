fetch(`http://localhost:${ process.env['BACKEND_PORT'] }/healthy`, { headers: { 'Content-Type': 'application/json' } })
    .then(() => {
        process.exit();
    })
    .catch(() => {
        process.exit(1);
    });
