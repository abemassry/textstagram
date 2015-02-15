var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.session.user) {
    var userName = req.session.user;
    var now = new Date();
    pact.models.users.findOne({user_name: userName}, function(err, userModel) {
      if(err) return handleError(err);
      if (userModel) {
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
            var count = 0;
            console.log('the count is :');
            console.log(followModel.followers.length);
            res.end(followModel.followers.length.toString());
          });
        });
      }
    });
  }

};
