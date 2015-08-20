Template.addPurchase.events({
	'submit form' : function(e) {
	e.preventDefault() ;
  var record = {};
 /*	var purchase = {
		shopName: $(e.target).find('[name=shopName]').val(),
		address: $(e.target).find('[name=address]').val()
};
shop._id = Shops.insert(shop);*/
//Router.go('/shops/list', shop) ;
//Router.go('postPage', shop) ;
},
  'click .btn' : function(e){
    e.preventDefault();
    //console.log('Ловим клик::',e);
  }
}) ;

Template.addPurchase.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: Shops,
          field: "shopName",
          template: Template.shopSearchItem,
          noMatchTemplate: Template.noMatchShop
        }
      ]
    };
  },
  settingsItems: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: Items,
          field: "name",
          template: Template.productSearchItem,
          noMatchTemplate: Template.noMatchItem
        }
      ]
    };
  },
  purchaseId: function(){
    //console.log("Purchase (purchaseId):: ", purchase);
    return purchase.id;
  },
  records: function(){
    return Records.find({purchaseId: purchase.id});
  },
  newShopAddTrigger: function(){
    return Session.get("shop.name");
  },
  newItemAddTrigger: function(){
    return Session.get("item.name");
  }
});

Template.addPurchase.onCreated(function(){
  Meteor.call('addNewPurchase' , {}, function(error, purchaseId) {
      if (error) {
        throwError(error.reason) ;
      } else {
        purchase.id = purchaseId;
        console.log("Purchase (onCreated in IF):: ", purchase);
      }
    });
    console.log("Purchase (onCreated):: ", purchase);

    return purchase.id;
});

Template.addPurchase.rendered = function() {
    $('#datePurchase').datepicker({
    	format: "dd.mm.yyyy",
    	todayBtn: true,
    	clearBtn: true,
    	language: "ru",
    	orientation: "top auto",
    	autoclose: true,
    	todayHighlight: true
    });

    var now = moment().format('DD.MM.YYYY');
    $('#datePurchase').val(now);
};

//Для отслеживания если нужно завершения ввода значения в инпут поиска...
Template.addPurchase.events({
  "autocompleteselect #shopName": function(event, template, doc) {
    //console.log("selected Shop =====", doc);
    purchase.shopId = doc._id;
    //console.log("purchase:: ", purchase);
  },
  "autocompleteselect #productName": function(event, template, doc) {
    //console.log("selected Item =====", doc);
    //purchase.shopId = doc._id;
    //console.log("purchase:: ", purchase);
  }
});