webpackJsonp([3],{"+btK":function(t,a,i){t.exports=i.p+"static/img/wap-slider-1.f92a53d.jpg"},"2+7l":function(t,a,i){t.exports=i.p+"static/img/cover_h5.658c5b5.png"},"30dK":function(t,a,i){t.exports=i.p+"static/img/游戏特色.e8f3132.png"},"4Jiy":function(t,a){},"4ioa":function(t,a,i){"use strict";i.d(a,"a",function(){return c});var e=i("xBiU"),n=i.n(e),s=i("xtdY"),o=i.n(s),r=i("Cb88"),c=[{title:"公众号",img:i.n(r).a,type:"wx",style:{borderColor:"#ace299"}},{title:"微博",img:o.a,type:"weibo",style:{borderColor:"#fcb88e"}},{title:"QQ",img:n.a,type:"qq",style:{borderColor:"#f6a7a7"}}]},"81nb":function(t,a,i){t.exports=i.p+"static/img/wap_go_idx.3063b5f.png"},Cb88:function(t,a,i){t.exports=i.p+"static/img/wechat.0e58897.png"},CsaZ:function(t,a,i){t.exports=i.p+"static/img/wap-slider-4.04b9d11.jpg"},U1N1:function(t,a,i){t.exports=i.p+"static/img/wap-slider-5.6713154.jpg"},"i+dh":function(t,a,i){t.exports=i.p+"static/img/wap-slider-3.d6ac34c.jpg"},p2IW:function(t,a,i){t.exports=i.p+"static/img/wap_down.6c4cff5.png"},sFQr:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=i("Xxa5"),n=i.n(e),s=i("exGp"),o=i.n(s),r=i("2+7l"),c=i.n(r),p=i("81nb"),d=i.n(p),l=i("p2IW"),g=i.n(l),u=i("30dK"),f=i.n(u),_=i("+btK"),m=i.n(_),w=i("xc6T"),x=i.n(w),v=i("i+dh"),b=i.n(v),h=i("CsaZ"),y=i.n(h),C=(i("U1N1"),i("Cb88"),i("xtdY"),i("xBiU"),i("4ioa")),k=i("9jlc"),j=i.n(k),I={data:function(){return{banner:c.a,wap_go_idx:d.a,wap_down:g.a,game:f.a,play:j.a,shareArr:C.a,windowHeight:window.outerHeight,imgArr:[],dia_show:!1,dia_type:"qq"}},mounted:function(){this.getInfo()},methods:{getInfo:function(){var t=this;return o()(n.a.mark(function a(){var i;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return 2,a.next=3,t.$http.jsonp(z.jsonp+"/home/getCarousel?os=2");case 3:i=a.sent,t.imgArr=i.data.data.length?i.data.data:[{images:m.a},{images:x.a},{images:b.a},{images:y.a}];case 5:case"end":return a.stop()}},a,t)}))()},gotoIdx:function(){this.$router.push("/wap/index")},openDia:function(t){this.dia_show=!0,this.dia_type=t}}},q={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"wap_cover"},[i("div",{staticClass:"w_top",style:{backgroundImage:"url("+t.banner+")"}}),t._v(" "),i("dia",{attrs:{show:t.dia_show,type:t.dia_type},on:{"update:show":function(a){t.dia_show=a},cb:function(a){t.dia_show=!1}}}),t._v(" "),i("div",{staticClass:"wap_banner"},[i("img",{staticClass:"play",attrs:{src:t.play,alt:""},on:{click:function(a){t.openDia("qidai")}}}),t._v(" "),i("div",{staticClass:"download flex"},[i("div",{staticClass:"w_c_cnt flex f_j_b"},[i("div",{staticClass:"go_idx",style:{backgroundImage:"url("+t.wap_go_idx+")"},on:{click:t.gotoIdx}}),t._v(" "),i("div",{staticClass:"down",style:{backgroundImage:"url("+t.wap_down+")"},on:{click:function(a){t.openDia("qidai")}}})])])]),t._v(" "),i("img",{staticClass:"game",attrs:{src:t.game}}),t._v(" "),i("div",{staticClass:"container"},[i("el-carousel",{attrs:{interval:4e3,type:"card",width:"5rem",height:"4.6rem"}},t._l(t.imgArr,function(t,a){return i("el-carousel-item",{key:a},[i("div",{staticClass:"back_cover"},[i("div",{staticClass:"imgCnt",style:{"background-image":"url("+t.images+")"}})])])}))],1),t._v(" "),i("div",{staticClass:"wap_feet flex f_j_b"},t._l(t.shareArr,function(a,e){return i("div",{key:e,style:a.style,on:{click:function(i){t.openDia(a.type)}}},[i("img",{attrs:{src:a.img}}),t._v(" "),i("p",[t._v(t._s(a.title))])])})),t._v(" "),i("feet",{attrs:{type:"#000",ispc:!1}})],1)},staticRenderFns:[]};var U=i("VU/8")(I,q,!1,function(t){i("4Jiy")},null,null);a.default=U.exports},xBiU:function(t,a,i){t.exports=i.p+"static/img/qq.7738dd4.png"},xc6T:function(t,a,i){t.exports=i.p+"static/img/wap-slider-2.64abae0.jpg"},xtdY:function(t,a,i){t.exports=i.p+"static/img/webo.f7ba321.png"}});
//# sourceMappingURL=3.330a6a60270a2710180b.js.map