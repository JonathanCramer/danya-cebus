var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')
const mysql = require('mysql')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

var con = mysql.createConnection({
	// connectionLimit: 10,
	host: '192.168.64.2',
	user: "erez",
	password: "123456",
	database: 'danya'
	// port: 8080
});
con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get('/getSite/:site', function (req, res) {
	// "SELECT title FROM pages WHERE my_col LIKE %$param1% OR another_col LIKE %$param2%"
	con.query(`SELECT * FROM sites WHERE name LIKE '${req.params.site}%' OR projectNum LIKE '${req.params.site}%'`, function (err, result, fields) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		};
		console.log(result);
		res.send(result);
	});
});
app.post('/createSite', function (req, res) {
	req = req.body;
	let query = "INSERT INTO `sites`(`id`, `name`, `projectNum`, `ip`, `waze`, `lineNum`, `simNum`, `modemNum`, `bandwidth`) VALUES (NULL,'" + req.name + "','" + req.number + "','" + req.ip + "','" + req.waze + "','" + req.lineNum + "','" + req.simNum + "','" + req.modemType + "','" + req.bandwidth + "')"
	con.query(query, function (err, result) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})

});
app.delete('/deleteSite/:id', function (req, res) {
	con.query("DELETE FROM sites WHERE id = " + req.params.id, function (err, result) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
});
app.post('/updateSite', function (req, res) {

});

var server = app.listen(3000, function () {

})