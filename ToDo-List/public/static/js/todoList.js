new Vue({
	el: '#todoList',

	data: {
		tasks: [],
		newTask: '',
		editFlag: false,
		editLocation: null
	},

	computed: {

		remaining: function(){
			return this.tasks.filter(function(task){
				return ! task.completed;
			});
		},

		completions: function(){
			return this.tasks.filter(function(task){
				return task.completed;
			});
		}
	},

	filters: {

		inProcess: function(tasks){
			return tasks.filter(function(task){
				return ! task.completed;
			});
		},

		completed: function(tasks){
			return tasks.filter(function(task){
				return task.completed;
			});
		}
	},

	methods: {

		addTask: function(e){
			e.preventDefault();

			if(! this.newTask) return;
			if(this.editFlag){
				this.tasks.splice(this.editLocation, 1 , {body: this.newTask, completed: false});
				this.editFlag = false;
			}else{
				this.tasks.push({
					body: this.newTask,
					completed: false
				});
			}
			this.newTask = '';
		},

		toggleTask: function(task){
			task.completed = ! task.completed;
			this.editFlag = false;
			this.editLocation = null;
			this.newTask = '';
		},

		completeAll: function(){
			this.tasks.forEach(function(task){
				task.completed = true;
			});
		},

		editTask: function(task, index){
			// this.removeTask(task);
			this.editFlag = true;
			this.editLocation = index;
			this.newTask = task.body;
			$('#newTaskInput').focus();
		},

		removeTask: function(task){
			this.tasks.$remove(task);
		},

		clearCompleted: function(){
			this.tasks = this.tasks.filter(function(task){
				return ! task.completed;
			});
		}
	}
});
