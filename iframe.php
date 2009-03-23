<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-ES">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<script type="text/javascript" src="fr/<?=$_GET["jsFile"]."?rand=".rand()?>"></script>
	<script type="text/javascript" src="fr/<?=$_GET["jsFunc"]."?rand=".rand()?>"></script>
	<link rel="stylesheet" href="style.css" media="screen" />
</head>
<body id="iframe">
	<a href="#iframe">Launch</a>
	<div id="page" class="hide">
	</div>
	<div id="source">
		<h3>Código</h3>
		<pre><code class="javascript">
			<?php echo htmlentities(file_get_contents('fr/'.$_GET["jsFunc"])); ?>
		</code></pre>	
	</div>
	<div id="results">
		<h3>Resultados</h3>
		<table id="tResults"></table>
	</div>
<script type="text/javascript">
<!--
function test(fn){
	try {
		var start = new Date().getTime();
              for (var i = ITERS;i>0;i--) fn();
		var end = new Date().getTime() - start;

		return {'time': Math.round(end*1000/ITERS)};
	} catch(err){
		return ({'time': 0});
	}
}
document.getElementsByTagName("a")[0].onclick = function(){
	var res = document.getElementById("tResults");
	for (var x in functions){
		var r = test(functions[x]);
		res.innerHTML += '<tr><th>'+x + '</th><td>' + r.time + 'ms.</td>';
	}
		
}
-->
</script>
</body>
</html>