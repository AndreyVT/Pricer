var searchItems = function (e, template) {
    template.searchResults.clear();
    var tmpArray = Items.find({ "name": new RegExp($('#searchText').val(), 'i') }).fetch();
    template.searchResults.clear();
    for (var i = 0; i < tmpArray.length; i++) {
        template.searchResults.push(tmpArray[i]);
    }
}

Template.search.events({
    "click [data-action='search']": function (e, template) {
        e.preventDefault();
        searchItems(e, template);
    },
    "keydown #searchText": function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            searchItems(e, Template.instance());
        }
    }
});

Template.search.helpers({
    searchItems: function () {
        return Template.instance().searchResults.list();
    }
});

Template.search.onCreated(function () {
    this.searchText = new ReactiveVar(0);
    this.searchResults = new ReactiveArray([]);
});

Template.search.rendered = function () {
    //$('#searchText').val('еб');
};