new Vue({
	el: '#login',

	data: {
		userName: '',
		password: ''
	},

	methods: {
		login: function(){
			alert(userName, password);
		}
	}
});
