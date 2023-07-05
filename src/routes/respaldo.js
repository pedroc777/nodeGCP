//const express = require('express');
//const express = require('express');
import express from 'express';
import multer from 'multer';
import jsdom from "jsdom";
import {postTwitter} from './post.js';
//const app = express();

const app = express();
const upload = multer({ dest: 'imagenes/' });
//var bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('C:/Users/hunte/OneDrive/Desktop/Poster/poster.html');
  //res.sendFile(__dirname + '/formulario.html');
});

app.post('/procesar-texto', upload.single('imagen'), (req, res) => { 
  const texto = req.body.texto;
  const imagen = req.file;
  console.log(texto);
  console.log(imagen);
  //console.log(req.file); 
  postTwitter(texto, imagen);
  
  res.sendFile('C:/Users/hunte/OneDrive/Desktop/Poster/poster.html'); 
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});



/------------------------------------------------------------------------------------------------------------------/
index
import express from 'express';
import multer from 'multer';
import http from 'http';
import {Server} from 'socket.io';
import {method} from './second.js';
//const app = express();

const app = express();
const servidor = http.createServer(app);
const io = new Server(servidor);
const upload = multer({ dest: 'imagenes/' });

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  
  res.sendFile(__dirname + '/file.html');
});

io.on('connection',(socket) => {
  console.log('Cliente conectado');

  socket.on('evento_personalizado',(mensaje) => {
    socket.emit('notificacion',mensaje);
  });
});

app.post('/procesar-texto', upload.single('imagen'), (req, res) => { 
  const info = req.body.texto;
  method(info);
  
  res.sendFile(__dirname + '/file.html'); 
});



servidor.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});


second.js

import io from 'socket.io-client';
export const method = async (info) => {
    const socket = io();

    if (condition) {
        socket.emit('evento_personalizado','Sí se pudo');
    }

};

