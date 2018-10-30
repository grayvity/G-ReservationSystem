<template>
	<div class="row">
		<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
			<div class="login-panel panel panel-default">
				<div class="panel-heading">Нэвтрэх</div>
				<div class="panel-body">
					<form role="form" v-on:submit.prevent="login">
						<fieldset>
							<div class="form-group">
								<input class="form-control" v-model="username" placeholder="username" name="username" type="text" autofocus="">
							</div>
							<div class="form-group">
								<input class="form-control" v-model="password" placeholder="Password" name="password" type="password" value="">
							</div>
							<div class="checkbox">
								<label>
									<input name="remember" type="checkbox" value="Remember Me">Намайг сана
								</label>
							</div>
							<button type="submit" class="btn btn-primary">Нэвтрэх</button></fieldset>
							
					</form>
					<button v-on:click="logOut" class="btn btn-primary">Гарах</button>
					<h1>{{get_is_logged}}</h1>
				</div>
			</div>
		</div>
	</div>
</template>	

<script>

// const request = require("request-promise-native");


export default {
	name: 'Login',
	data(){
		return {
			username: '',
			password: ''
		}
	},
	created(){
		
	},
	computed:{
		get_is_logged(){
			return this.$store.getters.get_is_logged;
		}
	},
	methods: {
		async login(){
			console.log('start login', this.username, this.password)
			const res = await fetch("/api/login", {
				method: "POST",
				body: JSON.stringify({ username: this.username, password: this.password }),
				headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
				}
			});
			
			const resJson = await res.json();
			console.log('Response: ', resJson.is_success)

			if(resJson.is_success){
				this.$store.dispatch('set_login_status', 1)
				this.$router.push('/home')
			}

			if (resJson.error) {
				throw new Error(resJson.error);
			}
			if (res.error) {
				throw new Error(res.error);
     		 }
		},
		logOut(){
			this.$store.dispatch('set_login_status', 0)
		}

	}
}
</script>
