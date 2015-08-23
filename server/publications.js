Meteor.publish('purchases', function(options) {
  /*check(options, {
    sort: Object,
    limit: Number
  });*/
  if (!this.userId){
    return [];
  };

  return Purchases.find({userId: this.userId}, options);
});

Meteor.publish('shops', function(options) {
  /*check(options, {
    sort: Object,
    limit: Number
  });*/
  return Shops.find(); //{}, {} options
});

Meteor.publish('items', function(options) {
  /*check(options, {
    sort: Object,
    limit: Number
  });*/
  return Items.find({}, options);
});

Meteor.publish('records', function(options) {
  /*check(options, {
    sort: Object,
    limit: Number
  });*/
  return Records.find({}, options);
});