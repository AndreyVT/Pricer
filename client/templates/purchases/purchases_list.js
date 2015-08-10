var purchasesData = [
{
	title: 'Покупка1',
	shop: 'Shop1',
	userId: '1',
	date: '10.10.2014',
	records: {}
},
{
	title: 'Покупка2',
	shop: 'Shop2',
	userId: '1',
	date: '11.10.2014',
	records: {}
},
{
	title: 'Покупка3',
	shop: 'Shop4',
	userId: '1',
	date: '06.01.2014',
	records: {}
}];

Template.purchasesList.helpers({
	purchases: purchasesData
});