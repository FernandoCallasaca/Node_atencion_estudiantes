//hokkis
const express = require('express') 
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var cors = require('cors');
var multer = require('multer');
const fs = require('fs');

const dbSeguridad = require('./dal/seguridad')
const dbGeneral = require('./dal/general')

const app = express()
const port = 3200

const ruta = '/archivos/proyectos';

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
    let proyecto = req.query.proyecto;
    let dir = __dirname.replace('\dal', '') + "/archivos/proyectos/" + proyecto + "/";
    //let c_nombre = 'DA-' + Date.now() + '.' + req.query.extension;
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

/* Seguridad */
app.post('/api/seguridad/login', dbSeguridad.login)
app.post('/api/seguridad/get', dbSeguridad.get)
app.post('/api/seguridad/getrole', dbSeguridad.getrole)
app.post('/api/seguridad/save', dbSeguridad.save)
app.post('/api/seguridad/resetearclave', dbSeguridad.resetearclave)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})