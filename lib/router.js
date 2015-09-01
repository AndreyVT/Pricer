/*Router.configure({
	layoutTemplate: 'layout'
});*/

Router.map(function() {
	this.route('searchItems' , {
		path: '/',
		layout: 'searchLayout'
	});

	this.route('search' , {
		path: '/search',
		layout: 'searchLayout'
	}) ;

	this.route('addShop' , {
		path: '/shops/add',
		layout: 'layout'
	}) ;

	this.route('shopsList' , {
		path: '/shops/list',
		layout: 'layout'
	}) ;

	this.route('addPurchase' , {
		path: '/purchases/add',
		layout: 'layout'
	}) ;
}) ;

var requireLogin = function() {
	if (!Meteor.user()) {
		this.render('searchItems');
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin, {});
