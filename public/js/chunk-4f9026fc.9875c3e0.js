(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f9026fc"],{b8fa:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"emb-contact-wrap"},[a("emb-page-title",{attrs:{heading:"message.ContactUs",subHeading:"message.subHeadingContactUs"}}),a("div",{staticClass:"emb-contact-content"},[a("div",{staticClass:"contact-info-wrapper"},[a("v-container",{attrs:{"grid-list-xl":"","py-0":""}},[a("div",{staticClass:"section-gap"},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{sm12:"",md12:"",lg5:"",xl5:""}},[a("div",{staticClass:"sec-title"},[a("h2",{staticClass:"v-layout justify-start align-center"},[e._v(e._s(e.$t("message.ContactInfo")))]),a("h5",{staticClass:"font-italic mb-6"},[e._v(e._s(e.$t("message.Salesteam")))])]),a("div",{staticClass:"mb-6"},[a("h3",[e._v(e._s(e.$t("message.Call")))]),a("a",{staticClass:"color-inherit",attrs:{href:"tel:+25078125096/+25088748479"}},[e._v(" +250 784 481 653")])]),a("div",{staticClass:"mb-6"},[a("h3",[e._v(e._s(e.$t("message.Mail")))]),a("a",{staticClass:"color-inherit",attrs:{href:"mailto:info@byihuse.rw"}},[e._v("info@byihuse.rw")])]),a("div",{staticClass:"mb-6"},[a("h3",[e._v(e._s(e.$t("message.Address")))]),a("p",[e._v("KN2 ave opposite MIC building")])])]),a("v-flex",{attrs:{sm12:"",md12:"",lg7:"",xl7:""}},[a("div",{staticClass:"sec-title"},[a("h2",[e._v(e._s(e.$t("message.WritetoUs")))])]),a("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{type:"text",placeholder:e.label.firstName,rules:e.inputRules.basictextRules},model:{value:e.fristName,callback:function(t){e.fristName=t},expression:"fristName"}}),a("v-text-field",{attrs:{type:"text",placeholder:e.label.lastName,rules:e.inputRules.basictextRules},model:{value:e.lastName,callback:function(t){e.lastName=t},expression:"lastName"}}),a("v-text-field",{attrs:{type:"email",placeholder:e.label.email},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("v-text-field",{attrs:{type:"text",placeholder:e.label.Subject,rules:e.inputRules.basictextRules},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}}),a("v-textarea",{attrs:{rows:"2",label:e.label.message,rules:e.inputRules.basictextRules},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("v-btn",{staticClass:"accent mx-0 mt-4",attrs:{loading:e.loading,large:""},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getContactInfo.apply(null,arguments)}}},[e._v(" "+e._s(e.$t("message.SendMessage")))])],1)],1)],1)],1)])],1)])],1)},l=[],i=a("1da1"),n=a("5530"),r=(a("b0c0"),a("96cf"),a("e230")),c=a("2f62"),o={computed:Object(n["a"])({},Object(c["b"])(["selectedLocale"])),data:function(){return{loading:!1,fristName:"",lastName:"",email:"",subject:"",message:"",valid:!1,contactInfo:"",label:{},inputRules:{basictextRules:[function(e){return!!e||"This field should not be empty"}]}}},methods:{getContactInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,r["a"].postMessage({firstName:e.fristName,lastName:e.lastName,email:e.email,subject:e.subject,message:e.message});case 4:a=t.sent,e.$snotify.success("".concat(a.data.message),{closeOnClick:!1,pauseOnHover:!1,timeout:1e3,showProgressBar:!1}),e.loading=!1,t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](1),console.log(t.t0),e.loading=!1;case 13:case"end":return t.stop()}}),t,null,[[1,9]])})))()},saveDetails:function(){this.$refs.form.validate()}},mounted:function(){var e=JSON.parse(localStorage.getItem("data"));e&&(this.fristName=e.firstName,this.lastName=e.lastName,this.email=e.email),"English"===this.selectedLocale.name?this.label={firstName:"First Name*",lastName:"Last Name*",Subject:"Subject",address:"address",message:"Leave a Message*",email:"Email*"}:this.label={firstName:"Prénom*",lastName:"Nom de famille*",Subject:"Sujet*",address:"Votre adresse",message:"Laisser un message*",email:"Email*"}}},m=o,u=a("2877"),d=Object(u["a"])(m,s,l,!1,null,null,null);t["default"]=d.exports},e230:function(e,t,a){"use strict";var s=a("1da1"),l=(a("96cf"),a("365c"));t["a"]={postMessage:function(e){return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=Object(l["a"])().post("/api/messages",e),t.abrupt("return",a);case 2:case"end":return t.stop()}}),t)})))()}}}}]);
//# sourceMappingURL=chunk-4f9026fc.9875c3e0.js.map