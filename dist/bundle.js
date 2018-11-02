/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	/*
	 * 获取dom对象或者dom集合
	 * @parems selector string 选择器
	 * @params [parent]DOMObject 父级对象
	 * @return DOMObject || DOMCollection
	 *
	 */
	$:function  (selector,parent) {
		parent=parent || document;

		switch (selector.charAt(0)){
			case "#":
				return parent.getElementById(selector.slice(1));
			case ".":
				return parent.getElementsByClassName(selector.slice(1));
			default:
				return parent.getElementsByTagName(selector);
		}
	},
	/*
	 * 获取内部或者外部样式
	 * @params obj DOMObject 获取样式的元素对象
	 * @params attr string 属性名称
	 * @return string值
	 */


	getStyle:function  (obj,attr) {
		/*if (obj.currentStyle) {
			return obj.currentStyle[attr];
		}
		return getComputedStyle(obj,false)[attr];*/
		return obj.currentStyle ?  obj.currentStyle[attr] :  getComputedStyle(obj,false)[attr];
	},


	showCenter: function  (obj) {
		var _this=this;//留住this
		obj.style.display="block";
		obj.style.position="absolute"
		//计算left和top
		function calc () {
			var left=(_this.getBody().width-obj.offsetWidth)/2;
			var top=(_this.getBody().height-obj.offsetHeight)/2;
			obj.style.left=left+"px";
			obj.style.top=top+"px";
		}
		calc();
		window.onresize=calc;
	},

	getBody: function  () {
		return{
			width:document.documentElement.clientWidth || document.body.clientWidth,
			height:document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	/*事件监听
	 * @params obj DOMObject 事件监听对象
	 * @params event string 事件句柄
	 * @params fn Function 事件处理函数
	 *
	 */
	on: function  (obj,event,fn) {
		if (obj.attachEven) {
			obj.attachEvent("on"+event,fn);
		} else{
			obj.addEventListener(event,fn,false);
		}
	},

		/*监听移除
		 *@params obj DOMObject 事件监听对象；
		 *@params event string 事件句柄
		 *@params fn Function 事件处理函数
		 */
		off: function  (obj,event,fn){
			if (obj.detachEvent) {
				obj.detachEvent("on"+event,fn);
			} else{
				obj.removeEventListener(event,fn);
			}
		},


		/*
		 实现cookie的创建，删除，获取
		 @params key string cookie名称（如果只传这一个参数，执行获取操作）
		 @params [value] string cookie值
		 @params [expires] string 定义过期时间和path
		 * */

		cookie:function  (key,value,expires) {
			//判断有无值
			if (value!==undefined) {
				//传了value，执行创建，修改或者删除（取决于expires里面包含的过期时间）
				//加密
				value=encodeURIComponent(value);
				if (expires!==undefined) {
					document.cookie=key+"="+value+";"+expires;
				} else{
					document.cookie=key+"="+value;
				}
			} else{
				//获取
				//取出所有
				var str=document.cookie;
				var obj={};
				var arr=str.split(";")
				for (var i in arr) {
					var item=arr[i].split("=");
					obj[item[0]]=item[1];
				}
				//有就直接返回，obj如果没有key，return undefind（加密之前）
				//return obj[key];

				if (obj[key]) {
					//解密
					return decodeURIComponent(obj[key]);
				} else{
					return undefined;
				}
			}
		},
		drag:function (obj,title) {
				//如果该对象有tittle,只能拖titlle,如果没有就是整个boj都可以拖；
				title = title || obj;
				//绑定事件监听；
				QFTools.on(title,"mousedown",function (e) {
					// IE兼容，获取鼠标到BOX边缘的距离；
					e = e || event;
					var _offsetX = e.offsetX;

					var _offsetY = e.offsetY;

					function move(e) {
						// 让BOX跟着鼠标移动
						e = e || event;

						//box的坐标根据鼠标的位置-鼠标距离盒子边缘的距离
					obj.style.left = e.clientX - _offsetX + "px";

					obj.style.top = e.clientY - _offsetY + "px";
					}

					QFTools.on(document,"mousemove",move);

					QFTools.on(document,"mouseup",function () {
						// 移除监听事件
						QFTools.off(document,"mousemove",move);
					})

					e.preventDefault();
				})
	},

	yunSu: function (obj,target,speed) {
		// 清除一次定时器；
		clearInterval(obj.timer);

		obj.timer=setInterval(function() {
			// body...
			obj.style.left = obj.offsetLeft + speed + "px";
			if (obj.offsetLeft >= target) {
				clearInterval(obj.timer);
				obj.style.left = target + "px";
			}

		},30)
	},

	yunSulaihui:function (obj,target,speed) {
		clearInterval(obj.timer);
			obj.timer=setInterval(function() {
				// body...
				obj.style.left = obj.offsetLeft + speed + "px";
				//剩下的距离小于速度的绝对值（一步的距离），到终点了
				if(Math.abs(target-obj.offsetLeft) < Math.abs(speed)){
					clearInterval(obj.timer);
					obj.style.left = target + "px";
				}
			},30);

	},

  ajax:function (method,url,param,fn,isJson=true) {
    //拼接参数字符串；
      var str ="";
    for(var key in param){
          str += key+ "="+param[key]+"&";
    }
        str = str.slice(0,-1);
        var ajax = new XMLHttpRequest();
        //根据不同的请求方式发送不同类型的请求；
          if (method.toUpperCase() === "GET") {
            //url后面拼接参数；
              ajax.open("GET",param? url+"?"+str : url);
              ajax.send(null);
          }else if(method.toUpperCase() === "POST"){
            //先open,再设置头；
              ajax.open("POST",url);
            ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //send参数字符串；
            ajax.send(param? str :null);
          }
          ajax.onreadystatechange = function () {
            if (ajax.readyState ===4 && ajax.status ===200){
              //是否转化为Json?
              var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
              fn(res);
            }
          }

  },

  getPosition: function(obj){
    var position = {
      left: 0,
      top: 0
    }
    //只要存在父级，那么就继续找
    while(obj.offsetParent){
      //进行累加
      position.top += obj.offsetTop;
      position.left += obj.offsetLeft;
      //层级往上增加一个，继续找父级的offsetParent
      obj = obj.offsetParent;
    }

    return position;
  },

  createDiv: function(className){
    var div = document.createElement("div");
    div.className = className;
    document.body.appendChild(div);
    return div;
  },


}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(2);
const QFTools = __webpack_require__(0);

//我方战机
module.exports = {
  //存所有的子弹;
  aBulltes:[],
  init:function(bodyMain){
    //Engine对象传递过来的bodyMain
    this.bodyMain = bodyMain;
    //创建战机DOM元素
    this.ele = QFTools.createDiv("my-warplain");
    //左右居中
    this.ele.style.left = (QFTools.getBody().width - this.ele.offsetWidth)/2 + "px";
    //垂直居底
    this.ele.style.top = QFTools.getBody().height - this.ele.offsetHeight + "px";
    this.move();
    //返回this是为了实现链式调用;
    return this;
  },
  move:function(){
    //飞机跟随鼠标移动
    QFTools.on(document.body,"mousemove",function(e){
      e = e || event;
      //飞机的中心点与鼠标重合方法
      this.ele.style.top = e. clientY - this.ele.offsetHeight/2 + "px";
      var _left = e.clientX - this.ele.offsetWidth/2;
      //判断左右边界;
      if (_left < this.bodyMain.offsetLeft) {
          _left =this.bodyMain.offsetLeft;
      }
      if (_left > this.bodyMain.offsetLeft  + this.bodyMain.offsetWidth - this.ele.offsetWidth) {
          _left = this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth;
      }
      this.ele.style.left = _left + "px";
    }.bind(this),false);
  },
  fire:function(diff){
    //创建子弹
    //创建子弹的时间间隔根据难度决定，难度值越小，代表游戏难度越大，时间间隔就越大;
    this.duration = 500/diff;
    setInterval(()=>{
      this.aBulltes.push(new Bullet().init(this));
      //创建实例，调用init，push到aBullets数组里
      /*var bull = new Bullet();
      bull.init(this.ele);
      this.aBulltes.push(bull);*/
    },this.duration);
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const myPlane = __webpack_require__(1);
const QFTools = __webpack_require__(0);
function Bullet(){
}

Bullet.prototype = {
  //改变整个原型指向的时候，要把constructor指回构造函数本身
    constructor: Bullet,
      init:function(plane){
        this.plane = plane;
        this.ele = QFTools.createDiv("bullet");
        //给子弹初始坐标
        this.ele.style.top = this.plane.ele.offsetTop - this.ele.offsetHeight + "px";
        this.ele.style.left = this.plane.ele.offsetLeft + this.plane.ele.offsetWidth/2 -this.ele.offsetWidth/2 + "px";
        this.move();
        return this;
      },
      move:function(){
        this.timer = setInterval(()=>{
          this.ele.style.top = this.ele.offsetTop - 20 +"px";
          //判断是否超出边界;
          if (this.ele.offsetTop < -40) {
              this.die();
          }
        },30);
      },
      die:function(){
        //document.body.removeChild(this.ele);
        clearInterval(this.timer);
        //执行爆炸的效果
        this.ele.className= "bullet_die";
        setTimeout(()=>{
          this.ele.className= "bullet_die2";
          setTimeout(()=>{
            //爆炸动画结束之后100毫秒再从DOM中移出元素
            document.body.removeChild(this.ele);
          },100);
        },100);
        //从aBullets数组里把当前子弹移出
        //注意！ 这一段放在定时器外面同步执行
        for (var i = 0; i < this.plane.aBulltes.length; i++) {
          //this 就是当前的子弹对象
          //查找this处于数组里面的第几个
          if (this === this.plane.aBulltes[i]) {
              this.plane.aBulltes.splice(i,1);
          }
        }
      }
}

module.exports = Bullet;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
const Engine = __webpack_require__(20);

window.onload = function(){
  new Engine();
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(5);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(18)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!./feiji.css", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!./feiji.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(6);
exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "*{margin:0; padding:0;}\r\nhtml,body{width:100%; height:100%; overflow: hidden;}\r\n.main{\r\n\tmargin: auto;\r\n\theight: 100%;\r\n\tbackground: url(" + escape(__webpack_require__(8)) + ") repeat-y;\r\n\tbackground-position-y: 0px;\r\n\twidth: 480px;\r\n}\r\n.options{\r\n\tposition: absolute;\r\n\tlist-style: none;\r\n\tmargin: auto;\r\n\tleft: 0; right: 0; top: 100px;\r\n\twidth: 200px;\r\n\theight: 300px;\r\n\r\n}\r\n.options li{\r\n\tborder-radius: 5px;\r\n\tbox-shadow: 0 0 2px 1px black;\r\n\tfloat: left;\r\n\twidth: 200px;\r\n\theight: 75px;\r\n\ttext-align: center;\r\n\tline-height: 75px;\r\n\tmargin-bottom: 20px;\r\n\tbackground: #f40;\r\n\tcolor: white;\r\n\tfont: \"\\5FAE\\8F6F\\96C5\\9ED1\";\r\n\tfont-size: 28px;\r\n\tcursor: pointer;\r\n}\r\n.logo{\r\n\tposition: absolute;\r\n\tleft: 0; right: 0; top: 25%;\r\n\tmargin: auto;\r\n\twidth: 428px; height: 104px;\r\n\tbackground: url(" + escape(__webpack_require__(9)) + ") no-repeat;\r\n}\r\n.loading{\r\n\tposition: absolute;\r\n\tleft: 0; right: 0; top: 60%;\r\n\tmargin: auto;\r\n\twidth: 192px; height: 41px;\r\n\tbackground: url(" + escape(__webpack_require__(10)) + ") no-repeat;\r\n}\r\n.my-warplain{\r\n\tposition: absolute;\r\n\twidth: 98px; height: 122px;\r\n\tbackground: url(" + escape(__webpack_require__(11)) + ") no-repeat;\r\n\tcursor: none;\r\n}\r\n.bullet{\r\n\tposition: absolute;\r\n\twidth: 7px; height: 18px;\r\n\tbackground: url(" + escape(__webpack_require__(12)) + ") no-repeat;\r\n}\r\n.bullet_die{\r\n\tposition: absolute;\r\n\twidth: 41px; height: 39px;\r\n\tbackground: url(" + escape(__webpack_require__(13)) + ") no-repeat;\r\n\tmargin-left: -18px;\r\n}\r\n.bullet_die2{\r\n\tposition: absolute;\r\n\twidth: 40px; height: 43px;\r\n\tbackground: url(" + escape(__webpack_require__(14)) + ") no-repeat;\r\n\tmargin-left: -18px;\r\n}\r\n.enemy-small{\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n\twidth: 59px; height: 36px;\r\n\tbackground: url(" + escape(__webpack_require__(15)) + ") no-repeat;\r\n}\r\n.enemy-middle{\r\n\tposition: absolute;\r\n\twidth: 70px; height: 92px;\r\n\tbackground: url(" + escape(__webpack_require__(16)) + ") no-repeat;\r\n}\r\n.enemy-large{\r\n\tposition: absolute;\r\n\twidth:165px; height: 256px;\r\n\tbackground: url(" + escape(__webpack_require__(17)) + ") no-repeat;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "./dist/img/bg.jpg";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "./dist/img/logo.png";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "./dist/img/loading1.png";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "./dist/img/me.png";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "./dist/img/bullet.png";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "./dist/img/die1.png";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "./dist/img/die2.png";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "./dist/img/plane1.png";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "./dist/img/plane2.png";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "./dist/img/plane3.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(19);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const myPlane = __webpack_require__(1);
const Enemy = __webpack_require__(21);
const QFTools = __webpack_require__(0);
function Engine(){
  this.init();
}
Engine.prototype.init = function(){
  var _this = this;
  //保存父级大盒子;
  this.bodyMain = QFTools.$("#body_main");
  //找到所有的点击难度的ul;
    this.options = QFTools.$("#options");
    //绑定点击事件,使用事件委派;
      this.options.onclick = function(e){
        e= e || event;
        var target = e.target || e.SrcElement;
        if (target.nodeName === "LI") {
          //获取难度
          _this.diff = target.value;
          //options要移出;
          _this.bodyMain.removeChild(_this.options);
          //进入开场动画;
          _this.startAnimation();
        }

      }
}
Engine.prototype.startAnimation = function(){
  //背景图 动起来
  var top = 0;
  setInterval(function(){
    top -= 10;
    this.bodyMain.style.backgroundPositionY = top +"px";

  }.bind(this),30);
  //创建logo
  var logo = QFTools.createDiv("logo");
  //小飞机放屁
  var loading = QFTools.createDiv("loading");
  var n = 0;
  var timer = setInterval(function(){
    n++;
    loading.style.background = "url(images/loading"+(n%3+1)+".png)";
    if (n>4) {
      //开场动画结束;
      clearInterval(timer);
      //移出loading 和logo;
      document.body.removeChild(loading);
      document.body.removeChild(logo);
      this.startGame();
    }
  }.bind(this),500);
}
Engine.prototype.startGame = function(){
  //创建敌机和战机
  myPlane.init(this.bodyMain).fire(this.diff);//链式操作;
  //创建敌机
	//40% 小敌机
	//20% 中敌机
	//5%  大敌机
	//35% 不出现敌机
	setInterval(()=>{
		var rand = Math.random().toFixed(2);
		if(rand < 0.4) new Enemy(1, this.bodyMain);
		else if(rand < 0.6) new Enemy(2, this.bodyMain);
		else if(rand < 0.65) new Enemy(3, this.bodyMain);
	},500);
}

module.exports = Engine;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const myPlane = __webpack_require__(1);
const Bullet = __webpack_require__(2);
const QFTools = __webpack_require__(0);
class Enemy{
  constructor(type,bodyMain){
    this.type =type;
    this.bodyMain = bodyMain;
    this.init();
      }
      init(){
        //type = 1  小敌机  speed =5  blood =1
        //type = 2 中敌机   speed =3  blood =5
        //type = 3 大敌机   speed =1  blood =10
        switch (this.type) {
          case 1:
            this.ele = QFTools.createDiv("enemy-small");
            this.speed = 5;
            this.blood = 1;
            break;
            case 2:
              this.ele = QFTools.createDiv("enemy-middle");
              this.speed = 3;
              this.blood = 5;
              break;
              case 3:
                this.ele = QFTools.createDiv("enemy-large");
                this.speed = 1;
                this.blood = 10;
                break;
              }
    //计算敌机的初始left值，在游戏区范围内随机生成
		var min = this.bodyMain.offsetLeft;
		var max = this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth;
		var _left = parseInt(Math.random()*(max-min))+min;
		//top值为刚好隐藏自己的位置 -height
		var _top = -this.ele.offsetHeight;
		this.ele.style.top = _top + "px";
		this.ele.style.left = _left + "px";
		this.move();
      }
      move(){
        this.timer = setInterval(()=>{
          //每个敌机根据自己的速度移动
          this.ele.style.top = this.ele.offsetTop + this.speed + "px";
          //判断移动边界
          if(this.ele.offsetTop > this.bodyMain.offsetHeight) this.die();
          //判断敌机跟我方战机的碰撞
          //myPlane.ele  this.ele
          var mLeft = myPlane.ele.offsetLeft,
              mRight = mLeft + myPlane.ele.offsetWidth,
              mTop = myPlane.ele.offsetTop,
              mBottom = mTop + myPlane.ele.offsetHeight,
              eLeft = this.ele.offsetLeft,
              eRight = eLeft + this.ele.offsetWidth,
              eTop = this.ele.offsetTop,
              eBottom = eTop + this.ele.offsetHeight;
          if (!(eBottom < mTop || mRight < eLeft || mBottom < eTop || eRight < mLeft)) {
              //碰撞不到的条件取反，即敌机和战机撞上了
              if (confirm("啊哦，撞上了，继续吗？")) {
                //页面重新加载，游戏重新开始
                  window.location.reload(true);
              }
          }
          //检测敌机跟所有子弹的碰撞
          for (var i = 0; i < myPlane.aBulltes.length; i++) {
            var bLeft = myPlane.aBulltes[i].ele.offsetLeft,
    					bRight = bLeft + myPlane.aBulltes[i].ele.offsetWidth,
    					bTop = myPlane.aBulltes[i].ele.offsetTop,
    					bBottom = bTop + myPlane.aBulltes[i].ele.offsetHeight;
              if (!(eBottom < bTop || bRight < eLeft || bBottom < eTop || eRight < bLeft)){
                  //敌机跟子弹碰撞了
                  myPlane.aBulltes[i].die();
                  //如果血量到0，敌机死亡
                  if (--this.blood === 0) {
                    this.die();
                  }
              }
          }
        },30);
      }
      die(){
      document.body.removeChild(this.ele);
        clearInterval(this.timer);
  }
}
module.exports = Enemy;


/***/ })
/******/ ]);