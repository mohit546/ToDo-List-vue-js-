new Vue({
	el: '#login',

	data: {
		userEmail: '',
		password: ''
	},

	methods: {
		login: function(){
			this.$http.post('/api/login/', {userEmail: this.userEmail, password: this.password}).then(function (response) {
				if(!response.data.status){
					console.log(response.data);
				}else{
					localStorage.setItem('token', response.data.token);
					window.location.href = response.data.redirectUrl;
				}
			}, function (response) {
				console.log(response.data);
			});
		}
	}
});
