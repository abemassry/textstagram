module.exports = function(mongoose) {
  var collection = 'posts';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var Likes = new Schema({
    like_id: ObjectId,
    name: String,
    date_liked: Date,
  });
  exports.Likes = mongoose.model('Likes', Likes);

  var Comments = new Schema({
    comment_id: ObjectId,
    user: String,
    user_photo: String,
    body: String,
    date_commented: Date,
  });
  exports.Comments = mongoose.model('Comments', Comments);

  var schema = new Schema({
    post_id: ObjectId,
    body: String,
    lang: String,
    filter: String,
    date: Date,
    submitted_by: String,
    submitted_by_photo: String,
    likes: [Likes],
    comments: [Comments]
  });

  return mongoose.model(collection, schema);
};
