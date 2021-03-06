console.log('START');
Meteor.startup(function () {

  	var tada = {
		name: "Première tache!", 
		text:"<p>Super texte</p>",
		tadas: [
			{
				name: "Sous tache", 
				text:"<p>Super texte</p>"
		  	},
		  	{
				name: "Sous tache 2", 
				text:"<p>Super texte</p>",
				tadas: [
					{
						name: "Sous sous tache 1", 
						text:"<p>Super texte</p>"
				  	},{
						name: "Sous sous tache 2", 
						text:"<p>Super texte</p>"
				  	}

				]
		  	}
		]
  	};

	TadaFactory = new Tada.TadaFactory();

  	if (false && TadaFactory.findOne().length > 0) {

	  	TadaFactory.remove({});
	  	console.log('RESET');
  		TadaFactory.insertTadaFromJson(tada);
  		console.log('INSERTED');
  	}

  	if (!TadaFactory.collection.findOne({name:"Asana"})) {
	  	// Connectors
	  	var asana = new Tada.Connector.Asana({auth:"1NDW80y.xTY8OYY3IGtfm5hhr83vStxJ:"});
	  	TadaFactory.collection.remove({});
	  	console.log('RESET');
		TadaFactory.insertTadaFromJson(asana.getTadas());	
  	}
  	
});
