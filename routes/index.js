/**
 * Created by Yang_ruidong on 14-2-10.
 */
var Post = require('./../lib/post');
var post;

var logger;

module.exports = function (app) {

    logger = app.get('logger');
    post = new Post(app);

    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Welcome  ：）',
            tag2post: post.tag2post
        });
    });

    app.get('/post/:id', function (req, res) {
        var result = post.name2post[req.params.id];
        res.render('post', {
            content: result.content,
            title: result.title,
            date: result.date
        });
    });

    app.get('/postSync/:id', function (req, res) {
        post.getPost(req.params.id, function (err, post) {
            res.render('post', {
                content: post.content,
                title: post.title,
                date: post.date
            });
        });
    });

    app.get('/tags', function (req, res) {
//        var result = post.tag2post[]
    });

    app.get('/tag/:tag', function (req, res) {
//        var result = post.tag2post[req.params.tag];
    });

    app.get('/reload', function (req, res) {
        post.tag2post = {};
        post.name2post = {};
        post.buildPosts(function (err) {
            res.redirect('/');
        });
    });
}