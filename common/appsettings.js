const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atencion_estudiantes',
  password: '123', //'angelofteentop'
  port: 5432,
})

module.exports={
    pool
}