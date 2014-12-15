var pact = require('../pact.js');

exports.main = function(req, res){
  var userName = req.session.user;
  var now = new Date();
  pact.models.users.findOne({user_name: userName}, function(err, doc) {
    if(err) return handleError(err);
    if (doc) {
      var Post = pact.modles.posts;
      var post = new Post();
      post.
      post.save(function(err) {
        if(err) {throw err;}
        res.redirect('/');
      });
    }
  });

};
