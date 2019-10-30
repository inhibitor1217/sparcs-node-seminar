const express = require('express')
const bodyParser = require('body-parser')
const app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

let todos = [];
let last_id = 0;

app.post('/todos', function(req, res) {
    const todo = { id: last_id, content: req.body.content };
    todos.push(todo);
    last_id++;
    res.status(200);
    res.send(todo);
});

app.get('/todos', function(req, res) {
    res.status(200);
    res.send(todos);
});

app.put('/todos/:id', function(req, res) {
    todos.forEach(todo => {
        if (todo.id.toString() === req.params.id) {
            todo.content = req.body.content;
            res.status(200);
            res.end();
        }
    });
});

app.delete('/todos/:id', function(req, res) {
    todos = todos.filter(todo => todo.id.toString() !== req.params.id)
    res.status(200);
    res.end();
});
 
app.listen(3000)