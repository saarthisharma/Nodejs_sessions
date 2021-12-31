const express = require("express");
const cookieparser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const PORT = 3000;

// a variable to save session
var session ;

// creating cookie with an expiration time
const oneday = 1000*60*60*24;

// session middleware
app.use(sessions({
    secret : "qawsedrf", //used to authenticate a session
    saveUninitialized : true,
    cookie :{maxAge:oneday},
    resave:false 
}));

// parsing the incoming data from the html form
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// for serving the static files like images ,css and js file we use .static middleware function
app.use(express.static(__dirname)); 
// cookie parser middleware

app.use(cookieparser());

// authentication credentials for login
const username = "abc";
const password = "1234";


// making routes for the login html form
app.get('/' , (req , res)=>{
    Session = req.session;
    if(Session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html' , {root:__dirname});
});

// making routes for user login

app.post('/user',(req,res) => {
    if(req.body.username == "abc" && req.body.password == "1234"){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        console.log(req.session.id)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT , ()=>{
    console.log(`app listening at http://localhost:${PORT}`)
});
