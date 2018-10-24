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
							<button  class="btn btn-primary">Нэвтрэх</button></fieldset>
					</form>
				</div>
			</div>
		</div><!-- /.col-->
	</div><!-- /.row -->	
</template>	

<script>

// const { check_login } = require("../lib/service");
import { check_login } from '../lib/service.js'
// import service from "../lib/service";

export default {
	name: 'Login',
	data(){
		return {
			username: '',
			password: ''
		}
	},
  	mounted() {
		if(!this.authenticated) {
			this.$router.replace("login");
		}
	},
	created(){
		
	},
	methods: {
		setAuthenticated(status) {
          this.authenticated = status;
      },
      logout() {
          this.authenticated = false;
      },
		login(){
			console.log('start login', this.username, this.password)
			// console.log(service)
			check_login(this.username, this.password).then(response => {
				if (response) {
					this.$router.push('/')
					this.setAuthenticated('LoggedIn')
					console.log("login success");
				} else {
					console.log("Username or password incorrect!");
				}
			});
		}

	}
}
</script>
