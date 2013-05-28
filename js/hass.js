function setAlgorithm() {
	function e(x) { return document.getElementById (x); }
	var x = e ("algorithm_label");
	e ("algorithm").innerHTML = x.options[x.selectedIndex].value;
}
function setFrom() {
	function e(x) { return document.getElementById (x); }
	var x = e ("chop_from");
	e ("label_from").innerHTML = x.options[x.selectedIndex].value;
}
function setLength() {
	function e(x) { return document.getElementById (x); }
	var x = e ("length");
	e ("length_label").innerHTML = x.options[x.selectedIndex].value;
}

function init() {
	getCookie();
}

function set(x,y) {
	document.getElementById(x).value = y;
	var algo = document.getElementById(x)
		for (var i=0; i< algo.length; i++) {
			if (algo[i].value == y)
				algo[i].selected = true;
		}
}

function getCookie() {
	var c = "";
	if (localStorage) {
		c = localStorage.getItem("cookie");
	} else {
		c = document.cookie;
	}
	if (!c) return;
	var ca = c.split(';');
	var ca = ca[0].split(',');
	for (var i=0;i<ca.length; i++) {
		var kv = ca[i].split('=');
		if (kv[1].charAt(0)=='.') {
			var b = document.getElementById(kv[0]);
			if (b) b.setAttribute ('toggled', kv[1].substring(1));
		} else {
			set (kv[0], kv[1]);
		}
	}
}

function get(x) {
	// TODO: filter ,;=
	var v = document.getElementById(x).value;
	if (v.indexOf (",") != -1 || v.indexOf (";")!=-1 || v.indexOf ("=") != -1) {
		alert ("Invalid chars in "+x+" string ,;=");
		v = v.replace (/[,;=]*/g,"");
		document.getElementById(x).value = v;
	}
	return v;
}

function getb(x) {
	var b = document.getElementById(x)
		if (b) return "."+(b.getAttribute('toggled')=="true");
	return ".false";
}

function setCookie() {
	var cookie =
		"from="+get("from")+","+
		"lenn="+get("lenn")+","+
		"salt="+get("salt")+","+
		"algo="+get("algo")+","+
		"dark="+getb("dark")+","+
		"binmode="+getb("binmode")+","+
		"pronunci="+getb("pronunci")+","+
		"variable="+getb("variable")
		;
	if (localStorage)
		localStorage.setItem("cookie", cookie);
	else document.cookie = cookie;
	history.go(-1);
	window.location.reload()
}

function copy_to_clipboard(text) {
	if (window.clipboardData) {
		window.clipboardData.setData('text', text);
	} else {
		var clipboarddiv = document.getElementById('divclipboardswf');
		if (!clipboarddiv) {
			clipboarddiv = document.createElement('div');
			clipboarddiv.setAttribute("name", "divclipboardswf");
			clipboarddiv.setAttribute("id", "divclipboardswf");
			document.body.appendChild(clipboarddiv);
		}
		clipboarddiv.innerHTML = '<embed src="clipboard.swf" FlashVars="clipboard=' + 
			encodeURIComponent(text) + 
			'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
	}
} 

function randomString() {
	return ""+Math.random()*0xfffffff;
}

function pronunciableChar (o, i, x) {
	var vowels = "aeiouAE";
	var consonants = "cdfgmnprswxy" +
		"CDFGLMNPRTWXY";
	var numbers = "34689";
	if ((x%2) == 0) { // 50% = 0
		i = 1;
	} else {
		if (i==0 && (x%3) == 0)
			i = 1;
	}
	x^= (o+i);
	switch ((x+i)%3) {
		case 0: return consonants.charAt(x%consonants.length);
		case 2: return vowels.charAt(x%vowels.length);
		case 1: return numbers.charAt(x%numbers.length);
	}
	return x;
}

function pronunciable(x) {
	var y = "";
	for (i=0; i<x.length; i++) {
		y += pronunciableChar (x.charCodeAt(i+1), i, x.charCodeAt(i));
	}
	return y
}

function sumArray(x) {
	var r = 0;
	for (i=0;i<x.length;i++) {
		r += (r^x[i]);
	}
	return r;
}

function clearPass() {
	// window.scroll(0, 74);
	document.getElementById('pass').value = 
		document.getElementById('result').innerHTML = 
		document.getElementById('result2').innerHTML = "";
}

function generateRandomHash() {
	document.getElementById('pass').value = randomString();
	generateHash();
	document.getElementById('pass').value = "";
}

function E_(x) {
	return document.getElementById(x);
}

function generateHash() {
	var algo = E_('algorithm').innerHTML;
	var salt = E_('salt').value;
	var pass = E_('pass').value;
	var from = +E_('label_from').innerHTML;
	var lenn = +E_('length_label').innerHTML;
	var binmode = E_('binmode').checked;
	//var randpass = document.getElementById('randpass').getAttribute ('toggled') == "true";
	var copyclip = false; //document.getElementById('copyclip').getAttribute ('toggled') == "true";
	var pronunci = E_('pronunciable').checked;
	var variable = E_('variable').checked;
	var hash = salt + pass;
	//		if (randpass) { hash = salt+randomString() }
	if (pass == "") {
		E_('result').innerHTML = "";
		E_('result2').innerHTML = "";
		return false;
	}

	switch (algo) {
		case "crc32":
			result = crc32 (hash).toString(16);
			result += crc32 (result+hash).toString(16);
			result += crc32 (result+hash).toString(16);
			break;
		case "md5":
			result = MD5(hash);
			break;
		case "md5^2":
			result = MD5(hash);
			result = MD5(result+hash);
			break;
		case "sha1":
			result = Sha1.hash(hash);
			break;
		case "sha1^2":
			result = Sha1.hash(hash);
			result = Sha1.hash(result+hash);
			break;
		default:
			result = MD5(hash);
	}

	var foo = "";
	if (binmode) {
		function HexToBinArray(x) {
			x = x.match (/../g)
				for (i=0;i<x.length;i++) {
					x[i] = parseInt (x[i], 16)
				}
			return x
		}
		result = HexToBinArray (result)
			foo = Base64.encodeArray (result);
	} else {
		foo = Base64.encode(result);
	}
	foo = foo.replace(/[=Il10O]*/g, "");
	if (pronunci) {
		foo = pronunciable (foo);
	}
	if (variable) {
		from = sumArray(foo.match(/./g))%4;
		if (lenn>0) {
			foo = foo.substring(from, from+lenn);
		} else {
			lenn = 5+(sumArray(foo.match(/./g))%lenn);
			foo = foo.substring(from, from+lenn);
		}
	} else {
		foo = foo.substring(from, lenn?lenn:undefined);
	}
	if (copyclip) {
		copy_to_clipboard (foo)
			alert ("Password is now in clipboard!")
	} else {
		E_('result').innerHTML = foo;
		E_('result2').innerHTML = foo;
	}
}
