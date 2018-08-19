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

router.get('/forsale', (req,res)=>{
    console.log('in GET route');
    const query = `SELECT * FROM "listings" WHERE "type" ILIKE 'sale' ;`;
    pool.query(query).then((results)=>{
        console.log('results');
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error getting results from database', error);
        res.sendStatus(500);
    }); 
})//end sale get

router.get('/forrent', (req, res) => {
    console.log('in GET route');
    const query = `SELECT * FROM "listings" WHERE "type" ILIKE 'rent' ;`;
    pool.query(query).then((results) => {
        console.log('results');
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting results from database', error);
        res.sendStatus(500);
    });
})//end rent get


module.exports = router;