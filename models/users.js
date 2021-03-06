module.exports = function(mongoose) {
  var collection = 'users';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var Followers = new Schema({
    follow_id: ObjectId,
    timestamp: Date,
    user_name: String
  });
  exports.Followers = mongoose.model('Followers', Followers);

  var Following = new Schema({
    follow_id: ObjectId,
    timestamp: Date,
    user_name: String
  });
  exports.Following = mongoose.model('Following', Following);

  var schema = new Schema({
    uid: ObjectId,
    user_name: String,
    password: String,
    email: String,
    photo: String,
    account_created: Date,
    last_active: Date,
    followers: [Followers],
    following: [Following]
  });

  return mongoose.model(collection, schema);
};
