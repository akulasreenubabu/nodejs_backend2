const express = require('express');
const dbConnection = require('./databaseConnection')
const app = express();
app.use(express.json())
//const dbConnection = dbConnection.connect2()
/*let users = [{ id: 1, name: 'mani teja', course: 'node' },
{ id: 2, name: 'venkat', course: 'react' },
{ id: 3, name: 'lavanya', course: 'data science' },
{ id: 4, name: 'siva', course: 'java' }];*/



// Define a route to get a user by ID
app.get('/user/:id', async(req, res) => {
  const client = await dbConnection.connect2()
  const id = req.params.id;
  const users = await client.query('select * from users')
  //const users = await client.query('select * from users where id=' + id)
  console.log('Users:', users)
  if (users && users.length != 0 && users[0].length != 0) {
    res.json({ message: 'User data successfully fetched', data: users[0] })
}
else {
    res.json({ message: 'User is not found' })
}
})

app.post('/user', async (req, res) => {
  try {
      console.log('request', JSON.stringify(req.body))
      const body = req.body;
      console.log('body', JSON.stringify(body))
      const client = await dbConnection.connect2()
      const query = "insert into users (id,name,course) values ?"
      const values = body.map((item)=>[item.id, item.name, item.course]) 
      console.log('Values:', JSON.stringify(values))
      const users = await client.query(query, values)
      console.log('Users:', JSON.stringify(users))
      let result = {
          message: "Successful", data: body, users
      }
      console.log('response', JSON.stringify(result))
      res.json(result)
  }
  catch {
    res.json({
        message: "Something went wrong! Contact Administrator",
    });
}
})

app.put('/user/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const updatedData = req.body;
      const client = await dbConnection.connect2()
      const query = "update users set name= ?, course = ?  where id = ?"
      const values = [updatedData.name, updatedData.course, id]
      const users = await client.query(query, values)
      console.log('Users:', JSON.stringify(users))
      if (users && users.length != 0 && users[0].affectedRows === 0) {
          return res.status(404).json({
              message: "User not found"
          });
      }
      res.json({
          message: "User successfully updated",
      });
  }
  catch {
      res.json({
          message: "Something went wrong! Contact Administrator",
      });
  }
});

  //console.log(id)
  //const id = req.params;
  //console.log('my name is' + JSON.stringify(id));
  //res.send('my name is ' + id);
 // const user = users.find((user) => {
   // return user.id === parseInt(id)
    //})
    //console.log('user', JSON.stringify(user))
    //res.json({ message: 'sucessfully fetchet user', data: user })
    //})
    //Define a route to create a new user
    //app.post('/user', (req, res) => {
     // const body = req.body;
      //console.log('body', body)
      //users = users.concat(req.body)
      //res.json({ message: 'successful', data: body, users })
    //})
    // implement put data
    /*app.put('/user/:id', (req, res) => {
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
      const deleted_id = parseInt(req.params.id);
      const userIndex = users.findIndex(user => user.id === deleted_id);
      const deletedUser = users.splice(userIndex, 1);
      res.json(deletedUser.length ?
        { message: 'User deleted successfully', data: users } :
        { message: 'User not found' }
      );
    })*/
    // Start the server
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })

