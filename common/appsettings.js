const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atencion_estudiantes',
  password: 'angelofteentop',
  port: 5432,
})

module.exports={
    pool
}