/**
* Initialize({auth: "the key for asana"})
*/
var Asana = Tada.Connector.extend({
	defaults: {
	    "source":  "asana",
	    "auth": "unset",
	    "type":["workspace", "project", "task"]
	},

	getFromApi : function(get) {
		var result = Meteor.http.call('GET', 'https://app.asana.com/api/1.0/'+get, {"auth":this.get("auth")});
		if (!result.error) {
			result = JSON.parse(result.content);	
			if (result && result.data) {
				return result.data;
			} else {
				Meteor._debug("no data in result from Asana");
			}
		} else {
			Meteor._debug(result.error);
		};
	},

	getWorkspaces : function() {
		return this.getFromApi("workspaces");
	},

	getTasks : function(projectId) {
		if (projectId) {
			return this.getFromApi("projects/"+projectId+"/tasks");
		} else {
			return this.getFromApi("tasks");
		}
	},

	getProjects : function(workspaceId) {
		if (workspaceId) {
			return this.getFromApi("workspaces/"+workspaceId+"/projects");	
		} else {
			return this.getFromApi("projects");	
		}
		

	},

	getTadas : function() {
		Meteor._debug("start importing asana");
		var tada = {name:"Asana", "text": "all tasks from Asana"};

		// get workspaces
		var workspaces = this.getWorkspaces();
		Meteor._debug("start importing workspaces: "+workspaces.length);
		tada.tadas = new Array();
		for (var i = 0 ; i < workspaces.length ; i++) {

			Meteor._debug(i+"/"+workspaces.length);
			var tadaWorkspace = {
				name: workspaces[i].name, 
				source: {source:this.get('source'), type: "workspace", id: workspaces[i].id}
			};

			// Get projects
			var projects = this.getProjects(workspaces[i].id);
			Meteor._debug("start importing project: "+projects.length);
			tadaWorkspace.tadas = new Array();

			for (var j = 0 ; j < projects.length ; j++) {
				Meteor._debug(j+"/"+projects.length);
				var tadaProject = {
					name: projects[j].name,
					source: {source:this.get('source'), type: "project", id: projects[j].id}
				};

				// Get tasks
				var tasks = this.getTasks(projects[j].id);
				Meteor._debug("start importing tasks: "+tasks.length);
				tadaProject.tadas = new Array();

				for (var k = 0 ; k < tasks.length ; k ++) {
					Meteor._debug(k+"/"+tasks.length);
					var tadaTask = {
						name: tasks[k].name,
						source: {source:this.get('source'), type: "task", id: tasks[k].id}
					}

					tadaProject.tadas.push(tadaTask);
				}

				tadaWorkspace.tadas.push(tadaProject);
			}


			tada.tadas.push(tadaWorkspace);
		}
		return tada;
	}
});