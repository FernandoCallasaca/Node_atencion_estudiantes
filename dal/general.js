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
            ad.id_administrador,
            ad.nombres,
            ad.apellidos,
            ad.direccion,
            ad.rol,
            us.nombre usuario
            from administrador ad
            inner join usuario us on us.id_usuario = ad.id_usuario and us.borrado = 0
            and ad.borrado = 0 and ad.rol = 'Director(a)'
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
// Secretarias(os)

const getSecretaria = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query(`
        select
            ad.id_administrador,
            ad.nombres,
            ad.apellidos,
            ad.direccion,
            ad.rol,
            us.nombre usuario
            from administrador ad
            inner join usuario us on us.id_usuario = ad.id_usuario and us.borrado = 0
            and ad.borrado = 0 and ad.rol = 'Secretario(a)'
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
// Usuarios

const getUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from usuario order by id_usuario',
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
                insert into usuario values (default, '${nombre}', '${contrasenia}', 0);
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
        pool.query('select * from tipotramite where borrado = 0',
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
        let cadena = `select * from vw_tramites where (id_estudiante = $1 or 0 = $1) and (id_tipo = $2 or 0 = $2) order by id_tramite`;
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

const getEstadosTramite = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select distinct estado from vw_tramites',
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

const getVwEstadoTramites = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        // let cadena = 'select * from vw_tramites where (id_estudiante = $1 or 0 = $1) and (id_tipo = $2 or 0 = $2)';
        let cadena = `select * from vw_tramites where (id_estudiante = $1 or 0 = $1)  and (estado = $2 or ''= $2) and id_tipo = $3`;

        pool.query(cadena,
            [request.body.id_estudiante, request.body.estado, request.body.id_tipo],
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
// METODOS GENERALES PARA TRAER INFORMACIÓN Y GUARDAR INFORMACIÓN SIN NECESIDAD DEL TOKEN
const getUsuariosForRegister = (request, response) => {
    if (true) {
        pool.query('select * from usuario',
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    }
}
const saveUsuarioForRegister = (request, response) => {
    let nombre = request.body.nombre;
    let contrasenia = request.body.contrasenia;

    let cadena = `insert into usuario values (default, '${nombre}', '${contrasenia}', 0, 1);`;

    pool.query(cadena,
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows })
            }
        })
}
const saveEstudianteForRegister = (request, response) => {
    let id_usuario = request.body.id_usuario;
    let nombres = request.body.nombres;
    let apellidos = request.body.apellidos;
    let codigo = request.body.codigo;

    let cadena = `insert into estudiante values (default, ${id_usuario}, '${nombres}', '${apellidos}', '${codigo}', 0);`;

    pool.query(cadena,
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results.rows })
            }
        })
}

const saveTramite = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let id_estudiante = request.body.id_estudiante;
        let id_tipo = request.body.id_tipo;
        let fecha = request.body.fecha;
        let observacion = request.body.observacion;
        let cadena = `
            insert into tramite values(default, ${id_estudiante}, ${id_tipo}, 1, '${fecha}', 
            '${observacion}', 1, '${fecha}', 'Por revisar',0);
        `;
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

const saveDocumentoTramite = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let id_tramite = request.body.id_tramite;
        let archivo = request.body.archivo;
        let cadena = `
            insert into documento values(default, ${id_tramite}, '${archivo}', 0)
        `;
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

const getDocumentos = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from documento',
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

const get_tipo_tramite_estado = (request, response) => {
    var obj = valida.validaToken(request)
    let tipostramite = [];
    let resultados = [];
    let estadostramites = [];
    let estadostramites_resultado = [];
    let tramites = [];
    if (obj.estado) {
        pool.query(`
        select distinct
            tr.id_tipo,
            tr.id_estudiante,
            tp.nombre nombretipotramite
            from tramite tr
            inner join tipotramite tp on tp.id_tipotramite = tr.id_tipo and tp.borrado = 0
            where id_estudiante = $1`,
            [request.body.id_estudiante],
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    tipostramite = results.rows;
                    pool.query(`
                        select distinct
                        tr.id_estudiante,
                        tr.id_tipo,
                        et.id_estado_tramite,
                        et.nombre
                        from tramite tr
                        inner join estado_tramite et on et.id_estado_tramite = tr.id_estado_tramite and et.borrado = 0
                        where id_estudiante = $1`,
                        [request.body.id_estudiante],
                        (error, results) => {
                            if (error) {
                                response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                            } else {
                                estadostramites = results.rows;
                                pool.query(`select * from vw_tramites where id_estudiante = $1`,
                                    [request.body.id_estudiante],
                                    (error, results) => {
                                        if (error) {
                                            response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                                        } else {
                                            tramites = results.rows;
                                            tipostramite.forEach(tipo => {
                                                estadostramites_resultado = [];
                                                estadostramites.forEach(estado => {
                                                    estado.tramites = tramites.filter(o => o.id_estado_tramite == estado.id_estado_tramite && o.id_tipo == estado.id_tipo);
                                                    estadostramites_resultado.push(estado);
                                                });
                                                tipo.estadostramites = estadostramites_resultado.filter(o => o.id_tipo == tipo.id_tipo);
                                                resultados.push(tipo);
                                            });
                                            response.status(200).json({ estado: true, mensaje: "", data: resultados })
                                        }
                                    })
                            }
                        })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const getEstadoTramite = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from estado_tramite where borrado = 0',
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

const setEstadoObservacionAdminTramite = (request, response) => {
    var obj = valida.validaToken(request)
    let id_tramite = request.body.id_tramite;
    let id_estado_tramite = request.body.id_estado_tramite;
    let observacionadmin = request.body.observacionadmin;
    if (obj.estado) {
        pool.query(`update tramite set id_estado_tramite = ${id_estado_tramite}, 
            observacionadmin = ${observacionadmin} where id_tramite = ${id_tramite}`,
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
const saveConsulta = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let id_estudiante = request.body.id_estudiante;
        let asunto = request.body.asunto;
        let mensaje = request.body.mensaje;
        let cadena = `
            insert into consulta values(default, ${id_estudiante} , '${asunto}' , '${mensaje}',
            current_date,0);
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


const getControlEstamosTramite = (request, response) => {
    var obj = valida.validaToken(request)
    let tipostramite = [];
    let resultados = [];
    let estadostramites = [];
    let estadostramites_resultado = [];
    let tramites = [];
    if (obj.estado) {
        pool.query(`select id_tipotramite, nombre from tipotramite where borrado = 0`,
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    tipostramite = results.rows;
                    pool.query(`select id_estado_tramite, nombre from estado_tramite where borrado = 0`,
                        (error, results) => {
                            if (error) {
                                response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                            } else {
                                estadostramites = results.rows;
                                pool.query(`select * from vw_tramites`,
                                    (error, results) => {
                                        if (error) {
                                            response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                                        } else {
                                            tramites = results.rows;
                                            tipostramite.forEach(tipo => {
                                                estadostramites_resultado = [];
                                                estadostramites.forEach(estado => {
                                                    estado.tramites = tramites.filter(o => o.id_estado_tramite == estado.id_estado_tramite);
                                                    estadostramites_resultado.push(estado);
                                                });
                                                tipo.estadostramites = estadostramites_resultado.filter(o => o.id_tipo == tipo.id_tipo);
                                                resultados.push(tipo);
                                            });
                                            response.status(200).json({ estado: true, mensaje: "", data: resultados })
                                        }
                                    })
                            }
                        })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const getConsultas = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let id_estudiante = request.body.id_estudiante;
        pool.query(`
        select 
            con.id_consulta,
            es.id_estudiante,
            es.nombres,
            es.apellidos,
            es.codigo,
            con.asunto,
            con.mensaje,
            to_char(con.fecha, 'DD-Mon-YYYY') as fecha
            from consulta con
            inner join estudiante es on es.id_estudiante = con.id_estudiante and es.borrado = 0
            where (es.id_estudiante = ${id_estudiante} or 0 = ${id_estudiante})`,
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
const getTramitesInformativos = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from informacion_tramite',
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
    getInfoEstudianteUsuario,
    getEstadosTramite,
    getVwEstadoTramites,
    getUsuariosForRegister,
    saveUsuarioForRegister,
    saveEstudianteForRegister,
    saveTramite,
    saveDocumentoTramite,
    getDocumentos,
    get_tipo_tramite_estado,
    getEstadoTramite,
    setEstadoObservacionAdminTramite,
    saveConsulta,
    getControlEstamosTramite,
    getConsultas,
    getTramitesInformativos,
    getSecretaria
}
