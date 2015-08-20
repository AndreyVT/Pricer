Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('purchasesList' , {path: '/'});

	this.route('addShop' , {
		path: '/shops/add'
	}) ;

	this.route('shopsList' , {
		path: '/shops/list'
	}) ;

	this.route('addPurchase' , {
		path: '/purchases/add'
	}) ;

	this.route('search' , {
		path: '/search'
	}) ;
}) ;

