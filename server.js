const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.static(__dirname + "/public/dist/public"));
// app.use ( express.static ( __dirname + '/static' ) );
app.set ( 'views', __dirname + '/views' );
// app.set ( 'view engine', 'ejs' );

mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser: true});

var TaskSchema = new mongoose.Schema ( {
	title : { type : String , required : [ true, 'A title is required' ] } ,
	description : { type : String , default : '' } ,
	completed : { type : Boolean , default : false } ,
}, {timestamps : true} 
);
var Task = mongoose.model('Task', TaskSchema );
// app.use ( express.static ( __dirname + '/public/dist/public' ) );
// require ( './routes' ) ( app );
app.get('/tasks', (req, res) => {
	Task.find ()
	.then (data => {
		console.log ( 'displaying all data:' , data );
		res.json( { message : 'success' , data : data} );
	})
	.catch (err => {
		console.log ( 'error:' , err );
		res.json ( { message : 'error' , error : err } );
	})
})
app.get('/tasks/:id', (req, res) => {
	Task.findById(req.params.id)
	.then (data => {
		console.log ( 'displaying all data:' , data );
		res.json( { message : 'success' , data : data} );
	})
	.catch (err => {
		console.log ( 'error:' , err );
		res.json ( { message : 'error' , error : err } );
	})
})
app.post('/tasks', (req, res) => {
	Task.create(req.body)
	.then(data => {
		console.log ( 'displaying all data:' , data );
		res.json( { message : 'success' , data : data} );
	})
	.catch (err => {
		console.log ( 'error:' , err );
		res.json ( { message : 'error' , error : err } );
	})
})
app.put('/tasks/:id', (req, res) => {
	Task.findByIdAndUpdate(req.params.id, {
		title : req.body.title,
		description : req.body.description		
	})
	.then (data => {
		console.log ( 'displaying all data:' , data );
		res.json( { message : 'success' , data : data} );
	})
	.catch (err => {
		console.log ( 'error:' , err );
		res.json ( { message : 'error' , error : err } );
	})
	
})
app.delete('/tasks/:id' , (req, res) => {
	Task.findByIdAndDelete(req.params.id)
	.then (data => {
		console.log ( 'displaying all data:' , data );
		res.json( { message : 'success' , data : data} );
	})
	.catch (err => {
		console.log ( 'error:' , err );
		res.json ( { message : 'error' , error : err } );
	})
})

const server = app.listen (8000 , () => {
	console.log ( 'server listening on port 8000' );
})