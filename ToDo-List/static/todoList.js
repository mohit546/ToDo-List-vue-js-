new Vue({
	el: '#todoList',

	data: {
		tasks: [],
		newTask: ''
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

			this.tasks.push({
				body: this.newTask,
				completed: false
			});
			this.newTask = '';
		},

		toggleTask: function(task){
			task.completed = ! task.completed;
		},

		completeAll: function(){
			this.tasks.forEach(function(task){
				task.completed = true;
			});
		},

		editTask: function(task){
			this.removeTask(task);
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
