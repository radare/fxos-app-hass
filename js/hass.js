function E_(x) {
	return document.getElementById(x);
}

function setAlgorithm() {
	var x = E_ ("algo_options");
	E_ ("algo").innerHTML = x.options[x.selectedIndex].value;
}
function setFrom() {
	var x = E_ ("from_options");
	E_ ("from").innerHTML = x.options[x.selectedIndex].value;
}
function setLength() {
	var x = E_ ("length_options");
	E_ ("length").innerHTML = x.options[x.selectedIndex].value;
}

function initHass() {
	getCookie();
	E_('clearPass').onclick = clearPass;
	E_('pass').onclick = clearPass;
	E_('pass').onkeyup = generateHash;
	E_('pass').onchange = generateHash;
	E_('menuItem-showRandom').onclick = showRandom;
	E_('algo_options').onchange = setAlgorithm;
	E_('from_options').onchange = setFrom;
	E_('length_options').onchange = setLength;
	E_('saveButton').href = '#save';
	E_('generateButton').onclick = function() {
		generateRandomHash();
		return false;
	}
	handleGestures ();
}

window.onload = initHass;

function set(x,y) {
	var algo = E_(x);
	algo.value = y;
	for (var i=0; i<algo.length; i++) {
		if (algo[i].value == y)
			algo[i].selected = true;
	}
}

function getCookie() {
	var c = localStorage? localStorage.getItem ('cookie'): document.cookie;
	if (!c) return;
	var ca = c.split(';');
	var ca = ca[0].split(',');
	for (var i=0;i<ca.length; i++) {
		var kv = ca[i].split('=');
		if (kv[1].charAt(0)=='.') {
			var b = E_(kv[0]);
			if (b) b.checked = (kv[1] == ".true");
		} else {
			set (kv[0], kv[1]);
		}
	}
	setFrom();
	setLength();
	setAlgorithm();
}

function get(x) {
	// TODO: filter ,;=
	var v = E_(x);
	if (!v) {
		alert ("unknown "+x);
		return undefined;
	}
	v = v.value? v.value: v.innerHTML;
	if (v.indexOf (",") != -1 || v.indexOf (";")!=-1 || v.indexOf ("=") != -1) {
		alert ("Invalid chars in "+x+" string ,;=");
		v = v.replace (/[,;=]*/g,"");
		E_(x).value = v;
	}
	return v;
}

function getb(x) {
	var b = E_(x);
	if (b) return "."+b.checked; //getAttribute('toggled')=="true");
	return ".false";
}

function setCookie() {
	var cookie =
		"salt="+get("salt")+","+
		"from_options="+get("from_options")+","+
		"length_options="+get("length_options")+","+
		"algo_options="+get("algo_options")+","+
		"dark="+getb("dark")+","+
		"binmode="+getb("binmode")+","+
		"pronunciable="+getb("pronunciable")+","+
		"variable="+getb("variable")
		;
	if (localStorage)
		localStorage.setItem ("cookie", cookie);
	else document.cookie = cookie;
	history.go(-1);
	window.location.reload()
}

/* doesnt works and it's insecure */
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
	return ''+Math.random()*0xfffffff;
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
	for (var i=0; i<x.length; i++)
		y += pronunciableChar (x.charCodeAt(i+1), i, x.charCodeAt(i));
	return y
}

function sumArray(x) {
	var r = 0;
	for (var i=0; i<x.length; i++)
		r += (r^x[i].charCodeAt());
	return r;
}

function clearPass() {
	E_('pass').value =
	E_('result').innerHTML =
	E_('result2').innerHTML = '';
}

function generateRandomHash() {
	var pass = E_('pass');
	pass.value = randomString ();
	generateHash ();
	pass.value = '';
}

function generateHash() {
	var algo = E_('algo').innerHTML;
	var salt = E_('salt').value;
	var pass = E_('pass').value;
	var from = +E_('from').innerHTML;
	var lenn = +E_('length').innerHTML;
	var binmode = E_('binmode').checked;
	//var randpass = document.getElementById('randpass').getAttribute ('toggled') == "true";
	var copyclip = false; //document.getElementById('copyclip').getAttribute ('toggled') == "true";
	var pronunci = E_('pronunciable').checked;
	var variable = E_('variable').checked;
	var hash = salt + pass;
	//		if (randpass) { hash = salt+randomString() }
	if (pass == "") {
		clearPass ();
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
		case "sha1(md5)":
			result = MD5(hash);
			result = Sha1.hash(result+hash);
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
			x = x.match (/../g);
			for (var i=0;i<x.length;i++)
				x[i] = parseInt (x[i], 16)
			return x
		}
		result = HexToBinArray (result)
			foo = Base64.encodeArray (result);
	} else {
		foo = Base64.encode(result);
	}
	foo = foo.replace(/[=Il10O]*/g, "");
	if (pronunci)
		foo = pronunciable (foo);
	if (variable) {
		const m = 4;
		var sum = sumArray (foo.match (/./g))%m;
		if (sum>m) {
			foo = foo.substring (from, from+sum);
		} else {
			lenn = 5+(sumArray (foo.match(/./g))%(lenn-m));
			foo = foo.substring (from, from+lenn);
		}
	} else {
		foo = foo.substring (from, lenn? lenn: undefined);
	}
	if (copyclip) {
		copy_to_clipboard (foo);
		alert ("Password is now in clipboard!")
	} else {
		E_('result').innerHTML = foo;
		E_('result2').innerHTML = foo;
		E_('result2').style.visibility = "visible";
	}
}

function showRandom() {
	var about = document.getElementById ('result2');
	about.style.visibility = 'hidden';
}
