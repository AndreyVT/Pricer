/*Router.configure({
	layoutTemplate: 'searchLayout'
});

Router.map(function() {
	this.route('searchItems' , {
		path: '/'
	});

	this.route('search' , {
		path: '/search'
	}) ;
	
	this.route('purchases' , {
		path: '/purchasesList'
	}) ;
})*/

Router.route('addShop', function(){
	this.layout('layout');
	this.render('addShop', '/shops/add');
});

Router.route('shopsList', function(){
	this.layout('layout');
	this.render('shopsList', '/shops/list');
});

Router.route('addPurchase', function(){
	this.layout('layout');
	this.render('addPurchase', '/purchases/add');
});

Router.route('purchases', function(){
	this.layout('layout');
	this.render('purchasesList', '/purchasesList');
});

Router.route('/', function(){
	this.layout('searchLayout');
	this.render('searchItems', '/');
});

Router.route('search', function(){
	this.layout('searchLayout');
	this.render('search', '/search');
});
/*
Router.map(function() {
	this.route('searchItems' , {
		path: '/',
		layout: 'searchLayout'
	});

	this.route('search' , {
		path: '/search',
		layout: 'searchLayout'
	}) ;
}) ;*/

var requireLogin = function() {
	if (!Meteor.user()) {
		this.layout('searchLayout');
		this.render('searchItems');
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin, {});
