const express = require('express');
const { createServer} = require('node:http')
const serverIo = require('./routes/serverIO.js')
const {connectDB} = require('./config/index.js');

const handlebars = require('express-handlebars');
const { viewsRouter } = require('./routes/views.route.js');
const appRouter     = require('./routes')

const port = 8080;
const app = express();
const server = createServer(app)
serverIo(server)

connectDB()

// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// motor de plantilla
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// definiendo vistas
app.use('/', viewsRouter);
app.use(appRouter)

// Confirmacion de inicio
server.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});

//INICIAR: npm run dev:npm