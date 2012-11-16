console.log('START');
Meteor.startup(function () {
  	Tadas.remove({});
  	console.log('RESET');
	Tadas.insert({name: "Première tache!"});
	console.log('INSERTED:'+Tadas.findOne().name);
});

