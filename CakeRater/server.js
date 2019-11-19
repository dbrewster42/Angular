const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var session = require("express-session");
// var flash = require("express-flash");

app.use(express.json());
app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.urlencoded({useNewUrlParser: true}));

mongoose.connect('mongodb://localhost/cakes', {useNewUrlParser: true});

var RatingSchema = new mongoose.Schema({
    rating: {type: Number},
    comment: {type: String, default: ""},
}, {timestamps: true}
);

var CakeSchema = new mongoose.Schema ( {
	baker : { type : String , required : [ true, 'A baker is required' ] } ,
	image : { type : String , required : [true, 'SHOW ME THE CAKE'] } ,
	rating : [RatingSchema],
}, {timestamps : true} 
);

var Cake = mongoose.model('Cake', CakeSchema );
var Rating = mongoose.model('Rating', RatingSchema)

app.get('/cakes', (req, res) => {
	Cake.find()
	.then(data => {
		res.json({message : 'success' , data : data});
	})
	.catch(err => {
		res.json ({message : 'error' , error : err });
	})
})
app.post('/cakes', (req, res) => {
	Cake.create(req.body)
	.then(data => {
		console.log('create', data);
		res.json({message : 'success' , data : data});
	})
	.catch(err => {
		res.json({message : 'error' , error : err });
	})
})
app.get('/cakes/:id', (req, res) => {
	Cake.findById(req.params.id)
	.then (data => {		
		res.json({message : 'success' , data : data});
	})
	.catch (err => {		
		res.json ({message : 'error' , error : err});
	})
})
app.post('/cakes/:id/rating', (req, res) => {
	// console.log(req.params._id);
	console.log('2', req.params.id);
	// console.log('3', id);
	// console.log('4', _id);
	Rating.create(req.body)
	.then(data => {
		console.log("success")
		//res.json({message : 'success' , data : data});
		Cake.findById(req.params.id)
		.then(data2 => {
			console.log("success2")
			data2.rating.push(data);
			data2.save()
			//res.json({message : 'success' , data : data2});
			// Cake.findByIdAndUpdate(req.params.id, {$push: {rating : req.body}})
			.then (data3 => {
				console.log("suc3");	
				res.json({message : 'success' , data : data3});				
			})
			.catch (err3 => {		
				console.log("err3");
				res.json ({message : 'error' , error : err3});
				
			})			
		})
		.catch(err2 => {
			console.log("error2", err2)
			res.json ({message : 'error' , error : err2 });
		})
	})
	.catch(err => {
		console.log("error")
		res.json ({message : 'error' , error : err });
	})

	

})
const server = app.listen (8000 , () => {
	console.log ( 'server listening on port 8000' );
})