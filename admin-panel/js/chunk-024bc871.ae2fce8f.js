(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-024bc871"],{"0e8f":function(e,t,a){"use strict";a("96cf");var n=a("1da1"),r=a("365c");t["a"]={getDepartment:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(r["a"])().get("/api/departments"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))()},createDepartment:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(r["a"])().post("/api/departments",e),t.abrupt("return",a);case 2:case"end":return t.stop()}}),t)})))()},updateDepartment:function(e,t){return Object(n["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=Object(r["a"])().put("/api/departments/".concat(t),e),a.abrupt("return",n);case 2:case"end":return a.stop()}}),a)})))()}}},"1da1":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a("d3b7");function n(e,t,a,n,r,i,c){try{var s=e[i](c),o=s.value}catch(l){return void a(l)}s.done?t(o):Promise.resolve(o).then(n,r)}function r(e){return function(){var t=this,a=arguments;return new Promise((function(r,i){var c=e.apply(t,a);function s(e){n(c,r,i,s,o,"next",e)}function o(e){n(c,r,i,s,o,"throw",e)}s(void 0)}))}}},"66da":function(e,t,a){"use strict";a("96cf");var n=a("1da1"),r=a("365c");t["a"]={getCategories:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(r["a"])().get("/api/categories"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))()},cerateCategories:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(r["a"])().post("/api/categories",e),t.abrupt("return",a);case 2:case"end":return t.stop()}}),t)})))()},updateCategories:function(e,t){return Object(n["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=Object(r["a"])().put("/api/categories/".concat(t),e),a.abrupt("return",n);case 2:case"end":return a.stop()}}),a)})))()}}},"816f":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"emb-product-add"},[a("v-row",[a("v-col",{staticClass:"mx-auto",attrs:{cols:"12",sm:"9",md:"10",lg:"10"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12",md:"6",lg:"6"}},[a("div",{staticClass:"product-images-wrap d-flex"},[a("div",{staticClass:"product-images mr-4"},[a("div",{staticClass:"thumb-wrap",attrs:{for:"upload"}},[a("v-img",{attrs:{src:e.fileOne,alt:"images",height:"70"}}),a("div",{staticClass:"edit-btn d-flex justify-center align-center"},[a("v-icon",{attrs:{dark:""}},[e._v("add")])],1),a("input",{ref:"pic1",staticClass:"upload-img",attrs:{type:"file",id:"upload",accept:"image/*"},on:{change:e.selectpic}})],1),a("div",{staticClass:"thumb-wrap",attrs:{for:"upload"}},[a("v-img",{attrs:{src:e.filetwo,height:"70"}}),a("div",{staticClass:"edit-btn d-flex justify-center align-center"},[a("v-icon",{attrs:{dark:""}},[e._v("add")])],1),a("input",{ref:"pic2",staticClass:"upload-img",attrs:{type:"file",id:"upload",accept:"image/*"},on:{change:e.selectpict}})],1),a("div",{staticClass:"thumb-wrap",attrs:{for:"upload"}},[a("v-img",{attrs:{src:e.filethree,height:"70"}}),a("div",{staticClass:"edit-btn d-flex justify-center align-center"},[a("v-icon",{attrs:{dark:""}},[e._v("add")])],1),a("input",{ref:"pic3",staticClass:"upload-img",attrs:{type:"file",id:"upload",accept:"image/*"},on:{change:e.selectpich}})],1),a("div",{staticClass:"thumb-wrap",attrs:{for:"upload"}},[a("v-img",{attrs:{src:e.filefour,height:"70"}}),a("div",{staticClass:"edit-btn d-flex justify-center align-center"},[a("v-icon",{attrs:{dark:""}},[e._v("add")])],1),a("input",{ref:"pic4",staticClass:"upload-img",attrs:{type:"file",id:"upload",accept:"image/*"},on:{change:e.selectpicf}})],1)]),a("div",{staticClass:"product-preview-wrap"},[a("v-img",{staticStyle:{width:"100%"},attrs:{src:e.fileOne}})],1)])]),a("v-col",{staticClass:"content-wrap pl-md-6",attrs:{cols:"12",sm:"12",md:"6",lg:"6"}},[a("router-link",{staticClass:"pt-4 d-block font-weight-medium",attrs:{to:"/admin-panel/products"}},[e._v("Back to Rental ")]),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Name in english"},model:{value:e.pName.en,callback:function(t){e.$set(e.pName,"en",t)},expression:"pName.en"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Name in kinyawanda"},model:{value:e.pName.kiny,callback:function(t){e.$set(e.pName,"kiny",t)},expression:"pName.kiny"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Name in swahili"},model:{value:e.pName.sw,callback:function(t){e.$set(e.pName,"sw",t)},expression:"pName.sw"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Name in french"},model:{value:e.pName.fr,callback:function(t){e.$set(e.pName,"fr",t)},expression:"pName.fr"}}),a("v-select",{attrs:{"prepend-icon":"add",items:e.Departments,label:"Departments",dense:""},on:{change:e.fetchCategory},model:{value:e.assignedDepartments,callback:function(t){e.assignedDepartments=t},expression:"assignedDepartments"}}),a("v-select",{attrs:{"prepend-icon":"add",items:e.selectablecategories,label:"Categories",dense:""},on:{change:e.fetchcategories},model:{value:e.selectedcategory,callback:function(t){e.selectedcategory=t},expression:"selectedcategory"}}),a("v-select",{attrs:{"prepend-icon":"add",items:e.selectedCompany,label:"Company",dense:""},on:{change:e.fetchSelected},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),a("v-text-field",{staticClass:"price-input",attrs:{"prepend-icon":"add",placeholder:"Add Price"},model:{value:e.price,callback:function(t){e.price=t},expression:"price"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Description in english"},model:{value:e.description.en,callback:function(t){e.$set(e.description,"en",t)},expression:"description.en"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Description in kinyawanda"},model:{value:e.description.kiny,callback:function(t){e.$set(e.description,"kiny",t)},expression:"description.kiny"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Description in swahili"},model:{value:e.description.sw,callback:function(t){e.$set(e.description,"sw",t)},expression:"description.sw"}}),a("v-text-field",{attrs:{"prepend-icon":"add",label:"Description in french"},model:{value:e.description.fr,callback:function(t){e.$set(e.description,"fr",t)},expression:"description.fr"}}),a("v-btn",{staticClass:"mx-3",attrs:{color:"accent",loading:e.loading,large:""},on:{click:e.uploadProduct}},[e._v("Create")]),a("v-btn",{attrs:{color:"white",large:""}},[e._v("Discard")])],1)],1)],1)],1)],1)},r=[],i=(a("a4d3"),a("e01a"),a("4160"),a("b0c0"),a("159b"),a("96cf"),a("1da1")),c=a("0e8f"),s=a("fcac"),o=a("66da"),l=a("e8ea"),p={data:function(){return{loading:!1,fileOne:"https://via.placeholder.com/625x800",filetwo:"https://via.placeholder.com/625x800",filethree:"https://via.placeholder.com/625x800",filefour:"https://via.placeholder.com/625x800",pName:{en:"",sw:"",kiny:"",fr:""},price:"",assignedDepartments:"",data:"",assignedDepartmentsId:"",Departments:[],allcategories:[],selectablecategories:[],selectedcategory:"",selectedCompany:[],allCompany:"",assignedCategoriesId:"",selected:"",selectedid:"",description:{en:"",sw:"",kiny:"",fr:""},prictures:{pic1:"",pic2:"",pic3:"",pic4:""}}},methods:{fetchCategory:function(){var e=this;this.data.forEach((function(t){t.name.kiny===e.assignedDepartments&&(e.assignedDepartmentsId=t._id)})),this.allcategories.data.data.forEach((function(t){t.department===e.assignedDepartmentsId&&e.selectablecategories.push(t.name.kiny)}))},fetchSelected:function(){var e=this;this.allCompany.data.data.forEach((function(t){t.name===e.selected&&(e.selectedid=t._id,console.log(e.selectedid))}))},fetchcategories:function(){var e=this;this.allcategories.data.data.forEach((function(t){t.name.kiny===e.selectedcategory&&(e.assignedCategoriesId=t._id,console.log(e.assignedCategoriesId))}))},selectpic:function(e){var t=this,a=e.target.files[0],n=new FileReader;n.onload=function(e){t.fileOne=e.target.result,t.pictures.pic1=t.fileOne},a&&n.readAsDataURL(a)},selectpict:function(e){var t=this,a=e.target.files[0],n=new FileReader;n.onload=function(e){t.filetwo=e.target.result,t.pictures.pic1=t.filetwo},a&&n.readAsDataURL(a)},selectpich:function(e){var t=this,a=e.target.files[0],n=new FileReader;n.onload=function(e){t.filethree=e.target.result,t.pictures.pic1=t.filethree},a&&n.readAsDataURL(a)},selectpicf:function(e){var t=this,a=e.target.files[0],n=new FileReader;n.onload=function(e){t.filefour=e.target.result,t.pictures.pic1=t.filefour},a&&n.readAsDataURL(a)},uploadProduct:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,a=new FormData,a.append("description",JSON.stringify(e.description)),a.append("department",e.assignedDepartmentsId),a.append("category",e.assignedCategoriesId),a.append("company",e.selectedid),a.append("name",JSON.stringify(e.pName)),a.append("price",e.price),a.append("picture1",e.$refs.pic1.files[0]),a.append("picture2",e.$refs.pic2.files[0]),a.append("picture3",e.$refs.pic3.files[0]),a.append("picture4",e.$refs.pic4.files[0]),t.next=15,l["a"].uploadRental(a);case 15:n=t.sent,console.log(n),e.loading=!1,t.next=24;break;case 20:t.prev=20,t.t0=t["catch"](1),console.log(t.t0),e.loading=!1;case 24:case"end":return t.stop()}}),t,null,[[1,20]])})))()}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"].getDepartment();case 3:return a=t.sent,t.next=6,a.data.data;case 6:return e.data=t.sent,e.data.forEach((function(t){e.Departments.push(t.name.kiny)})),t.next=10,o["a"].getCategories();case 10:return e.allcategories=t.sent,t.next=13,s["a"].getCompany();case 13:e.allCompany=t.sent,e.allCompany.data.data.forEach((function(t){e.selectedCompany.push(t.name)})),t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](0),console.log(t.t0.message);case 20:case"end":return t.stop()}}),t,null,[[0,17]])})))()}},d=p,u=a("2877"),f=Object(u["a"])(d,n,r,!1,null,null,null);t["default"]=f.exports},e8ea:function(e,t,a){"use strict";a("96cf");var n=a("1da1"),r=a("365c");t["a"]={getRental:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["a"])().get("/api/rentals");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))()},uploadRental:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["a"])().post("/api/rentals",e);case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})))()}}},fcac:function(e,t,a){"use strict";a("96cf");var n=a("1da1"),r=a("365c");t["a"]={getCompany:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(r["a"])().get("/api/companies"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))()},uploadCompany:function(e){return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(r["a"])().post("/api/companies",e),t.abrupt("return",a);case 2:case"end":return t.stop()}}),t)})))()}}}}]);
//# sourceMappingURL=chunk-024bc871.ae2fce8f.js.map