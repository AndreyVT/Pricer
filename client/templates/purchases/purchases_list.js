Template.purchasesList.helpers({
	purchases: function(){
		return Purchases.find();
	}
});
