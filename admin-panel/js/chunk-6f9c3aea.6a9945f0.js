(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f9c3aea"],{"1da1":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("d3b7");function n(t,e,a,n,r,i,s){try{var o=t[i](s),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function r(t){return function(){var e=this,a=arguments;return new Promise((function(r,i){var s=t.apply(e,a);function o(t){n(s,r,i,o,c,"next",t)}function c(t){n(s,r,i,o,c,"throw",t)}o(void 0)}))}}},"8904f":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table-responsive"},[a("v-data-table",{attrs:{headers:t.headers,items:t.data},scopedSlots:t._u([{key:"item.image",fn:function(t){var e=t.item;return[a("img",{attrs:{src:e.image,width:"50px"}})]}},{key:"item.action",fn:function(e){var n=e.item;return[a("router-link",{attrs:{to:"/admin-panel/product-edit/"+n.id}},[a("v-btn",{staticClass:"primary--text",attrs:{small:"",icon:""}},[a("v-icon",[t._v("edit")])],1)],1),a("v-btn",{attrs:{icon:"",color:"grey",small:""}},[a("v-icon",{staticClass:"error--text",on:{click:function(e){return t.deleteItem(n)}}},[t._v("delete")])],1)]}}])}),a("emb-delete-confirmation-2",{ref:"deleteConfirmationDialog",attrs:{messageTitle:"Are You Sure You Want To Delete?",messageDescription:"Are you sure you want to delete this product permanently?",btn1:"Cancel",btn2:"Yes"},on:{onConfirm:t.ondeleteItemFromListView}})],1)},r=[],i={props:["data","deleteProduct"],data:function(){return{headers:[{text:"ID",sortable:!1,value:"id"},{text:"Image",sortable:!1,value:"image"},{text:"Name",sortable:!1,value:"name"},{text:"Company",sortable:!0,value:"company"},{text:"Departments",sortable:!0,value:"Departments"},{text:"Category",sortable:!0,value:"category"},{text:"Price",sortable:!0,value:"price"},{text:"Action",sortable:!1,value:"action"}],selectedItem:null}},methods:{deleteItem:function(t){this.$refs.deleteConfirmationDialog.openDialog(),this.selectedItem=t},ondeleteItemFromListView:function(){this.$refs.deleteConfirmationDialog.close(),this.$emit("deleteProduct",this.selectedItem)}}},s=i,o=a("2877"),c=Object(o["a"])(s,n,r,!1,null,null,null);e["a"]=c.exports},cb6b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"emb-card pa-4 search-box-wrap"},[a("div",{staticClass:"d-flex justify-start align-center"},[t._m(0),a("div",{staticClass:"search-input d-flex justify-space-between align-center"},[a("div",{staticClass:"input-wrap"},[a("v-text-field",{attrs:{label:"Search Projects"}})],1),a("div",{staticClass:"action-btn-wrap"},[a("v-btn",{staticClass:"mr-3",attrs:{color:"primary"}},[t._v("Search")]),a("v-btn",{attrs:{color:"primary",to:"/admin-panel/rental-add"}},[t._v(" Add Rental "),a("v-icon",[t._v("add")])],1)],1)])])]),a("rental-items",{staticClass:"mt-5",attrs:{gridListView:t.gridView,cols:6,colxl:3,collg:3,colmd:4,colsm:4,colxs:12}})],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dash-title-wrap"},[a("h5",{staticClass:"dash-title mb-0"},[t._v("Search")])])}],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shop-content-wrap"},[1==t.gridListView&&null!=t.listData?[a("v-row",t._l(t.listData,(function(t,e){return a("v-col",{key:e,attrs:{cols:"12",sm:"6",md:"4",lg:"3"}})})),1)]:t._e(),[a("product-items-list-view",{attrs:{data:t.listData},on:{deleteProduct:t.itemDeleted}})]],2)},s=[],o=(a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),a("96cf"),a("1da1")),c=a("5530"),l=a("8904f"),u=a("e8ea"),d=a("2f62"),m={computed:Object(c["a"])({},Object(d["b"])(["linksformbackend"])),props:["colxs","colsm","colmd","collg","colxl","gridListView"],data:function(){return{products:null,headersForListView:[{text:"ID",sortable:!1,value:"id"},{text:"Image",sortable:!1,value:"image"},{text:"Name",sortable:!1,value:"name"},{text:"Company",sortable:!0,value:"company"},{text:"Departments",sortable:!0,value:"Departments"},{text:"Price",sortable:!0,value:"price"},{text:"Action",sortable:!1,value:"action"}],listData:[]}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u["a"].getRental();case 3:a=e.sent,a.data.data.forEach((function(e){console.log(e),t.listData.push({id:e._id,image:t.linksformbackend+e.pictures.pic1,name:e.name.en,price:e.price,company:e.company.name,Departments:e.department.name.en})})),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},methods:{itemDeleted:function(t){var e=this.listData,a=e.indexOf(t);this.listData.splice(a,1)}},components:{ProductItemsListView:l["a"]}},p=m,v=a("2877"),f=Object(v["a"])(p,i,s,!1,null,null,null),b=f.exports,h={data:function(){return{typeItems:["Men","Women","Gadgets"],recentItems:["This Week","This Month","Past Month"],noOfItems:["10","20","30"],gridView:!1,listView:!0}},components:{rentalItems:b},methods:{switchToGridView:function(t){this.gridView=t},switchToListView:function(t){this.gridView=t}}},w=h,g=Object(v["a"])(w,n,r,!1,null,null,null);e["default"]=g.exports},e8ea:function(t,e,a){"use strict";a("96cf");var n=a("1da1"),r=a("365c");e["a"]={getRental:function(){return Object(n["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])().get("/api/rentals");case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})))()},uploadRental:function(t){return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["a"])().post("/api/rentals",t);case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})))()}}}}]);
//# sourceMappingURL=chunk-6f9c3aea.6a9945f0.js.map