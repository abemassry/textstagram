var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.session.user) {
    var userName = req.session.user;
    var now = new Date();
    pact.models.users.findOne({user_name: tounfollow}, function(err, doc) {
      if(err) return handleError(err);
      if (doc) {
        var post_id = req.param('post_id');
        pact.models.posts.findById(post_id, function(err, post){
          if (err) return handleError(err);
          post.comments.push({user: userName, body: req.param('comment'), date_commented: now});
          var doc = post.comments[0];
          console.log(doc);
          post.save(function(err) {
            if(err) { throw err; }
            console.log('saved');
            res.redirect('/p/'+post_id);
          });
        });
      }
    });
  }

};
