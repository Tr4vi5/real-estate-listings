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

router.post('/', (req,res)=>{
    console.log('in POST route', req.body);
    let listing = req.body;
    const query = `INSERT INTO "listings" 
    ("cost", "sqft", "type", "city", "image_path")
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(query,[listing.cost, listing.sqft, listing.type, listing.city, listing.image_path]).then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error in router POST', error);
        res.sendStatus(500);
    })
}) // end listings post

router.delete('/delete/:id', (req,res)=>{
    console.log(req.params.id);
    const idToDelete = req.params.id;
    const query = `DELETE FROM "listings" WHERE "id" = $1;`;
    pool.query(query, [idToDelete]).then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error in router DELETE', error);
        
        res.sendStatus(500);
    })
})// end delete query

module.exports = router;