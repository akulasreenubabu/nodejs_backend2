const express = require('express');
const app = express();
app.use(express.json())
let users = [{ id: 1, name: 'mani teja', course: 'node' },
{ id: 2, name: 'venkat', course: 'react' },
{ id: 3, name: 'lavanya', course: 'data science' },
{ id: 4, name: 'siva', course: 'java' }];
// Define a route to get a user by ID
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  //const id = req.params;
  //console.log('my name is' + JSON.stringify(id));
  //res.send('my name is ' + id);
  const user = users.find((user) => {
    return user.id === parseInt(id)
  })
  console.log('user', JSON.stringify(user))
  res.json({ message: 'sucessfully fetchet user', data: user })
})
// Define a route to create a new user
app.post('/user', (req, res) => {
  const body = req.body;
  console.log('body', body)
  users = users.concat(req.body)
  res.json({ message: 'successful', data: body, users })
})
// implement put data
app.put('/user/:id', (req, res) => {
  const updated_id = parseInt(req.params.id);  // Get id from URL
  const updatedData = req.body;  // Get updated data from request body

  const userIndex = users.findIndex(user => user.id === updated_id);
  users[userIndex].name = updatedData.name
  users[userIndex].course = updatedData.course
  res.json({
    message: 'successful', users
  })
})
app.delete('/user/:id', (req, res) => {
  const deleted_id=parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === deleted_id);
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser.length ?
    { message: 'User deleted successfully', data: users } :
    { message: 'User not found' }
  );
})
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

