//purchaseItem
Template.purchaseItem.events({
  "click [data-action='removePurchase']" : function(e){
    e.preventDefault();
    Purchases.remove(this._id);
  }
});

Template.purchaseItem.helpers({
	title: function(){
		var shop = Shops.findOne({_id:this.shopId});
		console.log("purchase_item shop::", shop);
		console.log("purchase_item purchase::", this);
		return shop.shopName;
	}
});