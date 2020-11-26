//hokkis
const express = require('express') 
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var cors = require('cors');
// Para guardar archivos en un directorio del node, tenemos que instalar estas dependencias (multer, fs)
var multer = require('multer');
const fs = require('fs');
var path = require('path') // para descargar

const dbSeguridad = require('./dal/seguridad')
const dbGeneral = require('./dal/general')

const app = express()
const port = 3200

// Creamos una ruta
const ruta = '/archivos/documentos';

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

var customParser = bodyParser.json({
    type: function (req) {
        req.headers['content-type'] === '*/*; charset=UTF-8'
    }
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Creamos los siguientes metodos para subir el archivo
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, req.query.c_ruta);
    },
    filename: function (req, file, callback) {
        callback(null, req.query.c_nombre);
    }
});
var upload = multer({ storage: storage }).single('DA');

app.use('/static', express.static(__dirname + ruta));

app.post('/api/general/uploadfile', function (req, res) {
    let documento = req.query.documento;
    let dir = __dirname.replace('\dal', '') + "/archivos/documentos/" + documento + "/";
    let c_nombre =   req.query.extension;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0744);
    }
    req.query.c_ruta = dir;
    req.query.c_nombre = c_nombre;
    dir = dir + '' + c_nombre;
    upload(req, res, function (err) {

        if (err) {
            res.status(200).json({ estado: false, mensaje: "No se pudo cargar el archivo: " + err.stack, data: null })
        } else {

        res.status(200).json({ estado: true, mensaje: "Archivo cargado", c_ruta: c_nombre })
        }
    });
})

app.get("/api/general/download", (req, res) => {
    let rutaarchivo = __dirname + ruta + '/' + req.query.nombre;
    // console.log(rutaarchivo);
    const file = path.resolve('', rutaarchivo);
    res.download(file);
})

/* General */
app.post('/api/general/getestudiante', dbGeneral.getEstudiante)
app.post('/api/general/deleteestudiante', dbGeneral.deleteEstudiante)
app.post('/api/general/saveestudiante', dbGeneral.saveEstudiante)
app.post('/api/general/getadministrador', dbGeneral.getAdministador)
app.post('/api/general/deleteadministrador', dbGeneral.deleteAdministrador)
app.post('/api/general/saveadministrador', dbGeneral.saveAdministrador)
app.post('/api/general/getusuario', dbGeneral.getUsuario)
app.post('/api/general/deleteusuario', dbGeneral.deleteUsuario)
app.post('/api/general/saveusuario', dbGeneral.saveUsuario)
app.post('/api/general/gettipotramite', dbGeneral.getTipoTramite)
app.post('/api/general/getvwtramites', dbGeneral.getVwTramites)
app.post('/api/general/getinfoestudianteusuario', dbGeneral.getInfoEstudianteUsuario)
app.post('/api/general/getestadostramite',dbGeneral.getEstadosTramite)
app.post('/api/general/getvwestadotramites',dbGeneral.getVwEstadoTramites)
app.post('/api/general/getusuarioforregister',dbGeneral.getUsuariosForRegister)
app.post('/api/general/saveusuarioforregister',dbGeneral.saveUsuarioForRegister)
app.post('/api/general/saveestudianteforregister',dbGeneral.saveEstudianteForRegister)
app.post('/api/general/savetramite',dbGeneral.saveTramite)
app.post('/api/general/savedocumentotramite',dbGeneral.saveDocumentoTramite)
app.post('/api/general/getdocumentos',dbGeneral.getDocumentos)
app.post('/api/general/getipotramiteestado',dbGeneral.get_tipo_tramite_estado)
app.post('/api/general/getestadotramite',dbGeneral.getEstadoTramite)
app.post('/api/general/setestadoobservacionadmintramite',dbGeneral.setEstadoObservacionAdminTramite)
app.post('/api/general/saveconsulta',dbGeneral.saveConsulta)
app.post('/api/general/getcontrolestamostramite',dbGeneral.getControlEstamosTramite)

/* Seguridad */
app.post('/api/seguridad/login', dbSeguridad.login)
app.post('/api/seguridad/actualizarUsuario', dbSeguridad.actualizarUsuario)
app.post('/api/seguridad/get', dbSeguridad.get)
app.post('/api/seguridad/getrole', dbSeguridad.getrole)
app.post('/api/seguridad/save', dbSeguridad.save)
app.post('/api/seguridad/actualizarUsuario', dbSeguridad.actualizarUsuario)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})