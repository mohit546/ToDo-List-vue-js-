new Vue({
	el: '#login',

	data: {
		userEmail: '',
		password: '',
		password1: '',
		state: 'login'
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
			this.userEmail = '';
			this.password = '';
		},

		toggle: function(state){
			this.state = state;
		},

		signUp: function(){
			if(this.userEmail != '' && this.password != '' && this.password1){
				if(this.password.localeCompare(this.password1) == 0){
					this.$http.post('/api/signup/', {userEmail: this.userEmail, password1: this.password}).then(function (response) {
						if(!response.data.status){
							console.log(response.data);
						}else{
							this.state = 'login';
						}
					}, function (response) {
						console.log(response.data);
					});
					this.userEmail = '';
					this.password = '';
					this.password1 = '';
				}else{
					console.log("Passwords didn't match");
				}
			}else{
					console.log("All fields are mandatory");
			}

		}
	}
});
