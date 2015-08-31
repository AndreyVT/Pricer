//purchaseItem
Template.purchaseItem.events({
  "click [data-action='removePurchase']" : function(e){
    e.preventDefault();
    Purchases.remove(this._id);
  }
});

Template.purchaseItem.helpers({
	shop: function(){
		var shop = Shops.findOne({_id:this.shopId});
		return shop;
	}
});