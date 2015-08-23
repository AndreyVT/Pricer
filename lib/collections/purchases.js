Purchases = new Meteor.Collection('purchases');

Purchases.allow({
	insert: function(userId, purchase) { return ownsDocument(userId, purchase); },
  	remove: function(userId, purchase) { return ownsDocument(userId, purchase); },
  	update: function(userId, purchase) { return ownsDocument(userId, purchase); }
});

Meteor.methods({
	addNewPurchase: function() {
		var user = Meteor.user();
//		var post = Posts. fi ndOne(commentAttri butes. postId) ;
// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to make comments") ;
		/*if (!commentAttri butes. body)
			throw new Meteor. Error(422, ' Please wri te some content' ) ;
		if (!post)
			throw new Meteor. Error(422, ' You must comment on a post' ) ;*/
		purchase = {};
		purchase.userId = user._id;
		purchase.userName = user.username;
		purchase.shopId = "";
		purchase.date = moment().format('DD.MM.YYYY');
	
		return Purchases.insert(purchase) ;
	}
});

if (Meteor.isClient){
	Meteor.subscribe("purchases");
}