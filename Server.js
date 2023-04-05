const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql2')
const apiRouter = express.Router()
const path = require('path')
const viewsDir = path.join(__dirname, 'views')
const cors = require('cors')

app.use(cors())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', apiRouter)

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'Login',
	port: 3308,
})

connection.connect(error => {
	if (error) {
		console.error(error)
	} else {
		console.log('Successfully connected to the database.')
	}
})

apiRouter.post('/register', (req, res) => {
	const { name, email, password } = req.body
	const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
	connection.query(query, [name, email, password], (error, result) => {
		if (error) {
			console.error(error)
			res.send('An error occurred')
		} else {
			setTimeout(() => {
				res.redirect('http://localhost:81/login.html')
			}, 3000)
		}
	})
})

apiRouter.post('/login', (req, res) => {
	const { email, password } = req.body

	const query = `SELECT * FROM users WHERE email = (?) AND password = (?)`
	connection.query(query, [email, password], (error, result) => {
		if (error) {
			console.error(error)
			res.send('An error occurred')
		}
		if (result.length === 0) {
			setTimeout(() => {
				res.send(
					'<script>alert("Nie udało się zalogować"); window.location.href = "http://localhost:81/login.html"</script>'
				)
				// res.redirect('http://localhost:81/login.html');
			}, 3000)
			return
		} else {
			setTimeout(() => {
				const updateQuery = `UPDATE users SET active = true WHERE email = (?)`
				connection.query(updateQuery, [email])
				global.email_loggedin = email
				console.log(global.email_loggedin)
				res.redirect('http://localhost:81/index_logged_in.html')
			}, 3000)
		}
	})
})

apiRouter.post('/log-out', cors(), (req, res) => {
	const sql = 'UPDATE users SET active = false WHERE email = (?)'
	connection.query(sql, [global.email_loggedin], (err, result) => {
		if (err) throw err
		console.log('User logged out successfully')
	})
	res.redirect('/')
})

apiRouter.post('/contact', cors(), (req, res) => {
	const name = req.body.name
	const email = req.body.email
	const message = req.body.message
	const sql = 'INSERT IGNORE INTO contact (messagetext, email, name) VALUES (?, ?, ?)'
	connection.query(sql, [message, email, name], (err, result) => {
		if (err) throw err
		console.log('Contact data saved to database')
	})
	res.send('<script>alert("Wysłano wiadomość"); window.location.href = "http://localhost:81/contact.html"</script>')
})

app.listen(3000, () => {
	console.log('Node.js server is listening on port 3000')
})
