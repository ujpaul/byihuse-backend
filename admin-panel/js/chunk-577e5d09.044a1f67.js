(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-577e5d09"],{"1da1":function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));r("d3b7");function n(e,t,r,n,c,a,u){try{var s=e[a](u),o=s.value}catch(i){return void r(i)}s.done?t(o):Promise.resolve(o).then(n,c)}function c(e){return function(){var t=this,r=arguments;return new Promise((function(c,a){var u=e.apply(t,r);function s(e){n(u,c,a,s,o,"next",e)}function o(e){n(u,c,a,s,o,"throw",e)}s(void 0)}))}}},9890:function(e,t,r){"use strict";var n=r("bc80"),c=r.n(n);c.a},b9a9:function(e,t,r){"use strict";r("96cf");var n=r("1da1"),c=r("365c");t["a"]={PostCurrency:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["a"])().post("/api/currencies",e);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}}),t)})))()},updatecurrency:function(e,t){return Object(n["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(c["a"])().post("/api/currencies/".concat(t),e);case 2:return n=r.sent,r.abrupt("return",n);case 4:case"end":return r.stop()}}),r)})))()},getcurrency:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["a"])().get("/api/currencies");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))()}}},bc80:function(e,t,r){},d29b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"emb-product-add"},[r("v-row",[r("v-col",{staticClass:"mx-auto",attrs:{cols:"12",sm:"9",md:"10",lg:"10"}},[r("v-row",[r("v-col",{staticClass:"content-wrap pl-md-6 emb-card",attrs:{cols:"12",sm:"12",md:"6",lg:"6"}},[r("a",{staticClass:"pt-4 d-block font-weight-medium"},[e._v("set currency equivalency ")]),r("div",{staticClass:"setCurency"},[r("div",{staticClass:"ml-5"},[r("v-text-field",{staticClass:"price-input",attrs:{"prepend-icon":"add",placeholder:"Equivalent To $1"},model:{value:e.USD,callback:function(t){e.USD=t},expression:"USD"}})],1)]),r("v-btn",{staticClass:"mx-3 mt-10",attrs:{color:"accent",large:""},on:{click:e.updateCurrency}},[e._v("Add Currency")])],1)],1)],1)],1)],1)},c=[],a=(r("4160"),r("159b"),r("96cf"),r("1da1")),u=r("b9a9"),s={data:function(){return{USD:"",currencyName:"",symbol:""}},methods:{updateCurrency:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r,n,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=e.USD,n=e.$route.params.currency,console.log(n),t.next=6,u["a"].updatecurrency(r,n);case 6:c=t.sent,console.log(c),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})))()}},mounted:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,console.log(e.$route.params.currency),t.next=4,u["a"].getcurrency();case 4:r=t.sent,r.data.data.forEach((function(t){t._id===e.$route.params.currency&&(e.USD=t.currentValue)})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}},o=s,i=(r("9890"),r("2877")),l=Object(i["a"])(o,n,c,!1,null,"4091f1b0",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-577e5d09.044a1f67.js.map