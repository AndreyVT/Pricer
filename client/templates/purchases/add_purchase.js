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
    $('#recordItem').val('');

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
          options: 'i',
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
          options: 'i',
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
    "autocompleteselect #recordItem": function (event, template, doc) {
        //lastAddedItem = doc;
        template.lastAddedItem.set(doc);
        var unit = Units.findOne(doc.unitId);
        $('#countValueLabel').text(unit.name);
    },
});

var calcPrice = function () {
    var priceValue = $('#priceValue').val();
    var count = $('#countValue').val();
    $('#sumRecord').val(priceValue * count);
};

Template.addPurchase.events({
    "keydown #priceValue": function (event) {
        calcPrice();
        //(event.keyCode == 65 && event.ctrlKey === true) // Allow: backspace, delete, tab, escape, enter and .
    },
    "blur #priceValue": function (event) {
        calcPrice();
    }
});
