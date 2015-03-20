var pact = require('../pact.js');

exports.main = function(req, res){
  pact.models.posts.findById(req.params.id, function(err, data){
    if(data) {
      res.render('post', {  title: 'Post by '+data.submitted_by,
                  user: req.session.user,
                  post: data
                }
      );
    }
  });
};
