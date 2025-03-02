const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Enable body parsing for JSON requests
app.use(express.json());

// Define a custom token for the request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Use Morgan middleware with the custom token
app.use(morgan(':method :url :status - :response-time ms :body'));

let list =
    [
        { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
    ]

app.get('/api/persons', (req, res) => {
    res.json(list)
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