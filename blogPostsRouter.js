const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(["Tale of Two Cities", "Mattresses", "Lam Tran", "12/12/2018"]);
BlogPosts.create(["Lion King", "Animals", "Mufasa", "12/13/2018"]);
BlogPosts.create(["Toy Story", "Kids", "Woody", "12/14/2018"]);

router.get('/', function(req, res) {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, function(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const publishDate = req.body.publishDate;

    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requiredFields.length; i++) {
        if(!(requiredFields[i] in req.body)) {
            const message = `Missing item in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    const post = BlogPosts.create(title, content, author, publishDate);
    res.status(201).json(post);
});

router.delete('/:id', function(req, res) {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blogpost \`${req.params.id}\``);
    res.status(204).end();
});

router.put('/:id', jsonParser, function(req, res) {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requiredFields.length; i++) {
        if(!(requiredFields[i] in req.body)) {
            const message = `Missing item in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    if(req.params.id !== req.body.id) {
        console.log("ID does not match");
        res.status(400).send("ID does not match");
    }

    BlogPosts.update({
        id: req.params.id,
        "title": req.body.title, 
        "content": req.body.content,
        "author": req.body.author,
        "publishDate": req.body.publishDate
    });
    res.status(204).end();
});

module.exports = router;

