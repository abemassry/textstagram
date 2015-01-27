var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.session.user) {
    pact.models.users.findOne({user_name: req.session.user}, function(err, userModel){
      if(userModel) {
        pact.models.posts.find({submitted_by: req.session.user }).limit(30).sort('-date').exec(function(err, posts){
          res.render('profile', { title: 'Profile',
                                user: req.session.user,
                                followers: userModel.followers.length,
                                following: userModel.following.length,
                                posts: posts
                              });
        });
      } else {
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/login');
  }
};
