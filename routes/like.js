var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.session.user) {
    var userName = req.session.user;
    var now = new Date();
    pact.models.users.findOne({user_name: userName}, function(err, doc) {
      if(err) return handleError(err);
      if (doc) {
        var post_id = req.param('post_id');
        pact.models.posts.findById(post_id, function(err, post){
          if (err) return handleError(err);
          post.likes.push({name: userName, date_liked: now});
          var doc = post.likes[0];
          console.log(doc);
          post.save(function(err) {
            if(err) { throw err; }
            console.log('liked');

            res.end(post.likes.length.toString());
          });
        });
      }
    });
  }

};
