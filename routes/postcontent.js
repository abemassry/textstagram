var pact = require('../pact.js');

exports.main = function(req, res){
  var userName = req.session.user;
  var now = new Date();
  pact.models.users.findOne({user_name: userName}, function(err, doc) {
    if(err) return handleError(err);
    if (doc) {
      var Post = pact.models.posts;
      var post = new Post();
      post.body = req.param('post-content');
      post.filter = req.param('filter');
      post.date = now;
      post.submitted_by = userName;
      post.save(function(err) {
        if(err) {throw err;}
        pact.models.posts.findOne({
            body: req.param('post-content'),
            filter: req.param('filter'),
            date: now,
            submitted_by: userName
          }, function(err, data) {
              if(err) return handleError(err);
              var postId = data._id;
              res.redirect('/p/'+postId);
            }
        );
      });
    }
  });

};
