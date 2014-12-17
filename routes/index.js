var pact = require('../pact.js');

exports.main = function(req, res){
  pact.models.posts.find({}).limit(10).sort('-date').exec(function(err, data){
    if(err) { throw err; }
    res.render('index', { 
      title: 'Welcome',
      user: req.session.user,
      posts: data
    });
  });
};
