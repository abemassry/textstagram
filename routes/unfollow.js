var pact = require('../pact.js');

exports.main = function(req, res){
  console.log('made it inside unfollow function');
  if (req.session.user) {
    var unfollow_name = req.param('tounfollow');
    console.log('made it inside unfollow function and if statement');
    var userName = req.session.user;
    var now = new Date();
    pact.models.users.findOne({user_name: userName}, function(err, userModel) {
      console.log('found one');
      if(err) return handleError(err);
      if (userModel) {
        console.log('got a user model');
        userModel.following.forEach(function(follower) {
          if (follower.user_name == unfollow_name) {
            console.log('got a match');
            var followerId = follower.id;
            userModel.following.id(followerId).remove();
            userModel.save(function(err) {
              if(err) {throw err;}
              console.log('following removed');
            });
          }
        });
        pact.models.users.findOne({user_name: unfollow_name}, function(err, unfollowModel){
          if (err) return handleError(err);
          unfollowModel.followers.forEach(function(unfollower) {
            if (unfollower.user_name == userName) {
              var unfollowerId = unfollower.id;
              console.log('unfollowerId');
              console.log(unfollowerId);
              console.log('follower.user_name');
              console.log(unfollower.user_name);
              

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
