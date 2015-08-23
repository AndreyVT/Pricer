Template.addPurchase.events({
  'submit form': function(e) {
    e.preventDefault();
    var purchase = {};
    purchase.shopId = selectedShop._id;
    purchase.date = $('#datePurchase').val();
    purchase.userId = Meteor.userId();

    purchase.id = Purchases.insert(purchase);

    for (var i = records.length - 1; i >= 0; i--) {
      var record = records[i];
      record.purchaseId = purchase.id;
      consoloe.log(i, "::", record);
      //Records.insert(record);
    };

    Router.go('purchasesList');
  },
  "click [data-action='addRecord']" : function(e) {
    e.preventDefault() ;
    var record = {};
    record.price =  $('#priceValue').val();
    record.itemId = lastAddedItem._id;
    
    $('#priceValue').val('');
    $('#itemName').val('');
    lastAddedItem = {};

    Template.addPurchase.recordsList.push(record);
    console.log(Template.addPurchase.recordsList);
    /*Meteor.call('addNewRecord' , record, function(error, recordId) {
      if (error) {
        throwError(error.reason) ;
      } else {
        record.id = recordId;
    
      }
    });*/
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
    return purchase.id;
  },
  /*records: function(){
    return Records.find({purchaseId: this._id});
  },*/
  newShopAddTrigger: function(){
    return Session.get("shop.name");
  },
  newItemAddTrigger: function(){
    return Session.get("item.name");
  },
  lastAddedItem: {},
  selectedShop: {},
  records: function(){
    return Template.addPurchase.recordsList;
  }
});

Template.addPurchase.recordsList = [];

Template.addPurchase.onCreated(function(){
  /*Meteor.call('addNewPurchase' , {}, function(error, purchaseId) {
      if (error) {
        throwError(error.reason) ;
      } else {
        purchase.id = purchaseId;
      }
    });

    return purchase.id;*/
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
   
    $('#datePurchase').val(moment().format('DD.MM.YYYY'));
};

//Для отслеживания если нужно завершения ввода значения в инпут поиска...
Template.addPurchase.events({
  "autocompleteselect #shopName": function(event, template, doc) {
    selectedShop = doc;
    //var result = Purchases.update({_id: purchase.id}, {$set: {shopId: doc._id}});
  /*  console.log("purchase:: ", purchase);
    console.log("selected Shop =====", doc);
    console.log("selected Shop this =====", this);
    console.log("updateResult =====", result);*/
  },
  "autocompleteselect #itemName": function(event, template, doc) {
    //console.log("Selected item ::", doc);
    //lastItemId = doc._id;
    lastAddedItem = doc;
    //purchase.shopId = doc._id;
    //console.log("purchase:: ", purchase);
  }
});

Template.addPurchase.events({
  "keydown #priceValue" : function(event){
    // Allow: backspace, delete, tab, escape, enter and .
    if (jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
         // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) || 
         // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
             // let it happen, don't do anything
          return;
    }
    else {
        // Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
        }   
    }
  },
  /*"blur #datePurchase" : function(event, template){
    console.log('Event:: ', event);
    console.log('New date:: ', $('#datePurchase')[0].value);
    console.log('Template:: ', template);
    var newDate = $('#datePurchase').val();
    console.log('New date:: ', $('#datePurchase'));
    
    console.log('New date:: ', newDate);
    var result = Purchases.update({_id: purchase.id}, {$set: {date: newDate}})  
    //console.log('Result update:: ', result);
  }*/
});