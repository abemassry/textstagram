var pact = require('../pact.js');

exports.main = function(req, res){
  console.log('made it inside function');
  if (req.session.user) {
    console.log('made it inside function and if statement');
    var userName = req.session.user;
    var now = new Date();
    pact.models.users.findOne({user_name: userName}, function(err, userModel) {
      if(err) return handleError(err);
      if (userModel) {
        var unfollow_name = req.param('tounfollow');
        pact.models.users.findOne({user_name: unfollow_name}, function(err, unfollowModel){
          if (err) return handleError(err);
          userModel.following.remove({user_name: unfollow_name});
          userModel.save(function(err) {
            if(err) { throw err; }
            console.log('following removed');
          });
          unfollowModel.followers.remove({user_name: userName});
          unfollowModel.save(function(err) {
            if(err) { throw err; }
            console.log('follower removed');
            var count = 0;
            console.log('the count is :');
            console.log(unfollowModel.followers.length);
            res.end(unfollowModel.followers.length.toString());
          });
        });
      }
    });
  }

};
