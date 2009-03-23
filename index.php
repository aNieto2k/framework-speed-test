<?php
 $frameworks = parse_ini_file('config.ini', true);
 $functions = array(
		'uno' => 'create',
		'dos' => 'remove',
		'tres'=>'inject',
		'cuatro' =>'addStyle',
		'cinco' => 'addStyles',
		'seis' => 'removeStyle',
		'siete' =>'removeStyles',
		'ocho' => 'addAtt',
		'nueve' => 'addAtts',
		'diez' => 'removeAtt',
		'once' => 'removeAtts',
		'doce' => 'addClass',
		'trece' => 'hasClass',
		'catorce' => 'removeClass',
		'quince' => 'addEvent',
		'dieziseis' => 'fireEvent',
		'diezisiete' => 'removeEvent',
		'dieziocho' => 'Parent',
		'total' => 'Total');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-ES">
<head profile="http://gmpg.org/xfn/11">
<title>Framework Speed Test</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="klass.js"></script>
<script type="text/javascript" src="site.js?rand=<?=rand()?>"></script>
<link rel="stylesheet" href="style.css?rand=<?=rand()?>" media="screen" />
</head>
<body>
<div id="page">
	<div id="results">
		<table>
			<thead>
					<tr>
						<th colspan="<?=sizeof($frameworks) + 2?>">
							<h1><a href="index.php">Framework Speed Test</a></h1>
							<p class="desc">Every framework runs in his own iFrame, thus no conflicts can happen. Tests are run function by function.</p>
							<p class="desc">Tests are run in a neutral environment, no library or framework is included in the main javascript test, to avoid favoritism.</p>
						</th>
					</tr>
				<tr>
					<th colspan="2">
						<button id="start">Start</button>
					</th>
				<?php foreach($frameworks as $framework): ?>
							<th><a href="iframe.php?jsFile=<?=$framework["file"]?>&amp;jsFunc=<?=$framework["function"]?>"><?=$framework["name"]?></a>
						<iframe style="width:100%;height:200px;" name="<?=$framework["name"]?>" src="iframe.php?jsFile=<?=$framework["file"]?>&amp;jsFunc=<?=$framework["function"]?>"></iframe>
						<span class="info">
							<strong>core</strong>: <?php echo number_format(filesize("fr/".$framework["file"])); ?> bytes<br />
							<strong>function</strong>: <?php echo number_format(filesize("fr/".$framework["function"])); ?> bytes 
							<br />(<?php echo number_format(count(file("fr/".$framework["function"])))?> lines)
						</span>
							</th>
				<?php endforeach; ?>
				</tr>
			</thead>
			<tbody>
				<?php $x=0;foreach($functions as $function => $name): ?>
					<tr class="<?=(++$x % 2)?"":"alt"?> <?=$function?>" id="_<?=$function?>">
						<th colspan="2"><?=$name?></th>
					<?php foreach($frameworks as $framework): ?>	
							<td id="_<?=$framework["name"]?>_<?=$function?>"></td>
					<?php endforeach; ?>
					</tr>
			<?php endforeach; ?>
				<tr>
					<th colspan="<?=$x?>">Desarrollado por <a href="http://www.anieto2k.com">aNieto2k</a> / <a href="http://veerle.duoh.com/blog/comments/a_css_styled_table/">Veerle's</a> CSS Table</th>
				</tr>
			</tbody>
			</table>
	</div>
</div>
<script type="text/javascript">
<!--
document.getElementById("start").onclick = function(){
	<?php 
		foreach($frameworks as $framework){
			echo 'var t_'.$framework["name"].' = new Test("'.$framework["name"].'");';
			echo 't_'.$framework["name"].'.start();'."\n";
		}
	?>
	// Coloreamos 
	var tr = document.getElementsByTagName("tr");
	for (var x in tr){
	    if (!tr[x].getElementsByTagName) continue;
	    var td = tr[x].getElementsByTagName("td");
	    var valores = [];
	    for (var y in td){
	        if (!td[y].speed) continue;
	        valores.push(td[y].speed);
	    }
	    var min = Math.min.apply(this,valores);
	    var max = Math.max.apply(this,valores);
	    for (var y in td){
	        if (!td[y].speed) continue;
			if (td[y].speed == 0) min = 0;
	        if (td[y].speed == min) td[y].style.backgroundColor = '#DBFFCF';
	        if (td[y].speed == max) td[y].style.backgroundColor = '#FFCFCF';
			var diff = (td[y].speed * 100 / min)/100;
			var dec = new String(diff).split(".");
			if (dec[1])
				diff = dec[0] + "." + dec[1].substring(0,2);
			td[y].innerHTML += '<small>' + diff + 'x</small>';
	    }
	}
}
-->
</script>
</body>
</html>