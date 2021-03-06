<html>

<head>
    <title>${title}</title>
	<link href="http://fonts.googleapis.com/css?family=Varela" rel="stylesheet" />
	<link href="/css/main/default.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/css/main/fonts.css" rel="stylesheet" type="text/css" media="all" />
	<link href="/css/animate.css" rel="stylesheet" type="text/css" media="all" />

	<script src="/js/login-control.js"></script>
	<script src="/js/pageControl.js"></script>

	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
</head>

<body>
	<script>
		var customerId = "${customer.id}";
	</script>
	<div id="wrapper">
		<div id="header-wrapper">
			<div id="header" class="container">
				<div id="logo">
					<img src="/Drawing_1.png" style="width:100px;height:78px;" alt="Bars graphic by Freepik from Flaticon is licensed under CC BY 3.0. Made with Logo Maker"/>
				</div>
				<div id="menu">
					<ul>
						<li class="current_page_item"><a href="/${customer.id}/homepage" accesskey="1" title="">Homepage</a></li>
						<li><a href="#" onclick="goToDisplayPage()" accesskey="2" title="">Display Charts</a></li>
						<li><a href="#" onclick="goToUploadPage()" accesskey="3" title="">Upload</a></li>
						<li><a href="/about.html" accesskey="4" title="">About Us</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div align="center">
		<div id="logo">
			<h1 class="animated tada"><a href="/${customer.id}/homepage"></a></h1>
		</div>
	</div>
	<div id="banner">
		<div class="container animated bounceInUp">
			<div class="title">
				<h2>Display my charts</h2>
				<a href="#" onclick="goToDisplayPage()"><span class="byline">Go to list of charts</span></a>
			</div>
		</div>
	</div>

	<div id="banner">
		<div class="container animated bounceInUp">
			<div class="title">
				<h2>Upload a new dataset</h2>
				<a href="#" onclick="goToUploadPage()"><span class="byline">go to upload page</span></a>
			</div>
		</div>
	</div>
</body>
</html>
