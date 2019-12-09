const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/api/users', (req, res) => {
	User.find((err, user) => {
		if (err) {
			res.status(500).json(err);
		}
		else {
			res.status(200).send(user);
		}
	});
	}
);
app.get('/api/users/:id', (req, res) => {
	let userId = req.params.id;
	User.findById(userId, (err, user) => {
		if (err) {
			res.status(500).json(err);
		}
		else {
			res.status(200).send(user);
		}
	});
});
app.put('/api/users/:id', (req, res) => {
	let userId = req.params.id;
	User.findById(userId, (err, user) => {
		if (err) {
			res.status(500).json(err);
		}
		else {
			User.updateOne({_id:user._id},req.body,(err, res) => {
				if(err){
					res.status(500).json(err);
				}else{
				}
			});
			res.status(200).json({message:"good"});
		}
	});
});
app.post('/api/users', (req, res) => {
	let createPromise = User.create(req.body);
	createPromise.then(() => {res.status(200).json({message:"good"})});
});
app.delete('/api/users/:id', (req, res) => {
	let userId = req.params.id;
	User.findByIdAndDelete(userId, (err, user) => {
		if (err) {
			res.status(500).json(err);
		}
		else {
			res.status(200).json({message:"good"});
		}
	});
});
app.listen(8888, () => 
                    console.log('Listening on port 8888!')
                );

// connect
mongoose.connect('mongodb://CharlesDB:wch30624@cluster0-shard-00-00-5dkpv.mongodb.net:27017,cluster0-shard-00-01-5dkpv.mongodb.net:27017,cluster0-shard-00-02-5dkpv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
{
  useNewUrlParser: true
});
var Schema = mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;
var userSchema = new Schema({
    firstName: String,
    lastName: String,
		Age: Number,
		Sex: String,
		password: String
});
// get persistent class
const User = mongoose.model("user",userSchema,'Users');