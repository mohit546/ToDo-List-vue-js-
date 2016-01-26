var User = require('../models/user');

var config = require('../../config');

var jsonWebToken  = require('jsonwebtoken');

var secretKey = config.secretKey;


var createToken = function(user){

	var token = jsonWebToken.sign({
		id : user._id,
		userEmail : user.userEmail
	}, secretKey, {
		expireInMinute : 1500
	});

	return token;
};

module.exports = function(app, express){

	var api = express.Router();

	api.post('/signup',function(req, res){
		console.log(req.body);

		var user = new User({
			useremail : req.body.userEmail,
			password : req.body.password1
		});

		user.save(function(err){
			if(err){
				res.send(err);
				return;
			}

			res.json({message:'User has been created!'});
		});
	});

	api.get('/users',function(req,res){

		User.find({}, function(err,users){
			if(err){
				res.send(err);
				return;
			}

			res.json(users);
		});

	});

	api.post('/login',function(req,res){
		console.log(req.body.password);
		User.findOne({
			useremail : req.body.userEmail
		}).select('password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.send({message:'User doesnt exist'});
			}else if(user){

				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.send({message : 'Invalid Password'});
				}else{
					//create token
					var token = createToken(user);

					res.json({
						status : true,
						message : 'Successfully login',
						token : token,
						redirectUrl: '/home'
					});
				}
			}
		});
	});


	api.use(function(req, res, next){
		console.log("he there");

		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if(token){
			jsonWebToken.verify(token,secretKey,function(err, decoded){
				if(err){
					res.status(403).send({status:false,message:'Failed to authenticate user'});
				}else{

					req.decoded = decoded;
					next();
				}
			});
		}else{
			res.status(403).send({status:false, message:'No token provided'});
		}
	});

	api.get('/me',function(req, res){
		User.findOne({
			_id : req.decoded.id
		},function(err, doc){
			if(err){
				res.status(403).send({status: false, message: 'User is not Valid'});
			}else{
				res.json({
					status : true,
					userDetail: doc
				});
			}
		});
	});


	return api;

};
