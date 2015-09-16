Template.searchItem.helpers({
    minPrice: function () {
        return Session.get("miPrice" + this._id) || "Loading...";
    },
    maxPrice: function () {
        return this._id;
    }
});

Template.searchItem.onCreated(function () {
   // Meteor.call("findItemMinPrice", this._id);
});