const { Pool, Client } = require("pg");
//const Joi = require('@hapi/joi');

const { databaseUrl } = require("./config.js");

const connectionString = databaseUrl;
const pool = new Pool({
  connectionString,
})
// const client = new Client({
//   connectionString: connectionString,
// })

pool.query('SELECT * FROM public.fms_user', (err, res) => {
  // console.log(err, res)
  // pool.end()  <-error you are closing the connection thats why you can not use pool variable 
  if(err){
    pool.end()
    throw err
  }
})

module.exports = {
  pool,
};