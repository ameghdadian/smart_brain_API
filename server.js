const express = require('express');
const bodyParser = require('body-parser');
const bcrypt  = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register  = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
     connectionString : process.env.DATABASE_URL,
    ssl:true
  }
});

// db.select('*').from('users').then(data=>
// 	{
// 		console.log(data); 
// 	}); 

// db.select('*').from('users').then(data =>
// 	{console.log(data);});
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req , res) =>	{res.send('It is working!');});
app.post('/signin' ,signin.handleSignin(db,bcrypt));		
app.post('/register' , (req , res) => {register.handleRegister(req,res,db,bcrypt);});  
app.get('/profile/:id' , (req , res) =>{profile.handleProfileGet(req , res , db);});
app.put('/image' , (req , res) =>{image.handleImage(req,res,db);});
app.post('/imageurl' , (req , res) =>{image.handleApiCall(req,res);});


app.listen(process.env.PORT ||3000 , ()=>
	{
		console.log( `app is running on port ${process.env.PORT}`);
	}); 


/*	How are our API going to look like?

/--> res = this is working

/signin --> POST = success/fail      Since we are sending password, we don't wanna send it via GET to get trapped in the Man In the Middle attack
/register -->POST = return user object
/profile/: userId --> GET = user
/image --> PUT --> updated user object count



*/