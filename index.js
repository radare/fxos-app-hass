var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encodeArray:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;while(i<input.length){chr1=input[i++];chr2=input[i++];chr3=input[i++];enc1=chr1>>2;enc2=(chr1&3)<<4|chr2>>4;enc3=(chr2&15)<<2|chr3>>6;enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=(chr1&3)<<4|chr2>>4;enc3=(chr2&15)<<2|chr3>>6;enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if(c>191&&c<224){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode((c&31)<<6|c2&63);i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode((c&15)<<12|(c2&63)<<6|c3&63);i+=3}}return string}};function crc32(str){function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext}str=Utf8Encode(str);var table="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";if(typeof crc=="undefined"){crc=0}var x=0;var y=0;crc=crc^-1;for(var i=0,iTop=str.length;i<iTop;i++){y=(crc^str.charCodeAt(i))&255;x="0x"+table.substr(y*9,8);crc=crc>>>8^x}return crc^-1}function E_(x){return document.getElementById(x)}function setAlgorithm(){var x=E_("algo_options");E_("algo").innerHTML=x.options[x.selectedIndex].value}function setFrom(){var x=E_("from_options");E_("from").innerHTML=x.options[x.selectedIndex].value}function setLength(){var x=E_("length_options");E_("length").innerHTML=x.options[x.selectedIndex].value}function initHass(){getCookie();E_("clearPass").onclick=clearPass;E_("pass").onclick=clearPass;E_("pass").onkeyup=generateHash;E_("pass").onchange=generateHash;E_("menuItem-showRandom").onclick=showRandom;E_("algo_options").onchange=setAlgorithm;E_("from_options").onchange=setFrom;E_("length_options").onchange=setLength;E_("saveButton").href="#save";E_("generateButton").onclick=function(){generateRandomHash();return false}}window.onload=initHass;function set(x,y){var algo=E_(x);algo.value=y;for(var i=0;i<algo.length;i++){if(algo[i].value==y)algo[i].selected=true}}function getCookie(){var c=localStorage?localStorage.getItem("cookie"):document.cookie;if(!c)return;var ca=c.split(";");var ca=ca[0].split(",");for(var i=0;i<ca.length;i++){var kv=ca[i].split("=");if(kv[1].charAt(0)=="."){var b=E_(kv[0]);if(b)b.checked=kv[1]==".true"}else{set(kv[0],kv[1])}}setFrom();setLength();setAlgorithm()}function get(x){var v=E_(x);if(!v){alert("unknown "+x);return undefined}v=v.value?v.value:v.innerHTML;if(v.indexOf(",")!=-1||v.indexOf(";")!=-1||v.indexOf("=")!=-1){alert("Invalid chars in "+x+" string ,;=");v=v.replace(/[,;=]*/g,"");E_(x).value=v}return v}function getb(x){var b=E_(x);if(b)return"."+b.checked;return".false"}function setCookie(){var cookie="salt="+get("salt")+","+"from_options="+get("from_options")+","+"length_options="+get("length_options")+","+"algo_options="+get("algo_options")+","+"dark="+getb("dark")+","+"binmode="+getb("binmode")+","+"pronunciable="+getb("pronunciable")+","+"variable="+getb("variable");if(localStorage)localStorage.setItem("cookie",cookie);else document.cookie=cookie;history.go(-1);window.location.reload()}function copy_to_clipboard(text){if(window.clipboardData){window.clipboardData.setData("text",text)}else{var clipboarddiv=document.getElementById("divclipboardswf");if(!clipboarddiv){clipboarddiv=document.createElement("div");clipboarddiv.setAttribute("name","divclipboardswf");clipboarddiv.setAttribute("id","divclipboardswf");document.body.appendChild(clipboarddiv)}clipboarddiv.innerHTML='<embed src="clipboard.swf" FlashVars="clipboard='+encodeURIComponent(text)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>'}}function randomString(){return""+Math.random()*268435455}function pronunciableChar(o,i,x){var vowels="aeiouAE";var consonants="cdfgmnprswxy"+"CDFGLMNPRTWXY";var numbers="34689";if(x%2==0){i=1}else{if(i==0&&x%3==0)i=1}x^=o+i;switch((x+i)%3){case 0:return consonants.charAt(x%consonants.length);case 2:return vowels.charAt(x%vowels.length);case 1:return numbers.charAt(x%numbers.length)}return x}function pronunciable(x){var y="";for(var i=0;i<x.length;i++)y+=pronunciableChar(x.charCodeAt(i+1),i,x.charCodeAt(i));return y}function sumArray(x){var r=0;for(var i=0;i<x.length;i++)r+=r^x[i].charCodeAt();return r}function clearPass(){E_("pass").value=E_("result").innerHTML=E_("result2").innerHTML=""}function generateRandomHash(){var pass=E_("pass");pass.value=randomString();generateHash();pass.value=""}function generateHash(){var algo=E_("algo").innerHTML;var salt=E_("salt").value;var pass=E_("pass").value;var from=+E_("from").innerHTML;var lenn=+E_("length").innerHTML;var binmode=E_("binmode").checked;var copyclip=false;var pronunci=E_("pronunciable").checked;var variable=E_("variable").checked;var hash=salt+pass;if(pass==""){clearPass();return false}switch(algo){case"crc32":result=crc32(hash).toString(16);result+=crc32(result+hash).toString(16);result+=crc32(result+hash).toString(16);break;case"md5":result=MD5(hash);break;case"md5^2":result=MD5(hash);result=MD5(result+hash);break;case"sha1":result=Sha1.hash(hash);break;case"sha1(md5)":result=MD5(hash);result=Sha1.hash(result+hash);break;case"sha1^2":result=Sha1.hash(hash);result=Sha1.hash(result+hash);break;default:result=MD5(hash)}var foo="";if(binmode){function HexToBinArray(x){x=x.match(/../g);for(var i=0;i<x.length;i++)x[i]=parseInt(x[i],16);return x}result=HexToBinArray(result);foo=Base64.encodeArray(result)}else{foo=Base64.encode(result)}foo=foo.replace(/[=Il10O]*/g,"");if(pronunci)foo=pronunciable(foo);if(variable){const m=4;var sum=sumArray(foo.match(/./g))%m;if(sum>m){foo=foo.substring(from,from+sum)}else{lenn=5+sumArray(foo.match(/./g))%(lenn-m);foo=foo.substring(from,from+lenn)}}else{foo=foo.substring(from,lenn?lenn:undefined)}if(copyclip){copy_to_clipboard(foo);alert("Password is now in clipboard!")}else{E_("result").innerHTML=foo;E_("result2").innerHTML=foo;E_("result2").style.visibility="visible"}}var MD5=function(string){function RotateLeft(lValue,iShiftBits){return lValue<<iShiftBits|lValue>>>32-iShiftBits}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=lX&2147483648;lY8=lY&2147483648;lX4=lX&1073741824;lY4=lY&1073741824;lResult=(lX&1073741823)+(lY&1073741823);if(lX4&lY4){return lResult^2147483648^lX8^lY8}if(lX4|lY4){if(lResult&1073741824){return lResult^3221225472^lX8^lY8}else{return lResult^1073741824^lX8^lY8}}else{return lResult^lX8^lY8}}function F(x,y,z){return x&y|~x&z}function G(x,y,z){return x&z|y&~z}function H(x,y,z){return x^y^z}function I(x,y,z){return y^(x|~z)}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-lNumberOfWords_temp1%64)/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-lByteCount%4)/4;lBytePosition=lByteCount%4*8;lWordArray[lWordCount]=lWordArray[lWordCount]|string.charCodeAt(lByteCount)<<lBytePosition;lByteCount++}lWordCount=(lByteCount-lByteCount%4)/4;lBytePosition=lByteCount%4*8;lWordArray[lWordCount]=lWordArray[lWordCount]|128<<lBytePosition;lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray}function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=lValue>>>lCount*8&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext}var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,3614090360);d=FF(d,a,b,c,x[k+1],S12,3905402710);c=FF(c,d,a,b,x[k+2],S13,606105819);b=FF(b,c,d,a,x[k+3],S14,3250441966);a=FF(a,b,c,d,x[k+4],S11,4118548399);d=FF(d,a,b,c,x[k+5],S12,1200080426);c=FF(c,d,a,b,x[k+6],S13,2821735955);b=FF(b,c,d,a,x[k+7],S14,4249261313);a=FF(a,b,c,d,x[k+8],S11,1770035416);d=FF(d,a,b,c,x[k+9],S12,2336552879);c=FF(c,d,a,b,x[k+10],S13,4294925233);b=FF(b,c,d,a,x[k+11],S14,2304563134);a=FF(a,b,c,d,x[k+12],S11,1804603682);d=FF(d,a,b,c,x[k+13],S12,4254626195);c=FF(c,d,a,b,x[k+14],S13,2792965006);b=FF(b,c,d,a,x[k+15],S14,1236535329);a=GG(a,b,c,d,x[k+1],S21,4129170786);d=GG(d,a,b,c,x[k+6],S22,3225465664);c=GG(c,d,a,b,x[k+11],S23,643717713);b=GG(b,c,d,a,x[k+0],S24,3921069994);a=GG(a,b,c,d,x[k+5],S21,3593408605);d=GG(d,a,b,c,x[k+10],S22,38016083);c=GG(c,d,a,b,x[k+15],S23,3634488961);b=GG(b,c,d,a,x[k+4],S24,3889429448);a=GG(a,b,c,d,x[k+9],S21,568446438);d=GG(d,a,b,c,x[k+14],S22,3275163606);c=GG(c,d,a,b,x[k+3],S23,4107603335);b=GG(b,c,d,a,x[k+8],S24,1163531501);a=GG(a,b,c,d,x[k+13],S21,2850285829);d=GG(d,a,b,c,x[k+2],S22,4243563512);c=GG(c,d,a,b,x[k+7],S23,1735328473);b=GG(b,c,d,a,x[k+12],S24,2368359562);a=HH(a,b,c,d,x[k+5],S31,4294588738);d=HH(d,a,b,c,x[k+8],S32,2272392833);c=HH(c,d,a,b,x[k+11],S33,1839030562);b=HH(b,c,d,a,x[k+14],S34,4259657740);a=HH(a,b,c,d,x[k+1],S31,2763975236);d=HH(d,a,b,c,x[k+4],S32,1272893353);c=HH(c,d,a,b,x[k+7],S33,4139469664);b=HH(b,c,d,a,x[k+10],S34,3200236656);a=HH(a,b,c,d,x[k+13],S31,681279174);d=HH(d,a,b,c,x[k+0],S32,3936430074);c=HH(c,d,a,b,x[k+3],S33,3572445317);b=HH(b,c,d,a,x[k+6],S34,76029189);a=HH(a,b,c,d,x[k+9],S31,3654602809);d=HH(d,a,b,c,x[k+12],S32,3873151461);c=HH(c,d,a,b,x[k+15],S33,530742520);b=HH(b,c,d,a,x[k+2],S34,3299628645);a=II(a,b,c,d,x[k+0],S41,4096336452);d=II(d,a,b,c,x[k+7],S42,1126891415);c=II(c,d,a,b,x[k+14],S43,2878612391);b=II(b,c,d,a,x[k+5],S44,4237533241);a=II(a,b,c,d,x[k+12],S41,1700485571);d=II(d,a,b,c,x[k+3],S42,2399980690);c=II(c,d,a,b,x[k+10],S43,4293915773);b=II(b,c,d,a,x[k+1],S44,2240044497);a=II(a,b,c,d,x[k+8],S41,1873313359);d=II(d,a,b,c,x[k+15],S42,4264355552);c=II(c,d,a,b,x[k+6],S43,2734768916);b=II(b,c,d,a,x[k+13],S44,1309151649);a=II(a,b,c,d,x[k+4],S41,4149444226);d=II(d,a,b,c,x[k+11],S42,3174756917);c=II(c,d,a,b,x[k+2],S43,718787259);b=II(b,c,d,a,x[k+9],S44,3951481745);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()};"use strict";var Settings={get mozSettings(){var settings=window.navigator.mozSettings;return settings&&typeof settings.createLock=="function"?settings:null},preInit:function settings_preInit(){var settings=this.mozSettings;if(!settings)return;this.getSettings(null);settings.onsettingchange=function settingChanged(event){var key=event.settingName;var value=event.settingValue;if(this._settingsCache){this._settingsCache[key]=value}if(!this._initialized){return}var rule='[data-name="'+key+'"]:not([data-ignore])';var spanField=document.querySelector(rule);if(spanField){var options=document.querySelector('select[data-setting="'+key+'"]');if(options){var max=options.length;for(var i=0;i<max;i++){if(options[i]&&options[i].value===value){spanField.dataset.l10nId=options[i].dataset.l10nId;spanField.textContent=options[i].textContent}}}else{spanField.textContent=value}}var input=document.querySelector('input[name="'+key+'"]');if(!input)return;switch(input.dataset.type||input.type){case"checkbox":case"switch":if(input.checked==value)return;input.checked=value;break;case"range":if(input.value==value)return;input.value=value;if(input.refresh){input.refresh()}break;case"select":for(var i=0;i<input.options.length;i++){if(input.options[i].value==value){input.options[i].selected=true;break}}break}}.bind(this)},_initialized:false,init:function settings_init(){this._initialized=true;if(!this.mozSettings||!navigator.mozSetMessageHandler){return}navigator.mozSetMessageHandler("activity",this.webActivityHandler);this.presetPanel()},loadPanel:function settings_loadPanel(panel){if(!panel)return;for(var i=0;i<panel.childNodes.length;i++){if(panel.childNodes[i].nodeType==document.COMMENT_NODE){panel.innerHTML=panel.childNodes[i].nodeValue;break}}navigator.mozL10n.translate(panel);var scripts=panel.querySelectorAll("script");for(var i=0;i<scripts.length;i++){var src=scripts[i].getAttribute("src");if(document.head.querySelector('script[src="'+src+'"]')){continue}var script=document.createElement("script");script.type="application/javascript";script.src=src;document.head.appendChild(script)}var stylesheets=panel.querySelectorAll("link");for(var i=0;i<stylesheets.length;i++){var href=stylesheets[i].getAttribute("href");if(document.head.querySelector('link[href="'+href+'"]'))continue;var stylesheet=document.createElement("link");stylesheet.type="text/css";stylesheet.rel="stylesheet";stylesheet.href=href;document.head.appendChild(stylesheet)}var self=this;var rule='a[href^="http"], a[href^="tel"], [data-href]';var links=panel.querySelectorAll(rule);for(i=0;i<links.length;i++){var link=links[i];if(!link.dataset.href){link.dataset.href=link.href;link.href="#"}if(!link.dataset.href.startsWith("#")){link.onclick=function(){openLink(this.dataset.href);return false}}else if(!link.dataset.href.endsWith("Settings")){link.onclick=function(){openDialog(this.dataset.href.substr(1));return false}}else{link.onclick=function(){self.openDialog(this.dataset.href.substr(1));return false}}}},_settingsCache:null,get settingsCache(){return this._settingsCache},_settingsCacheRequestSent:false,_pendingSettingsCallbacks:[],getSettings:function(callback){var settings=this.mozSettings;if(!settings)return;if(this._settingsCache&&callback){callback(this._settingsCache);return}if(!this._settingsCacheRequestSent&&!this._settingsCache){this._settingsCacheRequestSent=true;var lock=settings.createLock();var request=lock.get("*");request.onsuccess=function(e){var result=request.result;var cachedResult={};for(var attr in result){cachedResult[attr]=result[attr]}Settings._settingsCache=cachedResult;var cbk;while(cbk=Settings._pendingSettingsCallbacks.pop()){cbk(result)}}}if(callback){this._pendingSettingsCallbacks.push(callback)}},presetPanel:function settings_presetPanel(panel){this.getSettings(function(result){panel=panel||document;var rule='input[type="checkbox"]:not([data-ignore])';var checkboxes=panel.querySelectorAll(rule);for(var i=0;i<checkboxes.length;i++){var key=checkboxes[i].name;if(key&&result[key]!=undefined){checkboxes[i].checked=!!result[key]}}setTimeout(function(){for(var i=0;i<checkboxes.length;i++){if(checkboxes[i].classList.contains("initial")){checkboxes[i].classList.remove("initial")}}},0);rule='input[type="radio"]:not([data-ignore])';var radios=panel.querySelectorAll(rule);for(i=0;i<radios.length;i++){var key=radios[i].name;if(key&&result[key]!=undefined){radios[i].checked=result[key]===radios[i].value}}rule='input[type="text"]:not([data-ignore])';var texts=panel.querySelectorAll(rule);for(i=0;i<texts.length;i++){var key=texts[i].name;if(key&&result[key]!=undefined){texts[i].value=result[key]}}rule='input[type="range"]:not([data-ignore])';var ranges=panel.querySelectorAll(rule);for(i=0;i<ranges.length;i++){var key=ranges[i].name;if(key&&result[key]!=undefined){ranges[i].value=parseFloat(result[key]);if(ranges[i].refresh){ranges[i].refresh()}}}var fakeSelector=function(select){var parent=select.parentElement;var button=select.previousElementSibling;var index=select.selectedIndex;if(index>=0){var selection=select.options[index];button.textContent=selection.textContent;button.dataset.l10nId=selection.dataset.l10nId}if(parent.classList.contains("fake-select")){select.addEventListener("change",function(){var newSelection=this.options[this.selectedIndex];button.textContent=newSelection.textContent;button.dataset.l10nId=newSelection.dataset.l10nId})}};var selects=panel.querySelectorAll("select");for(var i=0,count=selects.length;i<count;i++){var select=selects[i];var key=select.name;if(key&&result[key]!=undefined){var value=result[key];var option='option[value="'+value+'"]';var selectOption=select.querySelector(option);if(selectOption){selectOption.selected=true}}fakeSelector(select)}rule="[data-name]:not([data-ignore])";var spanFields=panel.querySelectorAll(rule);for(i=0;i<spanFields.length;i++){var key=spanFields[i].dataset.name;if(key&&result[key]!=undefined){rule='[data-setting="'+key+'"] '+'[value="'+result[key]+'"]';var option=document.querySelector(rule);if(option){spanFields[i].dataset.l10nId=option.dataset.l10nId;spanFields[i].textContent=option.textContent}else{spanFields[i].textContent=result[key]}}}})},webActivityHandler:function settings_handleActivity(activityRequest){var name=activityRequest.source.name;switch(name){case"configure":var section=activityRequest.source.data.section||"root";var sectionElement=document.getElementById(section);if(!sectionElement||sectionElement.tagName!=="SECTION"){var msg="Trying to open an unexistent section: "+section;console.warn(msg);activityRequest.postError(msg);return}setTimeout(function settings_goToSection(){document.location.hash=section});break}},handleEvent:function settings_handleEvent(event){var input=event.target;var type=input.dataset.type||input.type;var key=input.name;var settings=window.navigator.mozSettings;if(!key||!settings||event.type!="change")return;if(input.dataset.setting)return;var value;switch(type){case"checkbox":case"switch":value=input.checked;break;case"range":value=parseFloat(input.value).toFixed(1);break;case"select-one":case"radio":case"text":case"password":value=input.value;if(input.dataset.valueType==="integer")value=parseInt(value);break}var cset={};cset[key]=value;settings.createLock().set(cset)},openDialog:function settings_openDialog(dialogID){var settings=this.mozSettings;var dialog=document.getElementById(dialogID);var fields=dialog.querySelectorAll("[data-setting]:not([data-ignore])");function reset(){if(settings){var lock=settings.createLock();for(var i=0;i<fields.length;i++){!function(input){var key=input.dataset.setting;var request=lock.get(key);request.onsuccess=function(){switch(input.type){case"radio":input.checked=input.value==request.result[key];break;case"checkbox":input.checked=request.result[key]||false;break;default:input.value=request.result[key]||"";break}}}(fields[i])}}}function submit(){if(settings){fields=dialog.querySelectorAll("[data-setting]:not([data-ignore])");var lock=settings.createLock();for(var i=0;i<fields.length;i++){var input=fields[i];var cset={};var key=input.dataset.setting;switch(input.type){case"radio":if(input.checked)cset[key]=input.value;break;case"checkbox":cset[key]=input.checked;break;default:cset[key]=input.value;break}lock.set(cset)}}}reset();openDialog(dialogID,submit)},getSupportedLanguages:function settings_getLanguages(callback){var LANGUAGES="shared/resources/languages.json";if(this._languages){callback(this._languages)}else{var self=this;var xhr=new XMLHttpRequest;xhr.onreadystatechange=function loadSupportedLocales(){if(xhr.readyState===4){if(xhr.status===0||xhr.status===200){self._languages=xhr.response;callback(self._languages)}else{console.error("Failed to fetch languages.json: ",xhr.statusText)}}};xhr.open("GET",LANGUAGES,true);xhr.responseType="json";xhr.send()}},updateLanguagePanel:function settings_updateLanguagePanel(){var panel=document.getElementById("languages");if(panel){var d=new Date;var f=new navigator.mozL10n.DateTimeFormat;var _=navigator.mozL10n.get;panel.querySelector("#region-date").textContent=f.localeFormat(d,_("longDateFormat"));panel.querySelector("#region-time").textContent=f.localeFormat(d,_("shortTimeFormat"))}}};window.addEventListener("load",function loadSettings(){window.removeEventListener("load",loadSettings);window.addEventListener("change",Settings);Settings.init();function lazyLoad(panel){if(panel.children.length)return;var selector='section[id^="'+panel.id+'-"]';var subPanels=document.querySelectorAll(selector);for(var i=0;i<subPanels.length;i++){Settings.loadPanel(subPanels[i])}Settings.loadPanel(panel);for(var i=0;i<subPanels.length;i++){Settings.presetPanel(subPanels[i])}Settings.presetPanel(panel)}var oldHash=window.location.hash||"#root";function showPanel(){var hash=window.location.hash;switch(hash){case"#save":setCookie();return;case"#random":generateRandomHash();break}var oldPanel=document.querySelector(oldHash);var newPanel=document.querySelector(hash);oldPanel.className=newPanel.className?"peek":"peek previous forward";newPanel.className=newPanel.className?"current peek":"peek current forward";oldHash=hash;if(window.scrollX!==0||window.scrollY!==0){window.scrollTo(0,0)}window.addEventListener("transitionend",function paintWait(){window.removeEventListener("transitionend",paintWait);clearPass();setTimeout(function nextTick(){oldPanel.classList.remove("peek");oldPanel.classList.remove("forward");newPanel.classList.remove("peek");newPanel.classList.remove("forward");if(oldPanel.className==="current")return;oldPanel.addEventListener("transitionend",function onTransitionEnd(){E_("pass").value=E_("result").innerHTML=E_("result2").innerHTML="";clearPass();oldPanel.removeEventListener("transitionend",onTransitionEnd);switch(newPanel.id){case"about-licensing":var iframe=document.getElementById("os-license");iframe.src=iframe.dataset.src;break;case"wifi":PerformanceTestingHelper.dispatch("settings-panel-wifi-visible");break}})})})}window.addEventListener("hashchange",showPanel);switch(window.location.hash){case"#root":break;case"":document.location.hash="root";break;default:E_("root").className="previous";showPanel();break}});window.addEventListener("localized",function showLanguages(){document.documentElement.lang=navigator.mozL10n.language.code;document.documentElement.dir=navigator.mozL10n.language.direction;Settings.updateLanguagePanel()});Settings.preInit();var Sha1={};Sha1.hash=function(msg,utf8encode){utf8encode=typeof utf8encode=="undefined"?true:utf8encode;if(utf8encode)msg=Utf8.encode(msg);var K=[1518500249,1859775393,2400959708,3395469782];msg+=String.fromCharCode(128);var l=msg.length/4+2;var N=Math.ceil(l/16);var M=new Array(N);for(var i=0;i<N;i++){M[i]=new Array(16);for(var j=0;j<16;j++){M[i][j]=msg.charCodeAt(i*64+j*4)<<24|msg.charCodeAt(i*64+j*4+1)<<16|msg.charCodeAt(i*64+j*4+2)<<8|msg.charCodeAt(i*64+j*4+3)}}M[N-1][14]=(msg.length-1)*8/Math.pow(2,32);M[N-1][14]=Math.floor(M[N-1][14]);M[N-1][15]=(msg.length-1)*8&4294967295;var H0=1732584193;var H1=4023233417;var H2=2562383102;var H3=271733878;var H4=3285377520;var W=new Array(80);var a,b,c,d,e;for(var i=0;i<N;i++){for(var t=0;t<16;t++)W[t]=M[i][t];for(var t=16;t<80;t++)W[t]=Sha1.ROTL(W[t-3]^W[t-8]^W[t-14]^W[t-16],1);a=H0;b=H1;c=H2;d=H3;e=H4;for(var t=0;t<80;t++){var s=Math.floor(t/20);var T=Sha1.ROTL(a,5)+Sha1.f(s,b,c,d)+e+K[s]+W[t]&4294967295;e=d;d=c;c=Sha1.ROTL(b,30);b=a;a=T}H0=H0+a&4294967295;H1=H1+b&4294967295;H2=H2+c&4294967295;H3=H3+d&4294967295;H4=H4+e&4294967295}return Sha1.toHexStr(H0)+Sha1.toHexStr(H1)+Sha1.toHexStr(H2)+Sha1.toHexStr(H3)+Sha1.toHexStr(H4)};Sha1.f=function(s,x,y,z){switch(s){case 0:return x&y^~x&z;case 1:return x^y^z;case 2:return x&y^x&z^y&z;case 3:return x^y^z}};Sha1.ROTL=function(x,n){return x<<n|x>>>32-n};Sha1.toHexStr=function(n){var s="",v;for(var i=7;i>=0;i--){v=n>>>i*4&15;s+=v.toString(16)}return s};var Utf8={};Utf8.encode=function(strUni){var strUtf=strUni.replace(/[\u0080-\u07ff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(192|cc>>6,128|cc&63)});strUtf=strUtf.replace(/[\u0800-\uffff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(224|cc>>12,128|cc>>6&63,128|cc&63)});return strUtf};Utf8.decode=function(strUtf){var strUni=strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){var cc=(c.charCodeAt(0)&15)<<12|(c.charCodeAt(1)&63)<<6|c.charCodeAt(2)&63;return String.fromCharCode(cc)});strUni=strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){var cc=(c.charCodeAt(0)&31)<<6|c.charCodeAt(1)&63;return String.fromCharCode(cc)});return strUni};