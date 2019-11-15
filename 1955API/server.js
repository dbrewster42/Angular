const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const flash = require("express-flash");	
// const session = require('express-session');
// const validate = require('mongoose-validator')

// app.use ( flash());

// app.use(session({
//     	 secret: "quotes",
//    	 resave: false,
//    	 saveUninitialized: true,
//    	 cookie: { maxAge: 60000 }
//  	 }))
app.use(express.json());	
// app.use ( bodyParser.urlencoded ( { extended : true } ) );
app.use ( express.static ( __dirname + '/static' ) );
app.set ( 'views', __dirname + '/views' );
app.set ( 'view engine', 'ejs' );

mongoose.connect('mongodb://localhost/1955', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 6},       
}, {timestamps: true });
var User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    User.find()
        .then(data => {
        	res.json(data);
        })
        .catch(err => {
        	res.json(err)
        })
}) 

app.get('/new/:name', (req, res) => {
	// var user = new User(req.body);
	console.log ( req.params )
	User.create( {
		name : req.params.name
	} )
	.then ( data => {
		console.log ( 'successfully added' , data );
		res.json ( { message : 'Object added' , data : data } )
	} )
	.catch ( err => {
		console.log ( 'error' , err );
		res.json ( {message: 'Could not add' , error : err } );
	} )
})
app.get('/remove/:name', (req, res) => {
	User.findOneAndDelete({name: req.params.name})
	.then(res.redirect('/'))
	.catch(err => {
		res.json({message: 'Could not remove'})
	})
})   
app.get('/:name', (req, res) => {
	User.findOne({name: req.params.name})
	.then(data => res.json(data))
	.catch(err => res.json(err));
})      


app.listen(8000, () => console.log("listening on port 8000"));
