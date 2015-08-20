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
	}
}) ;