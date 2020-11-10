const cnx = require('../common/appsettings') // Hola Leti

const valida = require('../common/validatoken')
let pool = cnx.pool;

// Estudiantes

const getEstudiante = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query(`
        select
            es.id_estudiante,
            es.nombres,
            es.apellidos,
            es.codigo,
            us.nombre usuario
            from estudiante es
            inner join usuario us on us.id_usuario = es.id_usuario and us.borrado = 0
            and es.borrado = 0
        `,
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
        let id_usuario = request.body.id_usuario;
        let nombres = request.body.nombres;
        let apellidos = request.body.apellidos;
        let codigo = request.body.codigo;

        let cadena = `do $$
        begin 
            if (${id_estudiante} != 0) then
                update estudiante set nombres = '${nombres}', apellidos = '${apellidos}', codigo = '${codigo}' where id_estudiante = ${id_estudiante};
            else
                insert into estudiante values (default, ${id_usuario}, '${nombres}', '${apellidos}', '${codigo}', 0);
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

// Administradores

const getAdministador = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query(`
        select
            ad.nombres,
            ad.apellidos,
            ad.direccion,
            ad.rol,
            us.nombre usuario
            from administrador ad
            inner join usuario us on us.id_usuario = ad.id_usuario and us.borrado = 0
            and ad.borrado = 0
        `,
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
const deleteAdministrador = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_administrador = request.body.id_administrador;

        let cadena = `do $$
            begin        
                update administrador set borrado = ${id_administrador} where id_administrador = ${id_administrador};
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
const saveAdministrador = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_administrador = request.body.id_administrador;
        let id_usuario = request.body.id_usuario;
        let nombres = request.body.nombres;
        let apellidos = request.body.apellidos;
        let direccion = request.body.direccion;
        let rol = request.body.rol;

        let cadena = `do $$
        begin 
            if (${id_administrador} != 0) then
                update estudiante set nombres = '${nombres}', apellidos = '${apellidos}', 
                direccion = ${direccion}, rol = ${rol} where id_administrador = ${id_administrador};
            else
                insert into administrador values (default, ${id_usuario}, '${nombres}', '${apellidos}', ${direccion}, now(), ${rol}', 0);
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
// Administradores

const getUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from usuario',
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
const deleteUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_usuario = request.body.id_usuario;

        let cadena = `do $$
            begin        
                update usuario set borrado = ${id_usuario} where id_usuario = ${id_usuario};
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
const saveUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_usuario = request.body.id_usuario;
        let nombre = request.body.nombre;
        let contrasenia = request.body.contrasenia;

        let cadena = `do $$
        begin 
            if (${id_usuario} != 0) then
                update usuario set nombre = '${nombre}', contrasenia = '${contrasenia}' where id_usuario = ${id_usuario};
            else
                insert into usuario values (default, ${nombre}, '${contrasenia}', 0);
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
// Trámites
const getTipoTramite = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from tipotramite',
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
const getVwTramites = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        // let cadena = 'select * from vw_tramites where (id_estudiante = $1 or 0 = $1) and (id_tipo = $2 or 0 = $2)';
        let cadena = `select * from vw_tramites where (id_estudiante = $1 or 0 = $1) and (id_tipo = $2 or 0 = $2)`;
        pool.query(cadena,
            [request.body.id_estudiante, request.body.id_tipo],
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

const getInfoEstudianteUsuario = (request, response) => {
    console.log(request);
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = `
        select
            es.id_estudiante,
            es.id_usuario,
            es.nombres,
            es.apellidos,
            es.codigo,
            us.nombre usuario
            from estudiante es
            inner join usuario us on us.id_usuario = es.id_usuario and us.borrado = 0
        `;
        console.log(cadena);
        pool.query(cadena,
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

module.exports = {
    getEstudiante,
    deleteEstudiante,
    saveEstudiante,
    getAdministador,
    deleteAdministrador,
    saveAdministrador,
    getUsuario,
    deleteUsuario,
    saveUsuario,
    getTipoTramite,
    getVwTramites,
    getInfoEstudianteUsuario
}
