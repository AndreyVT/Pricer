/* global Router */
/* global records */
Template.addPurchase.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var purchase = {};
    purchase.shopId = template.selectedShop.get()._id;
    purchase.date = $('#datePurchase').val();
    purchase.userId = Meteor.userId();

    purchase.id = Purchases.insert(purchase);

    for (var i = template.records.length - 1; i >= 0; i--) {
      var record = template.records[i];
      record.purchaseId = purchase.id;
      Records.insert(record);
    };

    Router.go('purchases');
  },
  "click [data-action='addRecord']" : function(e, template) {
    e.preventDefault() ;
    var record = {};
    record.price =  $('#priceValue').val();
    record.itemId = template.lastAddedItem.get()._id;
    record.count = $('#countValue').val();
    record.num = template.counter.get() + 1;
    record.sum = record.count * record.price;

    $('#countValue').val(1);
    $('#priceValue').val('');
    $('#itemName').val('');

    lastAddedItem = {};

    template.records.push(record);

    template.counter.set(record.num);
    template.lastAddedItem.set({});

    template.purchaseSum.set(template.purchaseSum.get() + record.sum);
  }
});

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
  recordsItem: function(){
    return Template.instance().records.list();
  },
  newShopAddTrigger: function () {
    return Session.get("shop.name");
  },
  newItemAddTrigger: function(){
    return Session.get("item.name");
  },
  recordsCount : function()  {
    return Template.instance().counter.get() > 0;
  },
  realItemAdded : function(){
    return Template.instance().lastAddedItem.get()._id;
  },
  allowSavePurchase : function(){
    return (Template.instance().selectedShop.get()._id &&
            Template.instance().counter.get() > 0);
  },
  purchaseSum : function()
  {
    return Template.instance().purchaseSum.get();
  }
});

Template.addPurchase.onCreated(function(){
  this.records = new ReactiveArray([]);
  this.counter = new ReactiveVar(0);
  this.lastAddedItem = new ReactiveVar({});
  this.selectedShop = new ReactiveVar({});
  this.purchaseSum = ReactiveVar(0);
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
    "autocompleteselect #shopName": function (event, template, doc) {
      template.selectedShop.set(doc)
    },
    "autocompleteselect #itemName": function(event, template, doc) {
        //lastAddedItem = doc;
        template.lastAddedItem.set(doc);
        var unit = Units.findOne({_id:doc.unitId});
        $('#countValueLabel').html(unit.name);
    },
});

Template.addPurchase.events({
  "keydown #priceValue" : function(event){
    // Allow: backspace, delete, tab, escape, enter and .
    if (jQuery.inArray(event.keyCode,[46,8,9,27,13,190,191]) !== -1 ||
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
});