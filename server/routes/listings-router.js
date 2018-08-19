//requires
const express = require('express');
const router = express.Router();
//pg
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'real-estate',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
}
const pool = new Pool(config);
pool.on('connect',()=>{
    console.log('Postgresql connected');
    
});
pool.on('error', (error)=>{
    console.log('Error connecting to SQL database', error);
    
});

module.exports = router;