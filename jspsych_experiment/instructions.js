var jsPsychInstructions=function(e){"use strict";function t(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(r=n.key,i=void 0,"symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(r,"string"))?i:String(i)),n)}var r,i}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function n(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){l=!0,s=e},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw s}}}}var r={name:"instructions",parameters:{pages:{type:e.ParameterType.HTML_STRING,pretty_name:"Pages",default:void 0,array:!0},key_forward:{type:e.ParameterType.KEY,pretty_name:"Key forward",default:"ArrowRight"},key_backward:{type:e.ParameterType.KEY,pretty_name:"Key backward",default:"ArrowLeft"},allow_backward:{type:e.ParameterType.BOOL,pretty_name:"Allow backward",default:!0},allow_keys:{type:e.ParameterType.BOOL,pretty_name:"Allow keys",default:!0},show_clickable_nav:{type:e.ParameterType.BOOL,pretty_name:"Show clickable nav",default:!1},show_page_number:{type:e.ParameterType.BOOL,pretty_name:"Show page number",default:!1},page_label:{type:e.ParameterType.STRING,pretty_name:"Page label",default:"Page"},button_label_previous:{type:e.ParameterType.STRING,pretty_name:"Button label previous",default:"Previous"},button_label_next:{type:e.ParameterType.STRING,pretty_name:"Button label next",default:"Next"}}},i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.jsPsych=t}var a,r,i;return a=e,r=[{key:"trial",value:function(e,t){var a=this,n=0,r=[],i=performance.now(),s=i;function o(e){e.target.removeEventListener("click",o),"jspsych-instructions-back"===this.id?u():"jspsych-instructions-next"===this.id&&c()}function l(){var a=t.pages[n],r="";if(t.show_page_number&&(r="<span style='margin: 0 1em;' class='jspsych-instructions-pagenum'>"+t.page_label+" "+(n+1)+"/"+t.pages.length+"</span>"),t.show_clickable_nav){var i="<div class='jspsych-instructions-nav' style='padding: 10px 0px;'>";t.allow_backward&&(i+="<button id='jspsych-instructions-back' class='jspsych-btn' style='margin-right: 5px;' "+(n>0?"":"disabled='disabled'")+">&lt; "+t.button_label_previous+"</button>"),t.pages.length>1&&t.show_page_number&&(i+=r),a+=i+="<button id='jspsych-instructions-next' class='jspsych-btn'style='margin-left: 5px;'>"+t.button_label_next+" &gt;</button></div>",e.innerHTML=a,0!=n&&t.allow_backward&&e.querySelector("#jspsych-instructions-back").addEventListener("click",o),e.querySelector("#jspsych-instructions-next").addEventListener("click",o)}else t.show_page_number&&t.pages.length>1&&(a+="<div class='jspsych-instructions-pagenum'>"+r+"</div>"),e.innerHTML=a}function c(){y(),++n>=t.pages.length?p():l()}function u(){y(),n--,l()}function y(){var e=performance.now(),t=Math.round(e-s);r.push({page_index:n,viewing_time:t}),s=e}var p=function(){t.allow_keys&&a.jsPsych.pluginAPI.cancelKeyboardResponse(h),e.innerHTML="";var n={view_history:r,rt:Math.round(performance.now()-i)};a.jsPsych.finishTrial(n)};if(l(),t.allow_keys)var h=this.jsPsych.pluginAPI.getKeyboardResponse({callback_function:function e(r){h=a.jsPsych.pluginAPI.getKeyboardResponse({callback_function:e,valid_responses:[t.key_forward,t.key_backward],rt_method:"performance",persist:!1,allow_held_key:!1}),a.jsPsych.pluginAPI.compareKeys(r.key,t.key_backward)&&0!==n&&t.allow_backward&&u(),a.jsPsych.pluginAPI.compareKeys(r.key,t.key_forward)&&c()},valid_responses:[t.key_forward,t.key_backward],rt_method:"performance",persist:!1})}},{key:"simulate",value:function(e,t,a,n){"data-only"==t&&(n(),this.simulate_data_only(e,a)),"visual"==t&&this.simulate_visual(e,a,n)}},{key:"create_simulation_data",value:function(e,t){var a,r,i,s,o,l,c=0,u=0,y=[];if(!(null===(a=t.data)||void 0===a?void 0:a.view_history)&&!(null===(r=t.data)||void 0===r?void 0:r.rt))for(;c!==e.pages.length;){var p=Math.round(this.jsPsych.randomization.sampleExGaussian(3e3,300,1/300));y.push({page_index:c,viewing_time:p}),u+=p,0!=c&&e.allow_backward?1==this.jsPsych.randomization.sampleBernoulli(.9)?c++:c--:c++}if(!(null===(i=t.data)||void 0===i?void 0:i.view_history)&&(null===(s=t.data)||void 0===s?void 0:s.rt)){for(u=t.data.rt;c!==e.pages.length;)y.push({page_index:c,viewing_time:null}),0!=c&&e.allow_backward?1==this.jsPsych.randomization.sampleBernoulli(.9)?c++:c--:c++;var h,d=t.data.rt/y.length,v=0,_=n(y);try{for(_.s();!(h=_.n()).done;){var f=h.value,m=Math.round(this.jsPsych.randomization.sampleExGaussian(d,d/10,1/(d/10)));f.viewing_time=m,v+=m}}catch(e){_.e(e)}finally{_.f()}var w,g=t.data.rt-v,b=Math.round(g/y.length),k=n(y);try{for(k.s();!(w=k.n()).done;)w.value.viewing_time+=b}catch(e){k.e(e)}finally{k.f()}}if((null===(o=t.data)||void 0===o?void 0:o.view_history)&&!(null===(l=t.data)||void 0===l?void 0:l.rt)){y=t.data.view_history,u=0;var P,j=n(t.data.view_history);try{for(j.s();!(P=j.n()).done;)u+=P.value.viewing_time}catch(e){j.e(e)}finally{j.f()}}var T={view_history:y,rt:u},x=this.jsPsych.pluginAPI.mergeSimulationData(T,t);return this.jsPsych.pluginAPI.ensureSimulationDataConsistency(e,x),x}},{key:"simulate_data_only",value:function(e,t){var a=this.create_simulation_data(e,t);this.jsPsych.finishTrial(a)}},{key:"simulate_visual",value:function(e,t,a){var n=this,r=this.create_simulation_data(e,t),i=this.jsPsych.getDisplayElement();this.trial(i,e),a();for(var s,o=function(t){e.allow_keys?n.jsPsych.pluginAPI.pressKey(e.key_forward,t):e.show_clickable_nav&&n.jsPsych.pluginAPI.clickTarget(i.querySelector("#jspsych-instructions-next"),t)},l=0,c=0,u=0;u<r.view_history.length;u++)u==r.view_history.length-1?o(c+r.view_history[u].viewing_time):(r.view_history[u+1].page_index>l&&o(c+r.view_history[u].viewing_time),r.view_history[u+1].page_index<l&&(s=c+r.view_history[u].viewing_time,e.allow_keys?n.jsPsych.pluginAPI.pressKey(e.key_backward,s):e.show_clickable_nav&&n.jsPsych.pluginAPI.clickTarget(i.querySelector("#jspsych-instructions-back"),s)),c+=r.view_history[u].viewing_time,l=r.view_history[u+1].page_index)}}],r&&t(a.prototype,r),i&&t(a,i),Object.defineProperty(a,"prototype",{writable:!1}),e}();return i.info=r,i}(jsPsychModule);
//# sourceMappingURL=https://unpkg.com/@jspsych/plugin-instructions@1.1.4/dist/index.browser.min.js.map