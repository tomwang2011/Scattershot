<html>
<head>
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="/js/chart-display-control.js"></script>
	<link href="http://fonts.googleapis.com/css?family=Varela" rel="stylesheet" />
	<link href="/css/main/default.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/css/main/fonts.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/css/chart/chartList.css" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
	<div id="wrapper">
		<div id="header-wrapper">
			<div id="header" class="container">
				<div id="logo">
				<h1><a href="#">My Charts Page</a></h1>
				</div>
				<div id="menu">
					<ul>
						<li><a href="#" accesskey="1" title="">Homepage</a></li>
						<li class="current_page_item"><a href="#" onclick="goToDisplayPage()" accesskey="2" title="">Display Charts</a></li>
						<li><a href="#" onclick="goToUploadPage()" accesskey="3" title="">Upload</a></li>
						<li><a href="/about.html" accesskey="4" title="">About Us</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div id="bannerw">
		<button class="button" onclick="newChart('${customerId}', '${datasetId}')">
			<script>
				var chartId = "${datasetId}";
			</script>
			Create New Chart
		</button>
		<h1>Your Charts</h1><br/>
		<table align="center" border="1">
			<tr>
				<th width="40%">Chart Name</td>
				<th width="40%">Sample</td>
				<th width="20%">Delete Chart</td>
			</tr>
	<#list charts as chart>
			<tr>
				<td width="40%"><h3><a class="chart-link" href="/chart/display/${chart.id}">${chart.name}</a></h3></td>
				<td width="40%"><iframe src="/chart/embed/${chart.id}?height=100&width=100" width="100" height="100" frameborder="0" scrolling="no"></iframe></td>
				<td width="20%"><button onclick="deleteChart('${chart.id}')" class="button">Delete</button><td>
			</tr>
	</#list>
		</table>
	</div>
</body>
</html>