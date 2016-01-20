new Vue({
	el: '#todoList',

	data: {
		tasks: [],
		newTask: ''
	},

	methods: {
		addTask: function(e){
			e.preventDefault();

			this.tasks.push({
				body: this.newTask,
				completed: false
			});
			this.newTask = '';
		}
	}
});
