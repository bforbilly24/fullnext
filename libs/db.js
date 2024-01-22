var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'nextjs',
      password: 'Nextjs123##',
      database : 'fullstacknextjs'
    }
  });

  export default knex;