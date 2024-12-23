const mysql = require('mysql2');
require('dotenv').config();

const dbConnectionConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD, // Assuming the password is stored in .env file
    database: 'srisync',
    port: 3306
});

const connect = () => {
    dbConnection.connect((error) => {
        if (error) {
            console.log('Error:', error.stack);
            return;
        } else {
            console.log('Successfully connected to the database');
        }
    });
};
const connect3=()=>{
return dbConnection
}
const dbConnection2 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'srisync',
    port: 3306
})

const promiseDbConnection = dbConnection2.promise()
const connect2=async()=>{
    return await promiseDbConnection
}
//connect()

//Call the connect function to initiate the connection
module.exports={connect, connect2}
