<template>
<div>
	<SideBar/>
	<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
			<div class="row">
				<ol class="breadcrumb">
					<li><a href="#">
						<em class="fa fa-home"></em>
					</a></li>
					<li class="active">Захиалга</li>
				</ol>
			</div>
			
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							Бүртгэл
							<ul class="pull-right panel-settings panel-button-tab-right">
								<li class="dropdown"><a class="pull-right dropdown-toggle" data-toggle="dropdown" href="#">
									<em class="fa fa-cogs"></em>
								</a>
									<ul class="dropdown-menu dropdown-menu-right">
										<li>
											<ul class="dropdown-settings">
												<li><a href="#">
													<em class="fa fa-cog"></em> Settings 1
												</a></li>
												<li class="divider"></li>
												<li><a href="#">
													<em class="fa fa-cog"></em> Settings 2
												</a></li>
												<li class="divider"></li>
												<li><a href="#">
													<em class="fa fa-cog"></em> Settings 3
												</a></li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
							<span class="pull-right clickable panel-toggle panel-button-tab-left"><em class="fa fa-caret-up"></em></span></div>
						<div class="panel-body">
							<div class="canvas-wrapper">
								<table class="table table-bordered">
									<thead>
										<tr>
										<th scope="col">#</th>
										<th scope="col">2018/02/01</th>
										<th scope="col">2018/02/02</th>
										<th scope="col">2018/02/03</th>
										</tr>
									</thead>
									<tbody>
										<tr>
										<th scope="row">1</th>
										<td>x</td>
										<td>x</td>
										<td>x</td>
										</tr>
										<tr>
										<th scope="row">2</th>
										<td>x</td>
										<td>x</td>
										<td>x</td>
										</tr>
										<tr>
										<th scope="row">3</th>
										<td colspan="2"><span style="width:100%" class="badge badge-pill badge-success">Захиалагдсан</span></td>
										<td>x</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
	
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  name: 'Reserve',
  components: {SideBar}
}
</script>