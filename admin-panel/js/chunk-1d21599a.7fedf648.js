(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d21599a"],{"0e8f":function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("365c");t["a"]={getDepartment:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(a["a"])().get("/api/departments"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))()},createDepartment:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=Object(a["a"])().post("/api/departments",e),t.abrupt("return",r);case 2:case"end":return t.stop()}}),t)})))()},updateDepartment:function(e,t){return Object(n["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=Object(a["a"])().put("/api/departments/".concat(t),e),r.abrupt("return",n);case 2:case"end":return r.stop()}}),r)})))()}}},"1da1":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("d3b7");function n(e,t,r,n,a,c,s){try{var i=e[c](s),o=i.value}catch(u){return void r(u)}i.done?t(o):Promise.resolve(o).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,c){var s=e.apply(t,r);function i(e){n(s,a,c,i,o,"next",e)}function o(e){n(s,a,c,i,o,"throw",e)}i(void 0)}))}}},"66da":function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("365c");t["a"]={getCategories:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(a["a"])().get("/api/categories"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))()},cerateCategories:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=Object(a["a"])().post("/api/categories",e),t.abrupt("return",r);case 2:case"end":return t.stop()}}),t)})))()},updateCategories:function(e,t){return Object(n["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=Object(a["a"])().put("/api/categories/".concat(t),e),r.abrupt("return",n);case 2:case"end":return r.stop()}}),r)})))()}}},8601:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"emb-register-wrap section-gap"},[r("div",{staticClass:"container py-0"},[r("v-layout",{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[r("v-flex",{attrs:{sm12:"",md12:"",lg8:"",xl7:""}},[r("v-layout",{attrs:{row:"","mx-sm-0":"","mx-3":"",wrap:"","align-center":"","justify-center":""}},[r("v-flex",{attrs:{sm10:"",md5:"",lg6:"",xl6:""}},[r("div",{staticClass:"emb-card sign-in-form form-margin d-block white pa-6"},[r("h4",[e._v("Enter Your Category details")]),r("v-form",{ref:"form"},[r("v-select",{attrs:{"prepend-icon":"edit",items:e.avaliableDepartments,label:"Departments",dense:""},model:{value:e.assignedDepartments,callback:function(t){e.assignedDepartments=t},expression:"assignedDepartments"}}),r("v-text-field",{attrs:{"prepend-icon":"edit",label:"English Name* ",required:""},model:{value:e.category.en,callback:function(t){e.$set(e.category,"en",t)},expression:"category.en"}}),r("v-text-field",{attrs:{"prepend-icon":"edit",label:"kinyarwanda Name*",required:""},model:{value:e.category.kiny,callback:function(t){e.$set(e.category,"kiny",t)},expression:"category.kiny"}}),r("v-text-field",{attrs:{"prepend-icon":"edit",label:"french Name*",required:""},model:{value:e.category.fr,callback:function(t){e.$set(e.category,"fr",t)},expression:"category.fr"}}),r("v-text-field",{attrs:{"prepend-icon":"edit",label:"swahili Name*",required:""},model:{value:e.category.sw,callback:function(t){e.$set(e.category,"sw",t)},expression:"category.sw"}}),r("v-btn",{staticClass:"accent mx-0 mb-4 mt-4",attrs:{large:""},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.editdep(t)}}},[e._v(" Save changes ")])],1)],1)])],1)],1)],1)],1)])},a=[],c=(r("4160"),r("b0c0"),r("159b"),r("96cf"),r("1da1")),s=r("0e8f"),i=r("66da"),o={data:function(){return{category:{en:"",fr:"",kiny:"",sw:""},checkbox:!1,products:null,selectedProduct:null,selectedImage:null,avaliableDepartments:[],assignedDepartments:"",selectedDepartmentId:"",resDept:null}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.id=e.$route.params.id,t.next=4,i["a"].getCategories();case 4:return r=t.sent,r.data.data.forEach((function(t){t._id===e.id&&(e.category.en=t.name.en,e.category.fr=t.name.fr,e.category.kiny=t.name.kiny,e.category.sw=t.name.sw,e.selectedDepartmentId=t.department,console.log(e.category))})),t.next=8,s["a"].getDepartment();case 8:e.resDept=t.sent,e.resDept.data.data.forEach((function(t){e.avaliableDepartments.push(t.name.kiny),t._id===e.selectedDepartmentId&&(e.assignedDepartments=t.name.kiny)})),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),console.log(t.t0.message);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()},methods:{editdep:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.resDept.data.data.forEach((function(t){t.name.kiny===e.assignedDepartments&&(e.selectedDepartmentId=t._id)})),t.next=4,i["a"].updateCategories({name:e.category,department:e.selectedDepartmentId},e.id);case 4:r=t.sent,console.log(r),e.$router.push("/admin-panel/categories"),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},doHover:function(e){this.selectedImage=e}}},u=o,p=r("2877"),l=Object(p["a"])(u,n,a,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-1d21599a.7fedf648.js.map