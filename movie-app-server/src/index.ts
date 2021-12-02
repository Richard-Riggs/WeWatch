//======================= MODULES =======================
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import vote from './routes/vote';
import { Server, Socket } from "socket.io";
import { createServer } from 'http';


//===================== SERVER SETUP ====================
const app = express();
const http = createServer(app);
app.use(express.static('./build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===================== ROUTES ===========================
app.use('/api/movies', require('./routes/movies'));
app.get('/*', (req: any, res: any) => res.sendFile('client/index.html', { root: '.' }));

// ================== VOTING SESSIONS ====================
const io = new Server(http);

const voteSockets = vote.sockets(io);
app.use('/api/vote', vote.router);

//===================== START SERVER ====================
const port = process.env.PORT || 8080;
http.listen(port, () => console.log(`WeWatch server listening on port ${port} `));
