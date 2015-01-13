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
        userModel.following.forEach(function(follower) {
          var followerId = follower.id;
          if (follower.user_name == userName) {
            userModel.following.id(followerId).remove();
            userModel.save(function(err) {
              if(err) {throw err;}
              console.log('following removed');
            });
          }
        });
        var unfollow_name = req.param('tounfollow');
        pact.models.users.findOne({user_name: unfollow_name}, function(err, unfollowModel){
          if (err) return handleError(err);
          unfollowModel.followers.forEach(function(follower) {
            var unfollowerId = unfollowModel.id;
            if (follower.user_name == unfollow_name) {
              console.log('unfollowerId');
              console.log(unfollowerId);
              console.log('follower.user_name');
              console.log(follower.user_name);
              

              unfollowModel.followers.id(unfollowerId).remove();
              unfollowModel.save(function(err) {
                if(err) { throw err; }
                console.log('follower removed');
                var count = 0;
                console.log('the count is :');
                console.log(unfollowModel.followers.length);
                res.end(unfollowModel.followers.length.toString());
              });
            }
          });
        });
      }
    });
  }

};
