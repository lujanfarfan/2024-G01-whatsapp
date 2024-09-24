const express = require('express');
const bodyParser = require('body-parser');
const MySQL = require('./modulos/mysql');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const LISTEN_PORT = 4000;
const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true
	}
});

const sessionMiddleware = session({
	secret: "ositos",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// Obtener contactos
app.get('/chats', (req, res) => {
	db.query('SELECT * FROM contacts', (err, results) => {
		if (err) return res.status(500).send(err);
		res.json(results);
	});
});

// Obtener mensajes
app.get('/chats', (req, res) => {
	const { chatId } = req.params;
	db.query('SELECT * FROM messages WHERE chat_id = ?', [chatId], (err, results) => {
		if (err) return res.status(500).send(err);
		res.json(results);
	});
});

// Enviar un nuevo mensaje
app.post('/chats', function (req, res) {
	const { chatId, sender, text } = req.body;
	try {
		db.query('INSERT INTO messages (chat_id, sender, text) VALUES (?, ?, ?)', [chatId, sender, text], function (err, results) {
			if (err) {
				return res.status(500).send(err);
			}
			res.status(201).json({ id: results.insertId, chatId, sender, text });
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

app.post('/', function (req, res) {
    const { phoneNumber } = req.body;
    try {
        db.query('SELECT phone_number FROM users WHERE phone_number = ?', [phoneNumber], function (err, results) {
            if (err) {
                return res.status(500).send(err);
            }
            const exists = results.length > 0; 
            res.json({ exists });
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.post('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.delete('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
	res.send(null);
});

io.on("connection", (socket) => {
	const req = socket.request;

	socket.on('joinRoom', data => {
		console.log("🚀 ~ io.on ~ req.session.room:", req.session.room)
		if (req.session.room != undefined && req.session.room.length > 0)
			socket.leave(req.session.room);
		req.session.room = data.room;
		socket.join(req.session.room);

		io.to(req.session.room).emit('chat-messages', { user: req.session.user, room: req.session.room });
	});

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});