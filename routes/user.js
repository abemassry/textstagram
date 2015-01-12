var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.session.user) {
    var username = req.session.user;
  }
  pact.models.users.findOne({user_name: req.params.name}, function(err, userModel){
    if (userModel) {
      pact.models.posts.find({submitted_by: req.params.name }).limit(30).sort('-date').exec(function(err, posts){
        res.render('user', {  title: req.params.name,
                              user: username,
                              followers: userModel.followers.length,
                              following: userModel.following.length,
                              posts: posts
                            }
                  );
      });
    } else {
      res.redirect('/404');
    }
  });
};
