const db = require('./db');
const { syncAndSeed, models: {Website}, data} = require('./db')
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(require('method-override')('_method'));

app.listen


const PORT = process.env.PORT || 1000

app.get('/', (req, res, next)=> res.redirect('/bookmarks'));

app.get('/bookmarks', async (req, res, next) => {
    try {
      const websites = await Website.findAll();

        const Mata = Object.entries(data.reduce((acc, curr) => {
            acc[curr.category] ? acc[curr.category]++ : acc[curr.category] = 1;
            return acc
          }, {}));
      res.send(`
        <html>
            <head>
            </head>
        <body>
            <h1> Bookmarks</h1>
            <form method = 'POST'>
            <input name='email' placeHolder='enter email' />
            <textarea name='bio'></textarea>
            <button>Create</button>
        </form>
        <ul>
            ${ Mata.map( ele => `
            <li>
    <a href='/bookmarks/${ele[0]}'>${ele[0]} (${ele[1]})</a>
     </li>
        `).join('')}
        </ul>
        <body>
      </html>`
      );
    }
    catch(ex){
        next(ex);
      }
    });
    

    app.get('/bookmarks/:category', async (req, res, next) => {

        // let response = await client.query('SELECT * From sandwich where id=$1;', [req.params.id]);
        // const sandwiches = response.rows[0];
        // response = await client.query('SELECT * From ingred where sandwich_id=$1;', [req.params.id]);
        // const ingreds = response.rows;

        try {
          const websites = await Website.findAll({
            where: {
            category: [req.params.category]
            }
            });
          res.send(`
          <html>
          <head>
          </head>
      <body>
          <a href='/bookmarks/'> <h1> Bookmarks</h1></a>
          <form method = 'POST'>
          <input name='email' placeHolder='enter email' />
          <textarea name='bio'></textarea>
          <button>Create</button>
      </form>
            <ul>
                ${ websites.map( website => `
                <li>
        ${website.name}
         </li>
    
            `).join('')}
            </ul>
            <body>
          </html>`
          );
        }
        catch(ex){
            next(ex);
          }
        });



const init = async () => {
    try {

      await db.syncAndSeed();
      console.log('connected to database');
      app.listen(PORT, () => {
        console.log(`App listening in port ${1000}`);
      });
    }
    catch(ex){
      console.log(ex);
    }
  };

init();