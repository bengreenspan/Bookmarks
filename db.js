const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const pg = require('pg');
const client = new pg.Client('postgres://localhost/bookmarksdb');

 
const data = [
    {
      name: 'LinkedIn',
      URL: 'http://www.linkedin.com',
      category: 'jobs'
    },
    {
      name: 'Indeed',
      URL: 'http://www.indeed.com',
      category: 'jobs'
    },
    {
      name: 'Amazon',
      URL: 'http://www.amazon.com',
      category: 'shopping'
    },
    {
      name: 'W3C Shools - Javascript',
      URL: 'https://www.w3schools.com/jsref/default.asp',
      category: 'coding'
    },
    {
      name: 'Target',
      URL: 'http://www.shopping.com',
      category: 'shopping'
    },
    {
      name: 'The Weeknd',
      URL: 'https://www.theweeknd.com/',
      category: 'music'
    },
    {
      name: 'Stack Overflow',
      URL: 'https://stackoverflow.com/',
      category: 'coding'
    },
  ];

const { string } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bookmarksdb');

const Website = conn.define('site', {
    name:{
        type: STRING,
        allowNull:false,
        unique: true
    },
    URL:{
        type: STRING,
        allowNull:false,
        unique: true
    },
    category:{
        type: STRING,
        allowNull:false,
        unique: false
    }
})


const syncAndSeed = async() => {
   await conn.sync({ force: true});
    await Promise.all(
        data.map( ele => Website.create({
            name:ele.name, 
            URL:ele.URL,
            category: ele.category
        }))
    )
 
};


const SQL = `

DROP TABLE IF EXISTS website;

CREATE TABLE website (
name VARCHAR(100) NOT NULL,
url VARCHAR(100) NOT NULL,
category VARCHAR(100) NOT NULL
);

INSERT INTO website(name, URL, category)VALUES('Linkedin', 'http://www.linkedin.com', jobs);
INSERT INTO website(name, URL, category)VALUES('Indeed', 'http://www.indeed.com', jobs);
INSERT INTO website(name, URL, category)VALUES('Amazon', 'http://www.amazon.com', shopping);
INSERT INTO website(name, URL, category)VALUES('W3C Shools - Javascript', 'http://www.w3schools.com/jsref/default.asp', coding);
INSERT INTO website(name, URL, category)VALUES('Target', 'http://www.shopping.com', shopping);
INSERT INTO website(name, URL, category)VALUES('The Weeknd', 'http://www.theweeknd.com', music);
INSERT INTO website(name, URL, category)VALUES('Stack Overflow', 'http://stackoverflow.com', coding);
`;



module.exports = {
    conn,
    syncAndSeed,
    models: {
        Website
    },
    data
};

