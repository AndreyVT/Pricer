console.log("Units 1::", Units.find().count());
if (Units.find().count() === 0){
	console.log("Units 2::", Units.find().count());
	Units.insert({
		name:'шт',
		longName:'штук',
		precision: 0});
	Units.insert({
		name:'литр',
		longName:'литр',
		precision: 2});
	Units.insert({
		name:'кг',
		longName:'килограмм',
		precision: 3});
	Units.insert({
		name:'пара',
		longName:'пара',
		precision: 0});
	Units.insert({
		name:'упаковка',
		longName:'упаковка',
		precision: 0});
};