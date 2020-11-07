const cnx = require('../common/appsettings') // Hola Ara

const valida = require('../common/validatoken')
let pool = cnx.pool;

// Estudiantes

const getEstudiante = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from estudiante where borrado = 0 order by id_estudiante ',
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}
const deleteEstudiante = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_estudiante = request.body.id_estudiante;

        let cadena = `do $$
            begin        
                update estudiante set borrado = ${id_estudiante} where id_estudiante = ${id_estudiante};
            end
        $$`;
        console.log(cadena);
        pool.query(cadena,
            (error, results) => {
                if (error) {
                    console.log(error);
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}
const saveEstudiante = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_estudiante = request.body.id_estudiante;
        let nombres = request.body.nombres;
        let apellidos = request.body.apellidos;
        let dni = request.body.dni;
        let telefono = request.body.telefono;
        let correo = request.body.correo;

        let cadena = `do $$
        begin 
            if (${id_estudiante} != 0) then
                update estudiante set nombres = '${nombres}', apellidos = '${apellidos}', dni = '${dni}', telefono = '${telefono}',
                correo = '${correo}' where id_estudiante = ${id_estudiante};
            else
                insert into estudiante values (default, '${nombres}', '${apellidos}', '${dni}', '${telefono}', '${correo}', 0);
            end if;
        end
        $$`;

        console.log(cadena)
        pool.query(cadena,
            (error, results) => {
                if (error) {
                    console.log(error);
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}


module.exports = {
    getEstudiante,
    deleteEstudiante,
    saveEstudiante
}
