(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ce3a49a"],{"1da1":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("d3b7");function r(e,t,a,r,n,s,c){try{var i=e[s](c),o=i.value}catch(u){return void a(u)}i.done?t(o):Promise.resolve(o).then(r,n)}function n(e){return function(){var t=this,a=arguments;return new Promise((function(n,s){var c=e.apply(t,a);function i(e){r(c,n,s,i,o,"next",e)}function o(e){r(c,n,s,i,o,"throw",e)}i(void 0)}))}}},a8cb:function(e,t,a){"use strict";var r=a("f152"),n=a.n(r);n.a},d4db:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h4",{staticClass:"mb-6"},[e._v("Services Orders List")]),a("div",{staticClass:"emb-card pa-4"},[a("services-invoices")],1)])},n=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-responsive"},[a("v-data-table",{attrs:{headers:e.headers,items:e.invoiceData,"items-per-page":15,search:e.search,align:"center"},scopedSlots:e._u([{key:"item.paid",fn:function(t){var r=t.item;return[a("v-btn",{staticClass:"primary",attrs:{small:"",tile:"",elevation:"0"},on:{click:function(t){return e.changePaidStatus(r,r.id)}}},[e._v(e._s(r.paid))])]}},{key:"item.action",fn:function(t){var r=t.item;return[a("v-select",{staticClass:"text-xs-sm",attrs:{items:e.Departments,dense:""},on:{change:function(t){return e.updateService(r.id,r.status)}},model:{value:r.status,callback:function(t){e.$set(r,"status",t)},expression:"item.status"}})]}}])}),a("emb-delete-confirmation-2",{ref:"deleteConfirmationDialog",attrs:{messageTitle:"Are You Sure You Want To Delete?",messageDescription:"Are you sure you want to delete this invoice permanently?",btn1:"Cancel",btn2:"Yes"},on:{onConfirm:e.ondeleteItemFromInvoicesList}})],1)},c=[],i=(a("4160"),a("b0c0"),a("159b"),a("96cf"),a("1da1")),o=a("5530"),u=a("365c"),l={getServicesOrders:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(u["a"])().get("/api/services-orders"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))()},updateserviceOrder:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=Object(u["a"])().put("/api/services-orders/".concat(t),e),a.abrupt("return",r);case 2:case"end":return a.stop()}}),a)})))()},updatePayment:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=Object(u["a"])().post("/api/services-orders/".concat(t,"/paid-cash"),e),a.abrupt("return",r);case 2:case"end":return a.stop()}}),a)})))()}},d=a("c1df"),p=a.n(d),v=a("2f62"),m={computed:Object(o["a"])({},Object(v["b"])(["linksformbackend"])),props:{search:{default:null,type:String}},data:function(){return{Departments:["SENT","RECEIVED","CANCELED","TECHNICIAN-ON-THE-WAY","TECHNICIAN-AT-SITE","JOB-DONE"],editDialog:!1,invoiceList:null,headers:[{text:"Date",sortable:!1,value:"date"},{text:"First Name",sortable:!1,value:"firstName"},{text:"Last Name",sortable:!1,value:"lastName"},{text:"Email",sortable:!1,value:"email"},{text:"Address",sortable:!1,value:"address"},{text:"Paid",sortable:!1,value:"paid"},{text:"Services",sortable:!1,value:"services"},{text:"Status",sortable:!1,value:"action"}],selectDeletedItem:null,invoiceData:[],selectProduts:[],pictures:"",name:"",total:""}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,l.getServicesOrders();case 3:a=t.sent,console.log(a),a.data.data.forEach((function(t){var a=p()(t.updatedAt),r=p()(t.updatedAt),n=r.format("LT"),s=a.format("L"),c=n+" "+s;e.invoiceData.push({id:t._id,date:c,firstName:t.firstName,lastName:t.lastName,paid:t.paid,email:t.email,address:t.address,services:t.service.name.en,status:t.status})})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},methods:{updateService:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,l.updateserviceOrder({status:t},e);case 3:n=r.sent,a.$snotify.success("".concat(n.data.message),{closeOnClick:!1,pauseOnHover:!1,timeout:3e3,showProgressBar:!1}),r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),console.log(r.t0.message);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},changePaidStatus:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,console.log(e),!0===e.paid?e.paid=!1:e.paid=!0,r.next=5,l.updatePayment({paid:e.paid},t);case 5:n=r.sent,a.$snotify.success("".concat(n.data.message),{closeOnClick:!1,pauseOnHover:!1,timeout:3e3,showProgressBar:!1}),r.next=12;break;case 9:r.prev=9,r.t0=r["catch"](0),console.log(r.t0.message);case 12:case"end":return r.stop()}}),r,null,[[0,9]])})))()}}},f=m,b=(a("a8cb"),a("2877")),h=Object(b["a"])(f,s,c,!1,null,"1aa29499",null),g=h.exports,w={data:function(){return{search:""}},components:{servicesInvoices:g}},x=w,O=Object(b["a"])(x,r,n,!1,null,null,null);t["default"]=O.exports},f152:function(e,t,a){}}]);
//# sourceMappingURL=chunk-1ce3a49a.4cdab7d6.js.map