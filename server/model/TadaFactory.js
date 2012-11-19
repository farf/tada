if (typeof Tada == 'undefined') { var Tada = {};}

Tada.TadaFactory = Class.extend({
	init : function() {
		this.collection = new Meteor.Collection("tadas");
	},

	addChildren : function(parent, children) {
		parent.tadas.concat(children);
		for (var i = 0 ; i < children.length ; i++) {
			children[i].parent = parent._id;
		}
	},

	addChild : function(parent, child) {
		this.addChildren(parent, new Array(child));
	},

	insertTadaFromJson : function(json) {
		// check parameters
		if (typeof json == "undefined") {
			return;
		}

		//remove children
		if (typeof json.tadas != "undefined") {
			var children = json.tadas;
			json.tadas = new Array;
		} else {
			var children = null;
		}

		var _id = this.collection.insert(json);

		// Break the children
		if (children) {
			var _ids = new Array();
			
			for (var i = 0; i < children.length ; i ++) {
				
				var childId = this.insertTadaFromJson(children[i]);
				_ids.push(childId);
				this.collection.update(childId, {$pushAll: {parents: [_id]}});

			}

		}
		this.collection.update(_id, {$set: {tadas: _ids}});

		return _id;
	},

	/**
	* This function create tada if it doesn't exist or update it
	*/
	updateTada : function(tada) {
		var _id = null;
		// Check if the tada already exists
		// Check with _id
		if (typeof tada._id != undefined) {

		}
		// Check with id of source

		// A. If not insert it

		// B. If yes

		// B.1. check which parameters have changed

		// B.2. add previous parameters in history

		// B.3. add new parameters

		// B.4. save tada

		return _id;
	}
});
