(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-524a8e2b"],{"16fe":function(t,e,a){"use strict";a("1ec5")},"1ec5":function(t,e,a){},adeb:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order-history-wrap emb-card pa-4"},[a("h4",{staticClass:"mb-4"},[t._v(t._s(t.$t("message.OrderHistory")))]),"English"===t.selectedLocale.name?a("v-data-table",{attrs:{headers:t.headers,items:t.tableData,"items-per-page":t.tableData.length,"hide-default-footer":""},scopedSlots:t._u([{key:"item.action",fn:function(e){var s=e.item;return[a("v-btn",{attrs:{icon:"",href:"javascript:void(0)"},on:{click:function(e){return t.selectedOrder(s)}}},[a("v-icon",{staticClass:"accent--text"},[t._v("remove_red_eye")])],1),a("v-btn",{staticClass:"primary",attrs:{small:"",elevation:"0",tile:""},on:{click:function(e){return t.openLogs(s.logs)}}},[t._v(t._s(t.$t("message.TrackOrder")))])]}}],null,!1,3564175373)}):t._e(),"French"===t.selectedLocale.name?a("v-data-table",{attrs:{headers:t.headersfr,items:t.tableData,"items-per-page":t.tableData.length,"hide-default-footer":""},scopedSlots:t._u([{key:"item.action",fn:function(e){var s=e.item;return[a("v-btn",{attrs:{icon:"",href:"javascript:void(0)"},on:{click:function(e){return t.selectedOrder(s)}}},[a("v-icon",{staticClass:"accent--text"},[t._v("remove_red_eye")])],1),a("v-btn",{staticClass:"primary",attrs:{small:"",elevation:"0",tile:""},on:{click:function(e){return t.openLogs(s.logs)}}},[t._v(t._s(t.$t("message.TrackOrder")))])]}}],null,!1,3564175373)}):t._e(),a("v-dialog",{staticClass:"pa-2",attrs:{"max-width":"685px"},model:{value:t.editDialog,callback:function(e){t.editDialog=e},expression:"editDialog"}},[a("v-card",{staticClass:"emb-FinalReceipt-wrap"},[a("v-card-text",{staticClass:"pa-4 mb-3"},[a("v-flex",{attrs:{xs12:""}},[a("div",{staticClass:"text-center bg-grey px-4 py-6"},[a("h4",[t._v(t._s(t.$t("message.Orderdetails")))])]),a("div",{staticClass:"mt-12 mx-4"},[a("v-layout",{attrs:{row:"",wrap:"","mb-10":"","mx-0":"","mt-0":""}},[a("v-flex",{attrs:{xs12:"",sm6:"",md6:"",lg6:"",xl6:"","text-left":"","pa-0":""}}),a("v-flex",{attrs:{xs12:"",sm8:"",md8:"",lg8:"",xl8:"","text-left":"","pa-0":""}},[a("h6",[t._v(t._s(t.$t("message.DeliverTo")))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.fristName)+" "+t._s(t.lastName))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.city)+", "+t._s(t.street))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.phone))])])],1),a("h4",{staticClass:"pt-12 mb-7 text-sm-left text-center"},[t._v("You ordered:")]),a("div",{attrs:{id:"producr"}},[a("div",{attrs:{id:"tittle"}},[a("div",[a("h6",[t._v(" "+t._s(t.$t("message.ProductImage")))])]),a("div",[a("h6",[t._v(t._s(t.$t("message.ProductName")))])]),a("div",[a("h6",[t._v(t._s(t.$t("message.Quantity")))])]),a("div",[a("h6",[t._v(t._s(t.$t("message.Price")))])])]),t._l(t.selectProduts,(function(e){return a("div",{key:e,attrs:{id:"products"}},[a("div",[a("img",{attrs:{width:"100",src:e.pictures,alt:""}})]),a("p",{staticClass:"font-weight-bold"},[t._v(t._s(e.name))]),a("div",[a("p",[t._v(t._s(e.quantity))])]),a("div",[a("emb-currency-sign"),t._v(t._s((e.price/t.currentValue).toFixed(2)))],1)])}))],2),a("v-divider",{staticClass:"my-6"}),a("div",{staticClass:"pt-6"},[a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("p",[t._v(t._s(t.$t("message.Subtotal")))]),a("span",[a("emb-currency-sign"),t._v(t._s((t.total/t.currentValue).toFixed(2)))],1)]),a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("p",[t._v(t._s(t.$t("message.Delivery")))]),a("span",[a("emb-currency-sign"),t._v("0")],1)]),a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("p",[t._v(t._s(t.$t("message.Tax")))]),a("span",[a("emb-currency-sign"),t._v("0")],1)]),a("v-divider",{staticClass:"my-4"}),a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("h4",[t._v(t._s(t.$t("message.Total")))]),a("h4",[a("emb-currency-sign"),t._v(t._s((t.total/t.currentValue).toFixed(2)))],1)])],1)],1)]),a("div",{staticClass:"selectedPayemnt"},[a("v-btn",{staticClass:"mr-5 primary",on:{click:function(e){t.editDialog=!1}}},[t._v(t._s(t.$t("Close")))]),a("v-btn",{staticClass:"accent",on:{click:function(e){return t.payymentmethods()}}},[t._v(t._s(t.$t("message.payment")))])],1)],1)],1)],1),a("v-dialog",{attrs:{"max-width":"800"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[a("v-card",{staticClass:"py-6 px-2 "},["English"===t.selectedLocale.name?a("v-data-table",{attrs:{headers:t.logHeader,items:t.logs,"items-per-page":t.tableData.length,"hide-default-footer":""}}):t._e(),"French"===t.selectedLocale.name?a("v-data-table",{attrs:{headers:t.logHeaderfr,items:t.logs,"items-per-page":t.tableData.length,"hide-default-footer":""}}):t._e(),a("v-card-actions",{staticClass:"layout justify-center"},[a("v-btn",{attrs:{color:"accent mx-2"},on:{click:function(e){t.open=!1}}},[t._v(t._s(t.$t("Close")))])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"800"},model:{value:t.paymentway,callback:function(e){t.paymentway=e},expression:"paymentway"}},[a("v-card",{staticClass:"py-6 px-2 "},["English"===t.selectedLocale.name?a("v-data-table",{attrs:{headers:t.payment,items:t.paymentArray,"items-per-page":t.tableData.length,"hide-default-footer":""}}):t._e(),"French"===t.selectedLocale.name?a("v-data-table",{attrs:{headers:t.paymentfr,items:t.paymentArray,"items-per-page":t.tableData.length,"hide-default-footer":""}}):t._e(),a("v-card-actions",{staticClass:"layout justify-center"},[a("v-btn",{attrs:{color:"primary mx-2"},on:{click:function(e){t.paymentway=!1}}},[t._v(t._s(t.$t("Close")))])],1)],1)],1)],1)},r=[],n=a("5530"),o=a("1da1"),c=(a("96cf"),a("159b"),a("b0c0"),a("365c")),i={myRentalOrder:function(){return Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=Object(c["a"])().get("/api/rental-orders/my-orders"),t.abrupt("return",e);case 2:case"end":return t.stop()}}),t)})))()},myProductsOrder:function(){return Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=Object(c["a"])().get("/api/orders/my-orders"),t.abrupt("return",e);case 2:case"end":return t.stop()}}),t)})))()}},l=a("c1df"),u=a.n(l),m=a("b9a9"),d=a("2f62"),p={data:function(){return{headers:[{text:"Time",value:"date"},{text:"Total amount",value:"totalAmountExpected"},{text:"Total amount Paid",value:"totalAmountPaid"},{text:"delivery",value:"delivery"},{text:"Status",value:"status"},{text:"Action",value:"action"}],headersfr:[{text:"Temps",value:"date"},{text:"Montant total",value:"totalAmountExpected"},{text:"Montant total payé",value:"totalAmountPaid"},{text:"livraison",value:"delivery"},{text:"statut",value:"status"},{text:"action",value:"action"}],logHeader:[{text:"Time",value:"time"},{text:"Action",value:"action"},{text:"Comment",value:"comment"},{text:"Name",value:"name"}],logHeaderfr:[{text:"Temps",value:"time"},{text:"Commentaire",value:"comment"},{text:"Action",value:"action"},{text:"Nom",value:"name"}],payment:[{text:"Time",value:"time"},{text:"Method",value:"method"},{text:"Amount",value:"amount"}],paymentfr:[{text:"Temps",value:"time"},{text:"méthode",value:"method"},{text:"montant",value:"amount"}],tableData:[],editDialog:!1,selectProduts:[],selectedProBef:[],product:[],fristName:"",lastName:"",city:"",street:"",total:0,open:!1,logs:[],currentValue:1,paymentway:!1,paymentArray:[],paymentLogs:[],realProduct:[]}},methods:{openLogs:function(t){var e=this;this.logs=[],console.log(t),t.forEach((function(t){var a=u()(t.createdAt),s=u()(t.createdAt),r=s.format("LT"),n=a.format("L"),o=r+" "+n;e.logs.push({time:o,action:t.action,comment:t.comment,name:t.name})})),this.open=!0},payymentmethods:function(){var t=this;console.log(this.paymentLogs),this.paymentArray=[],this.paymentLogs.forEach((function(e){var a=u()(e.time),s=u()(e.time),r=s.format("LT"),n=a.format("L"),o=r+" "+n;t.paymentArray.push({time:o,amount:e.amount,method:e.method})})),this.paymentway=!0},selectedOrder:function(t){var e=this;console.log(t),this.paymentLogs=t.paymentLogs,this.logs=t.logs,this.fristName=t.firstName,this.lastName=t.lastName,this.city=t.address,this.street=t.details,this.selectProduts=[],this.total=0,"French"===this.selectedLocale?t.product.forEach((function(a){e.selectProduts.push({pictures:"http://localhost:4000/"+a.pictures.pic1,price:a.price,name:a.name.fr,logs:t.logs}),e.total=e.total+a.price})):t.product.forEach((function(a){e.selectProduts.push({pictures:"http://localhost:4000/"+a.pictures.pic1,price:a.price,name:a.name.en,logs:t.logs,quantity:a.quantity}),e.total=e.total+a.price})),this.editDialog=!0,console.log(this.selectProduts)}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.myRentalOrder();case 3:return a=e.sent,e.next=6,i.myProductsOrder();case 6:return s=e.sent,console.log(a),console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",s),e.next=11,m["a"].getcurrency();case 11:r=e.sent,r.data.data.forEach((function(e){e.symbol===t.selectedCurrency.symbol&&(t.symbol=!0,t.currentValue=e.currentValue)})),a.data.data.forEach((function(e){console.log(e);var a=u()(e.createdAt),s=u()(e.createdAt),r=s.format("LT"),n=a.format("L"),o=r+" "+n;t.product[0]=e.rental,t.tableData.push({date:o,firstName:e.firstName,lastName:e.lastName,logs:e.logs,totalAmountPaid:e.totalAmountPaid,totalAmountExpected:e.totalAmountExpected,paymentLogs:e.paymentLogs,status:e.status.status,product:t.product})})),s.data.data.forEach((function(e){console.log(e),t.realProduct=[];var a=u()(e.createdAt),s=u()(e.createdAt),r=s.format("LT"),n=a.format("L"),o=r+" "+n;e.products.forEach((function(e){t.realProduct.push({pictures:e._id.pictures,price:e._id.price,name:e._id.name,logs:e.logs,quantity:e.quantity})})),t.tableData.push({date:o,MoMoPhoneNumber:e.MoMoPhoneNumber,agentCode:e.agentCode,cancelReason:e.cancelReason,city:e.city,email:e.email,firstName:e.firstName,lastName:e.lastName,logs:e.logs,status:e.status.status,details:e.streetNumber,totalAmountExpected:e.totalAmmount,totalAmountPaid:e.totalAmountPaid,delivery:e.delivery,product:t.realProduct,paymentLogs:e.paymentLogs})})),e.next=20;break;case 17:e.prev=17,e.t0=e["catch"](0),console.log(e.t0.response.message);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})))()},computed:Object(n["a"])({},Object(d["b"])(["selectedCurrency","selectedLocale"]))},v=p,g=(a("16fe"),a("2877")),h=Object(g["a"])(v,s,r,!1,null,"1993e98e",null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-524a8e2b.04889941.js.map