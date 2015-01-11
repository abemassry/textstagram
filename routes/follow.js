var pact = require('../pact.js');

exports.main = function(req, res){
  console.log('made it inside function');
  if (req.session.user) {
    console.log('made it inside function and if statement');
    var userName = req.session.user;
    var now = new Date();
    pact.models.users.findOne({user_name: userName}, function(err, userModel) {
      if(err) return handleError(err);
      if (doc) {
        var follow_name = req.param('tofollow');
        pact.models.users.findOne({user_name: follow_name}, function(err, followModel){
          if (err) return handleError(err);
          userModel.following.push({user_name: follow_name, timestamp: now});
          userModel.save(function(err) {
            if(err) { throw err; }
            console.log('userModel saved');
          });
          followModel.followers.push({user_name: userName, timestamp: now});
          followModel.save(function(err) {
            if(err) { throw err; }
            console.log('followModel saved');
            followModel.followers.count(function(err, c) {
              console.log('the count is c');
              res.send(c);
            });
          });
        });
      }
    });
  }

};
