(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e3b7"],{d54d:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"emb-forgetpassword-wrap section-gap"},[a("div",{staticClass:"container py-0"},[a("v-layout",{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[a("v-flex",{attrs:{sm12:"",md12:"",lg8:"",xl8:""}},[a("v-layout",{attrs:{"align-center":"","mx-sm-0":"","mx-3":"","justify-center":"",row:"",wrap:""}},[a("v-flex",{attrs:{sm6:"",md6:"",lg6:"",xl6:"","hidden-sm-and-down":""}},[a("div",{staticClass:"forgot-password-image form-img"})]),a("v-flex",{staticClass:"emb-card form-margin pa-4 d-inline-block white",attrs:{sm10:"",md6:"",lg6:"",xl6:""}},[a("h3",{staticClass:"accent--text"},[t._v("Forgot Password ?")]),a("h4",[t._v("No Problem")]),a("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-text-field",{attrs:{type:"email",rules:t.emailRules,placeholder:"Enter Your Email*"}}),a("v-text-field",{staticClass:"mb-4",attrs:{type:"email",rules:t.emailRules,placeholder:"Retype Your Email*"}}),a("v-btn",{staticClass:"accent mb-4 ma-0",attrs:{large:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.saveDetails.apply(null,arguments)}}},[t._v(" Submit ")]),a("p",[t._v("If have an account then "),a("router-link",{staticClass:"accent--text",attrs:{to:"/session/signin"}},[t._v("Sign In ")])],1)],1)],1)],1)],1)],1)],1)])},l=[],i={data:function(){return{valid:!1,emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}]}},methods:{saveDetails:function(){this.$refs.form.validate(),1==this.valid&&this.$router.go("/session/forgot-password")}}},r=i,n=a("2877"),o=Object(n["a"])(r,s,l,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d21e3b7.ba14bfc0.js.map