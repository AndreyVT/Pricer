Template.addShop.events({
    "click [data-action='submitAddShop']": function (e) {
		e.preventDefault() ;
		var shop = {};
		shop.shopName = $('#shopNameAdd').val();
		shop.address = $('#address').val();
		shop._id = Shops.insert(shop);
		var tmpString = Session.get("shop.name");
		if (!tmpString){
			Router.go('/shops/list', shop) ;
		}
		else {
		    Session.set("shop.name", false);
		}
	}
}) ;

Template.addShop.helpers({
	shopName : function(){
		return Session.get("shop.name");
	}
});
