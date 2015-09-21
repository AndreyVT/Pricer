Template.addShop.events({
    "click [data-action='submitAddShop']": function (e, template) {
		//e.preventDefault() ;
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
		$('#shopName').val(shop.shopName);
		template.view.parentView._templateInstance.selectedShop.set(shop);
		$('#addShopModal').modal('hide');
	}
}) ;

Template.addShop.helpers({
	shopName : function(){
		return Session.get("shop.name");
	}
});
