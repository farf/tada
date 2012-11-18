console.log('START');
Meteor.startup(function () {

  	var tada = {
		name: "Première tache!", 
		text:"<p>Super texte</p>",
		tadas: [
			{
				name: "Sous tache", 
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
		  	},
		  	{
				name: "Sous tache 2", 
				text:"<p>Super texte</p>"
		  	}
		]
  	};

  	if (TadaFactory.findOne().length > 0) {
  		console.log('insert');
  		TadaFactory.insertTadaFromJson(tada);
  	}
});
