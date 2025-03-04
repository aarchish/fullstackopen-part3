const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Enable body parsing for JSON requests
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Define a custom token for the request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Define a custom token for the response body
morgan.token('body', (res) => JSON.stringify(res.body));

// Use Morgan middleware with the custom token
app.use(morgan(':method :url :status - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    res.send(
        `
        <p>Phonebook has info for ${list.length} people</p>
        <p>${new Date()}</p>
        `
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = list.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    list = list.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    //console.log(body)
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }
    list = list.concat(person)
    res.json(person)
})