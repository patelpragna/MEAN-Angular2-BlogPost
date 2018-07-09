var express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');

var app = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

mongoose.connect('mongodb://localhost:27017/ang2App');

var db = mongoose.connection;
db.on('open', () => {
    console.log('Database connection established!');
});
db.on('error', () => {
    console.log('Error connecting to database!');
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

var User = mongoose.model('User', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

var Post = mongoose.model('Post', {
    postedBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [String],
    comment: [{
        text: String,
        commentBy: String
    }]
});

app.post('/reg', (req, res) => {
    console.log(req.body);
    var newUser = new User(req.body);

    newUser.save().then((doc) => {
        res.json({
            flg: true,
            msg: 'Registration successful!'
        });
    }).catch({
        flg: false,
        msg: 'Registration failed!'
    });
});

app.post('/login', (req, res) => {
    User.find({
        username: req.body.username
    }).then((doc) => {
        if (doc.length == 0) {
            res.json({
                flg: false,
                username: null,
                msg: 'No user found with this username'
            });
        } else {
            if (doc[0].password == req.body.password) {
                res.json({
                    flg: true,
                    username: doc[0].username,
                    msg: 'Login Successfull!'
                });
            } else {
                res.json({
                    flg: false,
                    username: null,
                    msg: 'Please check your password!'
                });
            }
        }
    }).catch((err) => {
        console.log("Error", err);
    });
});

app.post('/create', (req, res) => {
    var newPost = new Post(req.body);
    newPost.save().then((doc) => {
        res.json({
            flg: true,
            msg: 'Post published successfully!'
        });
    }).catch((err) => {
        console.log("Error", err);
    });
});

app.get('/getAllPosts', (req, res) => {
    Post.find().then((doc) => {
        res.json({
            flg: true,
            doc: doc
        });
    }).catch((err) => {
        console.log("Error", err);
    });
});

app.post('/addComment', (req, res) => {
    // console.log(req.body);
    Post.findOneAndUpdate({
        _id: req.body._id
    }, {
            $push: {
                comment: {
                    text: req.body.text,
                    commentBy: req.body.commentBy
                }
            }
        }).then((doc) => {
            Post.find({
                _id: req.body._id
            }).then((docs) => {
                res.json(docs);
            })
        }).catch((err) => {
            console.log("Error", err);
        });
});

app.post('/addLike',(req, res)=>{
let username = req.body.likedBy;
    Post.findOneAndUpdate({
        _id: req.body._id
    },{
        $push:{
            likes: username
        }
    }).then((doc)=>{
        res.json({
            flg:true
        });
    }).catch((err)=>{
        console.log("Error", err);
    });
});

app.post('/disLike',(req, res)=>{

    
let username = req.body.likedBy;
    
    Post.findOneAndUpdate({
        _id: req.body._id
    },{
        $pull:{
            likes: username
        }
    }).then((doc)=>{
        res.json({
            flg:true
        });
    }).catch((err)=>{
        console.log("Error", err);
    });
});
    app.listen(3200, () => {
        console.log('Server is running @ localhost:3200');
    });