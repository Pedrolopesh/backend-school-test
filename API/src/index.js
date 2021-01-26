const express = require('express');
const routes = require('./routes/index.js');

const cors = require('cors');
const port = process.env.PORT || 3333;
const app = express();

// const connectionDB = require('./database/index')

const bodyparser = require('body-parser');
const server = require('http').createServer(app);

// const fileUpload = require('express-fileupload');
// const cloudinary = require('cloudinary');
// const io = require('socket.io')(server)


// connectionDB()
app.use(bodyparser.json());

//Upload Files
// app.use(fileUpload({
//     useTempFiles: true
// }));

// cloudinary.config({
//     cloud_name:keys.cloudinary_name,
//     api_key: keys.cloudinary_API_Key,
//     api_secret: keys.cloudinary_API_Secret
// })

// io.on('connection', socket => { 
//     console.log(`Socket conectado: ${socket.id}`)

//     let message = []
//     socket.on('sendMessage', data => {
//         message.push(data)
//         socket.broadcast.emit('messageRecived', data)
//         console.log(data)
//     })
// })

app.use(cors());

server.listen(port, () => {
    console.log('Server started at http://localhost:' + port +'/api/')
});

app.use('/api', routes);

module.exports = app;