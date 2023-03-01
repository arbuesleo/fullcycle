const express = require('express');
const mysql = require('mysql');
const app = express();

const port = 8080;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle_db'
}

const populateDatabase = () => {  

  const connection = mysql.createConnection(config);

  try{

    [
      'Leonardo Jorge', 
      'Wesley Willians'
    ].forEach(name => connection.query(`insert into people (name) values ('${name}')`));

  }finally{
    connection.end();
  }

}

populateDatabase();

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);

  try{

    connection.query('SELECT * FROM people', function (error, results, fields) {
      if (error) throw error;
      let response = "<h1>Full Cycle Rocks!</h1><ul>";
      results.forEach(result => response += `<li>${result.name}</li>`)
      response += "</ul>";
      res.send(response);
    });    

  }finally{
    connection.end();
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});