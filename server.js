    // **** I apologize in advance for the half-assness of this lab.
    //    Wasn't feeling well and my heart just wasn't in it **** //




    

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   let query = req.query.q;
   let findTodo = todos.filter(function(e) {
    return e.task.includes(query);
   });
   res.json({todos: findTodo});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos: todos});
});

 //keeps a counter for IDs
let idPlus = 1;
app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   let id = idPlus;
   let newTodo = {_id:id, task:req.body.task, description:req.body.description};
   res.json(newTodo);
   todos.push(newTodo);
   idPlus++;
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   for (i=0; i < todos.length; i++) {
      if (todos[i]._id == req.params.id) {
        var oneTodo = todos[i];
        res.json(oneTodo);
      }
   }
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   let oneTodo = todos.filter(function(e) {
    return e._id == req.params.id;
   });

   var index = todos.indexOf(oneTodo[0]);
   
   todos[index].task = req.body.task;
   todos[index].description = req.body.description;
   res.json(oneTodo[0]);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   var id = req.params.id -1;
   var delTodo = todos[id];
   res.json(delTodo);
   todos.splice(delTodo, 1);
 
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
