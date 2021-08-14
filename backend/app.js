var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.get('/getSite/:site', function (req, res) {
	console.log(req.params.site);
	res.send({ name: 'חיפה', ip: '127.0.0.1', projectNum: '12345', id: '14' })
});
app.post('/createSite', function (req, res) {
	console.log(req.body);
	res.end();
});
app.delete('/deleteSite', function (req, res) {

});
app.post('/updateSite', function (req, res) {

});

var server = app.listen(3000, function () {

})