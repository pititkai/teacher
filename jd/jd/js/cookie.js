
/*
 * 用于设置cookie
 * 参数：
 * name是键名
 * value是键值
 * expires是日期时间（cookie的生效时间）
 * path是路径
 * domain是域名，也就是网址前缀
 * secure是安全设置
 */
function setCookie(name,value,expires,path,domain,secure){
	var cookieStr="";
	if(name && value){
		cookieStr=cookieStr+encodeURIComponent(name)+"="+encodeURIComponent(value);
	}
	if(expires instanceof Date){
		cookieStr += ";expires="+expires;
	}
	if(path){
		cookieStr += ";path="+path;
	}
	if(domain){
		cookieStr += ";domain="+domain;
	}
	if(secure){
		cookieStr += ";"+secure;
	}
	document.cookie=cookieStr;
	return decodeURIComponent(cookieStr);
}


/*
 * 用于获取cookie中的数据
 * 参数：
 * name为键名，数据名称
 */
function getCookie(name){
	var cookieStr=decodeURIComponent(document.cookie);
	var cookieArr=cookieStr.split("; ");
	for (var i=0;i<cookieArr.length;i++) {
		var arr=cookieArr[i].split("=");
		if (arr.length>=2) {
			if (arr[0]==name) {
				return arr[1];
			}
		}
	}
	return null;
}


/*
 * 用于删除cookie
 * 参数：
 * name是键名，数据名称
 */
function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "= ;expires=" + new Date();
}

