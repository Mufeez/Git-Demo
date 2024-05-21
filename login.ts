import express from 'express';

const app =express();

app.get('/', (req, res) => {
    console.log("Starting the app");
    res.send("Welcome to the login page!")
})

app.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log("Starting the app");
    res.json({message: `Welcome to the login page!  ${username}`})
})



app.listen(3000);