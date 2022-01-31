(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7343c19a"],{"1da1":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("d3b7");function s(t,e,a,s,n,i,r){try{var o=t[i](r),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(s,n)}function n(t){return function(){var e=this,a=arguments;return new Promise((function(n,i){var r=t.apply(e,a);function o(t){s(r,n,i,o,c,"next",t)}function c(t){s(r,n,i,o,c,"throw",t)}o(void 0)}))}}},"2ebd":function(t,e,a){},"32f0":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h4",{staticClass:"mb-6"},[t._v("Orders List")]),a("div",{staticClass:"emb-card pa-4"},[a("invoice")],1)])},n=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-responsive"},[a("v-data-table",{attrs:{headers:t.headers,items:t.invoiceData,"items-per-page":15,search:t.search,align:"center"},scopedSlots:t._u([{key:"item.paid",fn:function(t){t.item}},{key:"item.status",fn:function(t){t.item}},{key:"item.action",fn:function(e){var s=e.item;return[a("v-btn",{staticClass:"primary",attrs:{small:"",tile:"",elevation:"0"},on:{click:function(e){return t.updateService(s.status,s.invoiceId)}}},[t._v("update status")]),a("v-btn",{staticClass:"primary ml-2",attrs:{small:"",tile:"",elevation:"0"},on:{click:function(e){return t.openPaidStatus(s.paid,s.invoiceId)}}},[t._v("client paid")]),a("v-btn",{staticClass:"mr-3",attrs:{slot:"activator",text:"",icon:"",color:"grey",small:""},on:{click:function(e){return t.openDialog(s)}},slot:"activator"},[a("v-icon",{staticClass:"primary--text"},[t._v("remove_red_eye")])],1)]}}])}),a("v-dialog",{attrs:{"max-width":"900"},model:{value:t.openLogs,callback:function(e){t.openLogs=e},expression:"openLogs"}},[a("v-card",{staticClass:"py-6 px-4"},[a("v-data-table",{attrs:{headers:t.logsHeader,items:t.logsData,"items-per-page":15,align:"center"}}),a("div",{staticClass:"layout align-center justify-center ma-0 my-6"},[a("v-btn",{staticClass:"accent",on:{click:function(e){t.openLogs=!1}}},[t._v("Close")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"600"},model:{value:t.openPaymentList,callback:function(e){t.openPaymentList=e},expression:"openPaymentList"}},[a("v-card",{staticClass:"py-6 px-4"},[a("v-data-table",{attrs:{headers:t.paymentlogsHeader,items:t.paymentPresData,"items-per-page":15,align:"center"}}),a("div",{staticClass:"layout align-center justify-center ma-0 my-6"},[a("v-btn",{staticClass:"accent",on:{click:function(e){t.openPaymentList=!1}}},[t._v("Close")])],1)],1)],1),a("v-dialog",{staticClass:"pa-2",attrs:{"max-width":"685px"},model:{value:t.editDialog,callback:function(e){t.editDialog=e},expression:"editDialog"}},[a("v-card",{staticClass:"emb-FinalReceipt-wrap"},[a("v-card-text",{staticClass:"pa-4"},[a("v-flex",{attrs:{xs12:""}},[a("div",{staticClass:"text-center bg-grey px-4 py-6"},[a("h4",[t._v("Payment Status")]),a("h6",{staticClass:"mb-6"},[t._v("Invoice ID:"+t._s(t.selectProdutsId))]),a("img",{attrs:{src:"/static/images/checked.png",width:"64",height:"64",alt:"Success"}})]),a("div",{staticClass:"mt-12 mx-4"},[a("v-layout",{attrs:{row:"",wrap:"","mb-10":"","mx-0":"","mt-0":""}},[a("v-flex",{attrs:{xs12:"",sm6:"",md6:"",lg6:"",xl6:"","text-left":"","pa-0":""}},[a("h6",[t._v("Ordered by")]),a("div",{staticClass:"mb-1"},[t._v(t._s(t.fristName))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.lastName))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.email))])]),a("v-flex",{attrs:{xs12:"",sm6:"",md6:"",lg6:"",xl6:"","text-left":"","pa-0":""}},[a("h6",[t._v("Address")]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.city))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.phone))]),a("p",{staticClass:"mb-1"},[t._v(t._s(t.street))])])],1),a("div",{staticClass:"py-6 text-center bg-grey"},[a("h4",[t._v("Expected Date of Delivery")]),a("h3",[t._v("6 hours")])]),a("h4",{staticClass:"pt-12 mb-7 text-sm-left text-center"},[t._v("Your Ordered Details")]),a("div",{attrs:{id:"producr"}},[a("div",{attrs:{id:"tittle"}},[a("div",[a("h6",[t._v(" Product Image")])]),a("div",[a("h6",[t._v("Product Name")])]),a("div",[a("h6",[t._v("Quantity")])]),a("div",[a("h6",[t._v("Price")])])]),t._l(t.selectProduts,(function(e){return a("div",{key:e,attrs:{id:"products"}},[a("div",[a("img",{attrs:{width:"100",src:e.pictures,alt:""}})]),a("p",{staticClass:"font-weight-bold"},[t._v(t._s(e.name))]),a("div",[a("p",[t._v(t._s(e.quantity))])]),a("div",[t._v("RWF"+t._s(e.price))])])}))],2),a("v-divider",{staticClass:"my-6"}),a("div",{staticClass:"pt-6"},[a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("p",[t._v("Subtotal")]),a("span",[t._v("RWF"+t._s(t.total))])]),a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("p",[t._v("Delivery")]),a("span",[t._v("RWF 0")])]),a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("p",[t._v("Tax(GST)")]),a("span",[t._v("RWF0")])]),a("v-divider",{staticClass:"my-4"}),a("div",{staticClass:"layout align-center justify-space-between ma-0"},[a("h4",[t._v("Total")]),a("h4",[t._v("RWF"+t._s(t.total))])])],1),a("div",{staticClass:"layout align-center justify-center ma-0 my-6"},[a("v-btn",{staticClass:"accent",on:{click:t.paymentList}},[t._v("Payment Logs")])],1),a("div",{staticClass:"layout align-center justify-center ma-0 my-6"},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.editDialog=!1}}},[t._v("CLose")]),a("v-btn",{staticClass:"ml-2",attrs:{color:"accent"},on:{click:function(e){return t.checkLogs()}}},[t._v("Track order")])],1)],1)])],1)],1)],1),a("emb-delete-confirmation-2",{ref:"deleteConfirmationDialog",attrs:{messageTitle:"Are You Sure You Want To Delete?",messageDescription:"Are you sure you want to delete this invoice permanently?",btn1:"Cancel",btn2:"Yes"},on:{onConfirm:t.ondeleteItemFromInvoicesList}}),a("v-dialog",{attrs:{"max-width":"400"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("v-card",{staticClass:"py-6 px-4"},[a("div",{staticClass:"input"},[a("v-text-field",{attrs:{label:"RWF Amount",id:"input",solo:""},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1),a("v-card-actions",{staticClass:"layout justify-center"},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.status=!1}}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"accent"},on:{click:t.changePaidStatus}},[t._v("Save")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"400"},model:{value:t.realstatus,callback:function(e){t.realstatus=e},expression:"realstatus"}},[a("v-card",{staticClass:"py-6 px-4"},[a("div",{staticClass:"paidStatus mb-4"},[a("v-select",{staticClass:"text-xs-sm",attrs:{items:t.Departments,dense:""},model:{value:t.selectedStatus,callback:function(e){t.selectedStatus=e},expression:"selectedStatus"}}),a("v-textarea",{attrs:{cols:"3",label:"Add comment"},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}})],1),a("v-card-actions",{staticClass:"layout justify-center"},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.realstatus=!1}}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"accent"},on:{click:t.changeRealStatus}},[t._v("save")])],1)],1)],1)],1)},r=[],o=(a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),a("96cf"),a("1da1")),c=a("5530"),l=a("365c"),u={getAllOders:function(){return Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["a"])().get("/api/orders");case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})))()},updatePayment:function(t,e){return Object(o["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(l["a"])().put("/api/orders/".concat(t,"/paid-cash"),e);case 2:return s=a.sent,a.abrupt("return",s);case 4:case"end":return a.stop()}}),a)})))()},updatestatus:function(t,e){return Object(o["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(l["a"])().put("/api/orders/".concat(e),t);case 2:return s=a.sent,a.abrupt("return",s);case 4:case"end":return a.stop()}}),a)})))()}},m=a("c1df"),d=a.n(m),v=a("2f62"),p={computed:Object(c["a"])({},Object(v["b"])(["linksformbackend"])),props:{search:{default:null,type:String}},data:function(){return{Departments:["SENT","RECEIVED","CANCELED","DELIVERY-START","DELIVERY-RECEIVED","ORDER-SERVED-AND-CLOSED"],editDialog:!1,invoiceList:null,headers:[{text:"Date",sortable:!1,value:"date"},{text:"First Name",sortable:!1,value:"firstName"},{text:"Methods",sortable:!1,value:"paymentOption"},{text:"Total Amount",sortable:!1,value:"total"},{text:"Total Amount Paid",sortable:!1,value:"totalAmountPaid"},{text:"Delivery",sortable:!1,value:"delivery"},{text:"Status",sortable:!1,value:"statushesd"},{text:"Action",sortable:!1,value:"action"}],logsHeader:[{text:"Time",sortable:!1,value:"time"},{text:"Name",sortable:!1,value:"name"},{text:"Role",sortable:!1,value:"role"},{text:"Action",sortable:!1,value:"action"},{text:"Comment",sortable:!1,value:"comment"}],paymentlogsHeader:[{text:"Time",sortable:!1,value:"time"},{text:"Method",sortable:!1,value:"method"},{text:"Amount",sortable:!1,value:"amount"}],selectDeletedItem:null,invoiceData:[],selectProduts:[],selectProdutsId:"",pictures:"",name:"",total:"",fristName:"",lastName:"",city:"",phone:"",street:"",status:!1,Picked:"",paidStatusId:"",paidStatusYN:!1,realstatus:!1,tryLogs:[],realTime:[],realTimeId:"",selectedStatus:"",comment:"",amount:"",openLogs:!1,logsData:[],openPaymentList:!1,paymentlogsData:[],paymentPresData:[],email:""}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.getAllOders();case 3:a=e.sent,a.data.data.forEach((function(e){console.log(e);var a=d()(e.updatedAt),s=d()(e.updatedAt),n=s.format("LT"),i=a.format("L"),r=n+" "+i;t.tryLogs=e.logs,t.invoiceData.push({date:r,invoiceId:e._id,streetNumber:e.streetNumber,city:e.city,firstName:e.firstName,lastName:e.lastName,paid:e.paid,paidStatusYN:e.paid,status:e.status,total:e.totalAmmount,paymentOption:e.paymentOption,agentCode:e.agentCode,country:e.country,email:e.email,products:e.products,totalAmmount:e.totalAmmount,pictures:e.pic1,logsddd:e.logs,paymentLogs:e.paymentLogs,delivery:e.delivery,totalAmountPaid:e.totalAmountPaid,statushesd:e.status.status,phoneNumber:e.phoneNumber})})),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},methods:{openDialog:function(t){var e=this;console.log(t),this.tryLogs=t.logsddd,this.paymentlogsData=t.paymentLogs,this.selectProdutsId=t.invoiceId,this.selectProduts=[];var a=0;t.products.forEach((function(t){e.selectProduts.push({pictures:e.linksformbackend+t._id.pictures.pic1,quantity:1,price:t._id.price,name:t._id.name.en}),a+=t._id.price,e.total=a})),this.fristName=t.firstName,this.lastName=t.lastName,this.city=t.city,this.phone=t.phoneNumber,this.street=t.streetNumber,this.email=t.email,this.editDialog=!0},deleteItemFromInvoicesList:function(t){this.$refs.deleteConfirmationDialog.openDialog(),this.selectDeletedItem=t},ondeleteItemFromInvoicesList:function(){this.$refs.deleteConfirmationDialog.close();var t=this.invoiceData.indexOf(this.selectDeletedItem);this.invoiceData.splice(t,1)},openPaidStatus:function(t,e){this.paidStatusId=e,this.status=!0,this.paidStatusYN=t},changePaidStatus:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.updatePayment(t.paidStatusId,t.amount);case 3:a=e.sent,t.$snotify.success("".concat(a.data.message),{closeOnClick:!1,pauseOnHover:!1,timeout:3e3,showProgressBar:!1}),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},changeRealStatus:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.updatestatus({status:t.selectedStatus,coment:t.comment},t.realTimeId);case 3:a=e.sent,t.$snotify.success("".concat(a.data.message),{closeOnClick:!1,pauseOnHover:!1,timeout:3e3,showProgressBar:!1}),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0.response.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},updateService:function(t,e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:try{a.realstatus=!0,a.selectedStatus=t.status,a.realTimeId=e}catch(n){console.log(n.message)}case 1:case"end":return s.stop()}}),s)})))()},checkLogs:function(){var t=this;this.openLogs=!0,this.logsData=[],this.tryLogs.forEach((function(e){var a=d()(e.time),s=d()(e.time),n=s.format("LT"),i=a.format("L"),r=n+" "+i;t.logsData.push({time:r,name:e.name,role:e.role,action:e.action,comment:e.action})}))},paymentList:function(){var t=this;this.paymentPresData=[],this.paymentlogsData.forEach((function(e){var a=d()(e.updatedAt),s=d()(e.updatedAt),n=s.format("LT"),i=a.format("L"),r=n+" "+i;t.paymentPresData.push({time:r,method:e.method,amount:e.amount})})),this.openPaymentList=!0}}},f=p,h=(a("d273"),a("449f"),a("2877")),g=Object(h["a"])(f,i,r,!1,null,"4d8076e9",null),y=g.exports,b={data:function(){return{search:""}},components:{Invoice:y}},x=b,C=Object(h["a"])(x,s,n,!1,null,null,null);e["default"]=C.exports},"449f":function(t,e,a){"use strict";var s=a("2ebd"),n=a.n(s);n.a},d273:function(t,e,a){"use strict";var s=a("ef48"),n=a.n(s);n.a},ef48:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7343c19a.fc495d59.js.map