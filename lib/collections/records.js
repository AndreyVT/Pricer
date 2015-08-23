Records = new Mongo.Collection('records');

Meteor.methods({
	getPurchaseRecords: function(params) {
		var user = Meteor.user();
//		var post = Posts. fi ndOne(commentAttri butes. postId) ;
// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to make comments") ;
		/*if (!commentAttri butes. body)
			throw new Meteor. Error(422, ' Please wri te some content' ) ;
		if (!post)
			throw new Meteor. Error(422, ' You must comment on a post' ) ;*/
	
		return Records.find({purchaseId: params.purchaseId}) ;
	},
	addNewRecord: function(record) {
		var user = Meteor.user();
		if (!user)
			throw new Meteor.Error(401, "You need to login to make comments") ;
		
		record.userId = user._id;
		record.userName = user.username;
	
		return Records.insert(record);
	}
});

Records.allow({
	insert: function(userId, doc) {
	// разрешить постить только если пользователь залогинен
	return !! userId;
	}
});

if (Meteor.isClient){
	Meteor.subscribe("records");
}