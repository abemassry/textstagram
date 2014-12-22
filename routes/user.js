var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.user) {
    var username = req.sesssion.user;
  }
  pact.models.users.findOne({user_name: req.params.name}, function(err, data){
    if (data) {
      pact.models.posts.find({submitted_by: req.params.name }).limit(30).sort('-date').exec(function(err, posts){
        res.render('user', {  title: req.params.name,
                              user: username,
                              posts: posts
                            }
                  );
      });
    } else {
      res.redirect('/404');
    }
  });
};
