(function() {
const project = "hass";
const manifest_url = "http://"+project+".ffos.lolcathost.org/manifest.webapp";

function install() {
	var myapp = navigator.mozApps.install(manifest_url);
	myapp.onsuccess = function(data) {
		this.parentNode.removeChild(this);
	};
	myapp.onerror = function() {
		alert (this.error.name);
	};
};

var request = navigator.mozApps.checkInstalled (manifest_url);
request.onsuccess = function() {
	if (!request.result)
		install ();
};
request.onerror = function() {
	alert('Error checking installation status: ' + this.error.message);
};
})();
