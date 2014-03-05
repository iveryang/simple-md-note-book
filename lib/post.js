/**
 * Created by Yang_ruidong on 14-2-10.
 */
var fs = require('fs');
var marked = require('marked');
var async = require('async');

var logger;
var self;

function Post(app) {
    self = this;
    logger = app.get('logger');
    this.postPath = app.get('posts');
    self.buildPosts(function (err) {
        logger.info('init posts OK.....');
    });
}

//------------------- POST[五大属性] => name, title, date, tag, content
// {tagA: [postA, postB...]}
Post.prototype.tag2post = {};

Post.prototype.buildTag2post = function (name, post) {
    var tag = post.tag + '';
    if (self.tag2post.hasOwnProperty(tag)) {
        if (self.tag2post[tag]) {
            var postsHasOneTag = self.tag2post[tag];
        } else {
            var postsHasOneTag = [];
        }
        postsHasOneTag.push(post);
    } else {
        self.tag2post[tag] = [post];
    }
}

//-------------------
// {nameA: postA, nameB: postB, ...}
Post.prototype.name2post = {};

Post.prototype.buildName2post = function (name, post) {
    self.name2post[name] = post;
}

//-------------------
Post.prototype.buildPosts = function (cb) {
    var files = fs.readdirSync(self.postPath);
    async.forEach(
        files,
        function (file, callback) {
            self.getPost(file, function (err, post) {
                self.buildTag2post(file, post);
                self.buildName2post(file, post);
                callback(err);
            });
        },
        function (err) {
            logger.info('loading all files over .....');
            cb(err);
            if (err) {
                logger.error(err);
            }
        }
    );
}

Post.prototype.getPost = function (file, cb) {
    fs.readFile(self.postPath + '/' + file, 'utf8', function (err, data) {
        if (err) {
            cb(err);
            logger.error(err);
            return;
        }
        var index = data.indexOf('}');
        // get property of post
        var propertyStr = data.substr(0, index + 1);
        var post = JSON.parse(propertyStr);
        // get content of post
        var contentOfPost = data.substr(index + 1);
        post['content'] = marked(contentOfPost);
        post['name'] = file;

        cb(null, post);
    })
}

Post.prototype.test = function () {
    self.add('a', 'b', 'c', 'd', 'e');
    self.add('aa', 'bb', 'cc', 'dd', 'ee');
    self.add('aa', 'bb', 'cc', 'd', 'eeeee');
}

module.exports = Post;