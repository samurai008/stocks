(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(module,__webpack_exports__,__webpack_require__){"use strict";var _Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6),_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(4),_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(7),events__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(10),events__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_5__),_dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5),StockPriceStore=function(_EventEmitter){function StockPriceStore(){var e;return Object(_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a)(this,StockPriceStore),(e=Object(_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__.a)(this,Object(_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__.a)(StockPriceStore).call(this))).stockDict={},e}return Object(_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__.a)(StockPriceStore,_EventEmitter),Object(_Users_Nilabjo_react_apps_my_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a)(StockPriceStore,[{key:"reloadStocks",value:function reloadStocks(data){var _this2=this,stockData=eval(data);stockData.forEach(function(e){var t=null;e=e.concat((new Date).toString()),_this2.stockDict[e[0]]&&(t=_this2.stockDict[e[0]].price<e[1]),_this2.stockDict[e[0]]={name:e[0],price:e[1],time:e[2],base:t}}),this.emit("stockChange")}},{key:"handleActions",value:function(e){switch(e.type){case"RELOAD_STOCKS":this.reloadStocks(e.stocks)}}},{key:"getAll",value:function(){return this.stockDict}}]),StockPriceStore}(events__WEBPACK_IMPORTED_MODULE_5__.EventEmitter),stockPriceStore=new StockPriceStore;_dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_6__.a.register(stockPriceStore.handleActions.bind(stockPriceStore)),__webpack_exports__.a=stockPriceStore},12:function(e,t,_){e.exports=_(25)},18:function(e,t,_){},21:function(e,t,_){},25:function(e,t,_){"use strict";_.r(t);var a=_(0),r=_.n(a),s=_(9),n=_.n(s),c=(_(18),_(2)),o=_(3),i=_(6),l=_(4),u=_(7),m=(_(21),_(1)),p=_(5);var E;window.closeConnection=function(){return E.close()};var h=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(l.a)(t).call(this))).state={stocks:m.a.getAll(),sortFn:function(){}},console.log(Object.keys(e.state.stocks).length),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"openConnection",value:function(){E=new WebSocket("ws://stocks.mnet.website",{rejectUnauthorized:!1}),this.getStockPrices()}},{key:"closeConnection",value:function(){E.close()}},{key:"getStockPrices",value:function(){E.onmessage=function(e){var t;t=e.data,p.a.dispatch({type:"RELOAD_STOCKS",stocks:t})}}},{key:"sortByName",value:function(e,t){return e<t?-1:e>t?1:0}},{key:"sortByPrice",value:function(e,t){return this[t].price-this[e].price}},{key:"sortByTime",value:function(e,t){return Date.parse(this[e].time)-Date.parse(this[t].time)>0?-1:Date.parse(this[e].time)-Date.parse(this[e].time)<0?1:0}},{key:"createStockTable",value:function(e){return Object.keys(e).sort(this.state.sortFn.bind(e)).map(function(t,_){return r.a.createElement("tr",{"data-key":_,key:_,className:e[t].base?"bg-success text-white":null===e[t].base?"text-dark":"bg-danger text-white"},r.a.createElement("td",{className:"text-center"},e[t].name),r.a.createElement("td",{className:"text-center"},e[t].price.toFixed(2)),r.a.createElement("td",{className:"text-center"},e[t].time.slice(0,24)))})}},{key:"componentWillMount",value:function(){var e=this;m.a.on("stockChange",function(){console.log("New batch of stocks!",m.a.getAll()),e.setState({stocks:m.a.getAll()})})}},{key:"render",value:function(){var e=this,t=this.createStockTable(this.state.stocks),_=r.a.createElement("tr",null,r.a.createElement("td",{className:"text-center text-info",colSpan:"3"},"Click open to load stream."));return r.a.createElement("div",null,r.a.createElement("div",{className:"container p-2"},r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("div",null,r.a.createElement("a",{href:"#",onClick:this.openConnection.bind(this)},"Open Stream")),r.a.createElement("div",null,r.a.createElement("a",{href:"#",onClick:this.closeConnection.bind(this)},"Close Stream"))),r.a.createElement("table",{className:"table mt-2"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"text-center"},r.a.createElement("a",{href:"#",onClick:function(t){return e.setState({sortFn:e.sortByName})}},"Name")),r.a.createElement("th",{className:"text-center"},r.a.createElement("a",{href:"#",onClick:function(t){return e.setState({sortFn:e.sortByPrice})}},"Price")),r.a.createElement("th",{className:"text-center"},r.a.createElement("a",{href:"#",onClick:function(t){return e.setState({sortFn:e.sortByTime})}},"Last Updated")))),r.a.createElement("tbody",null,0===Object.keys(this.state.stocks).length?_:t))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},5:function(e,t,_){"use strict";var a=_(11);t.a=new a.Dispatcher}},[[12,2,1]]]);
//# sourceMappingURL=main.48f9d7fc.chunk.js.map