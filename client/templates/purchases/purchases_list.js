Template.purchasesList.helpers({
	purchases: function(){
		return Purchases.find();
	}
});

Template.purchasesList.events({
  	"click [data-action='gotoAddPurchase']" : function(e) {
    	e.preventDefault() ;
		Router.go('addPurchase');
  	}
  });
