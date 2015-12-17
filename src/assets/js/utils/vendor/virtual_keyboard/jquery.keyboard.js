!function(e){"use strict";e.keyboard=function(t,a){var i,s=this;s.version="1.19.0",s.$el=e(t),s.el=t,s.$el.data("keyboard",s),s.init=function(){s.options=i=e.extend(!0,{},e.keyboard.defaultOptions,a),s.shiftActive=s.altActive=s.metaActive=s.sets=s.capsLock=!1,s.rows=["","-shift","-alt","-alt-shift"],e('<!--[if lte IE 8]><script>jQuery("body").addClass("oldie");</script><![endif]--><!--[if IE]><script>jQuery("body").addClass("ie");</script><![endif]-->').appendTo("body").remove(),s.msie=e("body").hasClass("oldie"),s.allie=e("body").hasClass("ie"),s.inPlaceholder=s.$el.attr("placeholder")||"",s.watermark="undefined"!=typeof document.createElement("input").placeholder&&""!==s.inPlaceholder,s.repeatTime=1e3/(i.repeatRate||20),i.preventDoubleEventTime=i.preventDoubleEventTime||100,s.isOpen=!1,s.wheel=e.isFunction(e.fn.mousewheel),s.alwaysAllowed=[20,33,34,35,36,37,38,39,40,45,46],s.$keyboard=[],i.position.orig_at=i.position.at,s.temp=e('<div style="height:0px;width:0px;overflow:hidden;"><input type="text" value="testing"></div>').insertAfter(s.el),s.temp.find("input").caret(3,3),s.checkCaret=i.lockInput||3!==s.temp.find("input").hide().show().caret().start,s.temp.remove(),s.last={start:0,end:0,key:"",val:"",keyset:[!1,!1,!1]},s.temp=["",0,0],e.each("initialized beforeVisible visible hidden canceled accepted beforeClose".split(" "),function(t,a){e.isFunction(i[a])&&s.$el.bind(a+".keyboard",i[a])}),i.alwaysOpen&&(i.stayOpen=!0),e(document).bind("mousedown keyup touchstart checkkeyboard ".split(" ").join(".keyboard "),function(t){if(!s.opening&&(s.escClose(t),t.target&&e(t.target).hasClass("ui-keyboard-input"))){var a=e(t.target).data("keyboard");a===s&&a.options.openOn&&a.focusOn()}}),s.$el.addClass("ui-keyboard-input "+i.css.input).attr({"aria-haspopup":"true",role:"textbox"}),(s.$el.is(":disabled")||s.$el.attr("readonly")&&!s.$el.hasClass("ui-keyboard-lockedinput"))&&s.$el.addClass("ui-keyboard-nokeyboard"),i.openOn&&s.$el.bind(i.openOn+".keyboard",function(){s.focusOn()}),s.watermark||""!==s.$el.val()||""===s.inPlaceholder||""===s.$el.attr("placeholder")||s.$el.addClass("ui-keyboard-placeholder").val(s.inPlaceholder),s.$el.trigger("initialized.keyboard",[s,s.el]),i.alwaysOpen&&s.reveal()},s.setCurrent=function(){e(".ui-keyboard-has-focus").removeClass("ui-keyboard-has-focus"),e(".ui-keyboard-input-current").removeClass("ui-keyboard-input-current"),s.$el.addClass("ui-keyboard-input-current"),s.$keyboard.addClass("ui-keyboard-has-focus"),s.isCurrent(!0),s.isOpen=!0},s.isCurrent=function(t){var a=e.keyboard.currentKeyboard||!1;return t?a=e.keyboard.currentKeyboard=s.el:t===!1&&a===s.el&&(a=e.keyboard.currentKeyboard=""),a===s.el},s.isVisible=function(){return s.$keyboard&&s.$keyboard.length?s.$keyboard.is(":visible"):!1},s.focusOn=function(){s.$el.is(":visible")&&setTimeout(function(){if(!/(number|email)/i.test(s.el.type)){var e=s.$el.caret();s.last.start=e.start,s.last.end=e.end}},20),s.isVisible()||(clearTimeout(s.timer),s.reveal()),i.alwaysOpen&&s.setCurrent()},s.reveal=function(t){return s.opening=!0,e(".ui-keyboard").not(".ui-keyboard-always-open").remove(),t&&(s.isOpen=!1,s.$keyboard.length&&(s.$keyboard.remove(),s.$keyboard=[])),s.$el.is(":disabled")||s.$el.attr("readonly")&&!s.$el.hasClass("ui-keyboard-lockedinput")?void s.$el.addClass("ui-keyboard-nokeyboard"):(s.$el.removeClass("ui-keyboard-nokeyboard"),i.openOn&&s.$el.unbind(i.openOn+".keyboard"),(!s.$keyboard||s.$keyboard&&(!s.$keyboard.length||e.contains(document.body,s.$keyboard[0])))&&s.startup(),s.watermark||s.el.value!==s.inPlaceholder||s.$el.removeClass("ui-keyboard-placeholder").val(""),s.originalContent=s.$el.val(),s.$preview.val(s.originalContent),i.acceptValid&&s.checkValid(),i.resetDefault&&(s.shiftActive=s.altActive=s.metaActive=!1,s.showKeySet()),i.appendLocally||"body"!==i.appendTo||s.$keyboard.css({position:"absolute",left:0,top:0}),s.$el.trigger("beforeVisible.keyboard",[s,s.el]),s.setCurrent(),s.$keyboard.show(),i.usePreview&&s.msie&&("undefined"==typeof s.width&&(s.$preview.hide(),s.width=Math.ceil(s.$keyboard.width()),s.$preview.show()),s.$preview.width(s.width)),s.position=i.position,e.ui&&e.ui.position&&!e.isEmptyObject(s.position)&&(s.position.of=s.position.of||s.$el.data("keyboardPosition")||s.$el,s.position.collision=s.position.collision||"flipfit flipfit",i.position.at=i.usePreview?i.position.orig_at:i.position.at2,s.$keyboard.position(s.position)),s.checkDecimal(),s.lineHeight=parseInt(s.$preview.css("lineHeight"),10)||parseInt(s.$preview.css("font-size"),10)+4,i.caretToEnd&&(s.last.start=s.last.end=s.originalContent.length),s.allie&&(0===s.last.end&&s.last.start>0&&(s.last.end=s.last.start),s.last.start<0&&(s.last.start=s.last.end=s.originalContent.length)),setTimeout(function(){s.opening=!1,i.initialFocus&&s.$preview.focus().caret(s.last),s.$el.trigger("visible.keyboard",[s,s.el])},10),s)},s.startup=function(){if(s.$preview=s.$el,!s.$keyboard||!s.$keyboard.length){"custom"===i.layout&&(i.layoutHash="custom"+s.customHash()),s.layout="custom"===i.layout?i.layoutHash:i.layout;var t=e.keyboard.layouts,o=i.language||t[i.layout]&&t[i.layout].lang&&t[i.layout].lang||[i.language||"en"],r=e.keyboard.language;o=o[0].split("-")[0],i.display=e.extend(!0,{},r.en.display,r[o].display,a.display),i.combos=e.extend(!0,{},r.en.combos,r[o].combos,a.combos),i.wheelMessage=r[o]&&r[o].wheelMessage||r.en.wheelMessage,i.rtl=t[i.layout]&&t[i.layout].rtl||r[o]&&r[o].rtl||!1,s.regex=r[o].comboRegex||e.keyboard.comboRegex,s.decimal=/^\./.test(i.display.dec)?!0:!1,s.$el.toggleClass("rtl",i.rtl).css("direction",i.rtl?"rtl":""),"undefined"==typeof e.keyboard.builtLayouts[s.layout]&&(e.isFunction(i.create)&&i.create(s),s.$keyboard.length||s.buildKeyboard()),s.$keyboard=e.keyboard.builtLayouts[s.layout].$keyboard.clone(),i.usePreview?(i.position.at=i.position.orig_at,s.$preview=s.$el.clone(!1).removeAttr("id").removeClass("ui-keyboard-placeholder ui-keyboard-input").addClass("ui-keyboard-preview "+i.css.input).removeAttr("aria-haspopup").attr("tabindex","-1").show(),"number"==s.$preview.attr("type")&&s.$preview.attr("type","text"),e("<div />").addClass("ui-keyboard-preview-wrapper").append(s.$preview).prependTo(s.$keyboard)):e.isEmptyObject(i.position)||(i.position.at=i.position.at2)}s.preview=s.$preview[0],s.$decBtn=s.$keyboard.find(".ui-keyboard-dec"),(i.enterNavigation||"TEXTAREA"===s.el.tagName)&&s.alwaysAllowed.push(13),i.lockInput&&s.$preview.addClass("ui-keyboard-lockedinput").attr({readonly:"readonly"}),s.bindKeyboard(),s.$keyboard.appendTo(i.appendLocally?s.$el.parent():i.appendTo||"body"),s.bindKeys(),i.reposition&&e.ui&&e.ui.position&&"body"==i.appendTo&&e(window).bind("resize.keyboard",function(){s.isVisible()&&s.$keyboard.position(s.position)})},s.bindKeyboard=function(){var t,a=e.keyboard.builtLayouts[s.layout];s.$preview.unbind("keypress keyup keydown mouseup touchend ".split(" ").join(".keyboard ")).bind("keypress.keyboard",function(o){if(i.lockInput)return!1;var r,n=s.last.key=String.fromCharCode(o.charCode||o.which);if(s.$lastKey=[],s.checkCaret&&(r=s.$preview.caret(),s.last.start=r.start,s.last.end=r.end),s.capsLock=n>=65&&90>=n&&!o.shiftKey||n>=97&&122>=n&&o.shiftKey?!0:!1,i.restrictInput){if((8===o.which||0===o.which)&&e.inArray(o.keyCode,s.alwaysAllowed))return;-1===e.inArray(n,a.acceptedKeys)&&(o.preventDefault(),t=e.extend({},o),t.type="restricted",s.$el.trigger(t,[s,s.el]),e.isFunction(i.restricted)&&i.restricted(t,s,s.el))}else if((o.ctrlKey||o.metaKey)&&(97===o.which||99===o.which||118===o.which||o.which>=120&&o.which<=122))return;a.hasMappedKeys&&a.mappedKeys.hasOwnProperty(n)&&(s.last.key=a.mappedKeys[n],s.insertText(s.last.key),o.preventDefault()),s.checkMaxLength()}).bind("keyup.keyboard",function(t){switch(t.which){case 9:if(s.tab&&i.tabNavigation&&!i.lockInput){s.shiftActive=t.shiftKey;var a=e.keyboard.keyaction.tab(s);if(s.tab=!1,!a)return!1}else t.preventDefault();break;case 27:return s.close(),!1}return clearTimeout(s.throttled),s.throttled=setTimeout(function(){s.isVisible()&&s.checkCombos()},100),s.checkMaxLength(),s.$el.trigger("change.keyboard",[s,s.el]),s.last.val=s.$preview.val(),e.isFunction(i.change)?(i.change(e.Event("change"),s,s.el),!1):void 0}).bind("keydown.keyboard",function(t){switch(t.which){case 8:e.keyboard.keyaction.bksp(s,null,t),t.preventDefault();break;case 9:return i.tabNavigation?(s.tab=!0,!1):(s.tab=!0,!1);case 13:e.keyboard.keyaction.enter(s,null,t);break;case 20:s.shiftActive=s.capsLock=!s.capsLock,s.showKeySet(this);break;case 86:if(t.ctrlKey||t.metaKey){if(i.preventPaste)return void t.preventDefault();s.checkCombos()}}}).bind("mouseup.keyboard touchend.keyboard",function(){if(s.checkCaret){var e=s.$preview.caret();s.last.start=e.start,s.last.end=e.end}}),s.$keyboard.bind("mousedown.keyboard click.keyboard touchstart.keyboard",function(t){t.stopPropagation(),s.isCurrent()||(s.reveal(),e(document).trigger("checkkeyboard.keyboard"))}),i.preventPaste&&(s.$preview.bind("contextmenu.keyboard",function(e){e.preventDefault()}),s.$el.bind("contextmenu.keyboard",function(e){e.preventDefault()}))},s.bindKeys=function(){var t=(i.keyBinding+" repeater mouseenter mouseleave touchstart mousewheel mouseup click ").split(" ").join(".keyboard ")+"mouseleave mousedown touchstart touchend touchmove touchcancel ".split(" ").join(".kb ");s.$allKeys=s.$keyboard.find("button.ui-keyboard-button").unbind(t).bind(i.keyBinding.split(" ").join(".keyboard ")+".keyboard repeater.keyboard",function(t){if(t.preventDefault(),!s.$keyboard.is(":visible"))return!1;var a,o=e(this),r=o.attr("data-action"),n=(new Date).getTime();if(r=":"===r?":":r.split(":")[0],!(n-(s.last.eventTime||0)<i.preventDoubleEventTime)){if(s.last.eventTime=n,s.$preview.focus(),s.$lastKey=o,s.last.key=o.attr("data-curtxt"),s.checkCaret&&s.$preview.caret(s.last),r.match("meta")&&(r="meta"),e.keyboard.keyaction.hasOwnProperty(r)&&e(this).hasClass("ui-keyboard-actionkey")){if(e.keyboard.keyaction[r](s,this,t)===!1)return!1}else"undefined"!=typeof r&&(a=s.last.key=s.wheel&&!e(this).hasClass("ui-keyboard-actionkey")?s.last.key:r,s.insertText(a),s.capsLock||i.stickyShift||t.shiftKey||(s.shiftActive=!1,s.showKeySet(this)));return s.$preview.focus().caret(s.last),s.checkCombos(),s.checkMaxLength(),s.$el.trigger("change.keyboard",[s,s.el]),s.last.val=s.$preview.val(),e.isFunction(i.change)?(i.change(e.Event("change"),s,s.el),!1):void 0}}).bind("mouseenter.keyboard mouseleave.keyboard touchstart.keyboard",function(t){if(s.isCurrent()){var a=e(this),o=a.data("layers")||s.getLayers(a);a.data("layers",o=e.grep(o,function(t,a){return e.inArray(t,o)===a})),"mouseenter"!==t.type&&"touchstart"!==t.type||"password"===s.el.type||a.hasClass(i.css.buttonDisabled)||a.addClass(i.css.buttonHover).attr("title",function(e,a){return s.wheel&&""===a&&s.sets&&o.length>1&&"touchstart"!==t.type?i.wheelMessage:a}),"mouseleave"===t.type&&(a.data({curtxt:a.data("original"),curnum:0}),a.removeClass("password"===s.el.type?"":i.css.buttonHover).attr("title",function(e,t){return t===i.wheelMessage?"":t}).find("span").html(a.data("original")))}}).bind("mouseup.keyboard mouseleave.kb touchend.kb touchmove.kb touchcancel.kb",function(t){return/(mouseleave|touchend|touchcancel)/i.test(t.type)?e(this).removeClass(i.css.buttonHover):(s.isVisible()&&s.isCurrent()&&s.$preview.focus(),s.checkCaret&&s.$preview.caret(s.last)),s.mouseRepeat=[!1,""],clearTimeout(s.repeater),!1}).bind("click.keyboard",function(){return!1}).not(".ui-keyboard-actionkey").bind("mousewheel.keyboard",function(t,a){if(s.wheel){a=a||t.deltaY;var i,o,r=e(this);return o=r.data("layers")||s.getLayers(r),o.length>1?(i=r.data("curnum")+(a>0?-1:1),i>o.length-1&&(i=0),0>i&&(i=o.length-1)):i=0,r.data({curnum:i,layers:o,curtxt:o[i]}),r.find("span").html(o[i]),!1}}).add(".ui-keyboard-tab, .ui-keyboard-bksp, .ui-keyboard-space, .ui-keyboard-enter",s.$keyboard).bind("mousedown.kb touchstart.kb",function(){if(0!==i.repeatRate){var t=e(this);s.mouseRepeat=[!0,t],setTimeout(function(){s.mouseRepeat[0]&&s.mouseRepeat[1]===t&&s.repeatKey(t)},i.repeatDelay)}return!1})},s.insertText=function(e){var t,a,i,o=s.$preview.val(),r=s.$preview.caret(),n=s.$preview.scrollLeft(),l=s.$preview.scrollTop(),c=o.length;r.end<r.start&&(r.end=r.start),r.start>c&&(r.end=r.start=c),"TEXTAREA"===s.preview.tagName&&(s.msie&&"\n"===o.substr(r.start,1)&&(r.start+=1,r.end+=1),i=o.split("\n").length-1,s.preview.scrollTop=i>0?s.lineHeight*i:l),t="bksp"===e&&r.start===r.end?!0:!1,e="bksp"===e?"":e,a=r.start+(t?-1:e.length),n+=parseInt(s.$preview.css("fontSize"),10)*("bksp"===e?-1:1),s.$preview.val(s.$preview.val().substr(0,r.start-(t?1:0))+e+s.$preview.val().substr(r.end)).scrollLeft(n).caret(a,a),s.last.start=s.last.end=a},s.checkMaxLength=function(){var e,t,a=s.$preview.val();i.maxLength!==!1&&a.length>i.maxLength&&(e=s.$preview.caret().start,t=Math.min(e,i.maxLength),i.maxInsert||(a=s.last.val,t=e-1),s.$preview.val(a.substring(0,i.maxLength)),s.$preview.caret(t,t),s.last.start=s.last.end=t),s.$decBtn.length&&s.checkDecimal()},s.repeatKey=function(e){e.trigger("repeater.keyboard"),s.mouseRepeat[0]&&(s.repeater=setTimeout(function(){s.repeatKey(e)},s.repeatTime))},s.showKeySet=function(e){var t="",a=(s.shiftActive?1:0)+(s.altActive?2:0);return s.shiftActive||(s.capsLock=!1),s.metaActive?(t=e&&e.name&&/meta/i.test(e.name)?e.name:"",""===t?t=s.metaActive===!0?"":s.metaActive:s.metaActive=t,(!i.stickyShift&&s.last.keyset[2]!==s.metaActive||(s.shiftActive||s.altActive)&&!s.$keyboard.find(".ui-keyboard-keyset-"+t+s.rows[a]).length)&&(s.shiftActive=s.altActive=!1)):!i.stickyShift&&s.last.keyset[2]!==s.metaActive&&s.shiftActive&&(s.shiftActive=s.altActive=!1),a=(s.shiftActive?1:0)+(s.altActive?2:0),t=0!==a||s.metaActive?""===t?"":"-"+t:"-normal",s.$keyboard.find(".ui-keyboard-keyset"+t+s.rows[a]).length?(s.$keyboard.find(".ui-keyboard-alt, .ui-keyboard-shift, .ui-keyboard-actionkey[class*=meta]").removeClass(i.css.buttonAction).end().find(".ui-keyboard-alt")[s.altActive?"addClass":"removeClass"](i.css.buttonAction).end().find(".ui-keyboard-shift")[s.shiftActive?"addClass":"removeClass"](i.css.buttonAction).end().find(".ui-keyboard-lock")[s.capsLock?"addClass":"removeClass"](i.css.buttonAction).end().find(".ui-keyboard-keyset").hide().end().find(".ui-keyboard-keyset"+t+s.rows[a]).show().end().find(".ui-keyboard-actionkey.ui-keyboard"+t).addClass(i.css.buttonAction),void(s.last.keyset=[s.shiftActive,s.altActive,s.metaActive])):(s.shiftActive=s.last.keyset[0],s.altActive=s.last.keyset[1],void(s.metaActive=s.last.keyset[2]))},s.checkCombos=function(){if(!s.isVisible())return s.$preview.val();var t,a,o,r,n=s.$preview.val(),l=s.$preview.caret(),c=e.keyboard.builtLayouts[s.layout],d=n.length;if(l.end<l.start&&(l.end=l.start),l.start>d&&(l.end=l.start=d),s.msie&&"\n"===n.substr(l.start,1)&&(l.start+=1,l.end+=1),i.useCombos&&(s.msie?n=n.replace(s.regex,function(e,t,a){return i.combos.hasOwnProperty(t)?i.combos[t][a]||e:e}):s.$preview.length&&(o=l.start-(l.start-2>=0?2:0),s.$preview.caret(o,l.end),r=(s.$preview.caret().text||"").replace(s.regex,function(e,t,a){return i.combos.hasOwnProperty(t)?i.combos[t][a]||e:e}),s.$preview.val(s.$preview.caret().replace(r)),n=s.$preview.val())),i.restrictInput&&""!==n){for(o=n,a=c.acceptedKeys.length,t=0;a>t;t++)""!==o&&(r=c.acceptedKeys[t],n.indexOf(r)>=0&&(/[\[|\]|\\|\^|\$|\.|\||\?|\*|\+|\(|\)|\{|\}]/g.test(r)&&(r="\\"+r),o=o.replace(new RegExp(r,"g"),"")));""!==o&&(n=n.replace(o,""))}return l.start+=n.length-d,l.end+=n.length-d,s.$preview.val(n),s.$preview.caret(l.start,l.end),s.preview.scrollTop=s.lineHeight*(n.substring(0,l.start).split("\n").length-1),s.last.start=l.start,s.last.end=l.end,i.acceptValid&&s.checkValid(),n},s.checkValid=function(){var e=!0;i.validate&&"function"==typeof i.validate&&(e=i.validate(s,s.$preview.val(),!1)),s.$keyboard.find(".ui-keyboard-accept")[e?"removeClass":"addClass"]("ui-keyboard-invalid-input")[e?"addClass":"removeClass"]("ui-keyboard-valid-input")},s.checkDecimal=function(){s.decimal&&/\./g.test(s.preview.value)||!s.decimal&&/\,/g.test(s.preview.value)?s.$decBtn.attr({disabled:"disabled","aria-disabled":"true"}).removeClass(i.css.buttonDefault+" "+i.css.buttonHover).addClass(i.css.buttonDisabled):s.$decBtn.removeAttr("disabled").attr({"aria-disabled":"false"}).addClass(i.css.buttonDefault).removeClass(i.css.buttonDisabled)},s.getLayers=function(t){var a,i;return a=t.attr("data-pos"),i=t.closest(".ui-keyboard").find('button[data-pos="'+a+'"]').map(function(){return e(this).find("> span").html()}).get()},s.switchInput=function(t,a){if("function"==typeof i.switchInput)i.switchInput(s,t,a);else{s.$keyboard.length&&s.$keyboard.hide();var o,r=!1,n=e("button, input, textarea, a").filter(":visible").not(":disabled"),l=n.index(s.$el)+(t?1:-1);if(s.$keyboard.length&&s.$keyboard.show(),l>n.length-1&&(r=i.stopAtEnd,l=0),0>l&&(r=i.stopAtEnd,l=n.length-1),!r){if(a=s.close(a),!a)return;o=n.eq(l).data("keyboard"),o&&o.options.openOn.length?o.focusOn():n.eq(l).focus()}}return!1},s.close=function(t){if(s.isOpen){clearTimeout(s.throttled);var a=t?s.checkCombos():s.originalContent;if(t&&i.validate&&"function"==typeof i.validate&&!i.validate(s,a,!0)&&(a=s.originalContent,t=!1,i.cancelClose))return;s.isCurrent(!1),s.isOpen=!1,s.$preview.val(a),s.$el.removeClass("ui-keyboard-input-current ui-keyboard-autoaccepted").addClass(t?t===!0?"":"ui-keyboard-autoaccepted":"").trigger(i.alwaysOpen?"":"beforeClose.keyboard",[s,s.el,t||!1]).val(a).scrollTop(s.el.scrollHeight).trigger(t?"accepted.keyboard":"canceled.keyboard",[s,s.el]).trigger(i.alwaysOpen?"inactive.keyboard":"hidden.keyboard",[s,s.el]).blur(),i.openOn&&(s.timer=setTimeout(function(){s.$el.bind(i.openOn+".keyboard",function(){s.focusOn()}),e(":focus")[0]===s.el&&s.$el.blur()},500)),!i.alwaysOpen&&s.$keyboard&&(s.$keyboard.remove(),s.$keyboard=[]),s.watermark||""!==s.el.value||""===s.inPlaceholder||s.$el.addClass("ui-keyboard-placeholder").val(s.inPlaceholder),s.$el.trigger("change")}return!!t},s.accept=function(){return s.close(!0)},s.escClose=function(e){return e&&"keyup"===e.type?27===e.which?s.close():"":void(s.isOpen&&(!s.isCurrent()&&s.isOpen||s.isOpen&&e.target!==s.el&&!i.stayOpen)&&(s.allie&&e.preventDefault(),s.close(i.autoAccept?"true":!1)))},s.keyBtn=e("<button />").attr({role:"button",type:"button","aria-disabled":"false",tabindex:"-1"}).addClass("ui-keyboard-button"),s.addKey=function(t,a,o){var r,n,l,c,d,u=a.split(":"),p=u.length-1,b=o===!0?t:i.display[u[0]]||t,y=o===!0?t.charCodeAt(0):t;return/\(.+\)/.test(b)&&(c=b.replace(/\(([^()]+)\)/,""),l=b.match(/\(([^()]+)\)/)[1],b=c,d=c.split(":"),c=""!==d[0]&&d.length>1?d[0]:c,e.keyboard.builtLayouts[s.layout].mappedKeys[l]=c),d=b.split(":"),""===d[0]&&""===d[1]&&(b=":"),b=""!==d[0]&&d.length>1?d[0]:b,b=e.trim(o?b:u[1]||b),r=d.length>1?e.trim(d[1]).replace(/_/g," ")||"":p>0?u[p]||"":"",n=b.length>2?" ui-keyboard-widekey":"",n+=o?"":" ui-keyboard-actionkey",s.keyBtn.clone().attr({"data-value":b,name:y,"data-pos":s.temp[1]+","+s.temp[2],title:r,"data-action":t,"data-original":b,"data-curtxt":b,"data-curnum":0}).addClass((""===y?"":"ui-keyboard-"+y+n+" ")+i.css.buttonDefault).html("<span>"+b+"</span>").appendTo(s.temp[0])},s.customHash=function(){var e,t,a,s,o,r=i.customLayout,n=[],l=[];for(t in r)r.hasOwnProperty(t)&&n.push(r[t]);if(l=l.concat.apply(l,n).join(" "),a=0,o=l.length,0===o)return a;for(e=0;o>e;e++)s=l.charCodeAt(e),a=(a<<5)-a+s,a&=a;return a},s.buildKeyboard=function(){var t,a,o,r,n,l,c,d,u,p=0,b=e.keyboard.builtLayouts[s.layout]={mappedKeys:{},acceptedKeys:[]},y=b.acceptedKeys=[],h=e("<div />").addClass("ui-keyboard "+i.css.container+(i.alwaysOpen?" ui-keyboard-always-open":"")).attr({role:"textbox"}).hide();return"custom"!==i.layout&&e.keyboard.layouts.hasOwnProperty(i.layout)||(i.layout="custom",e.keyboard.layouts.custom=i.customLayout||{normal:["{cancel}"]}),e.each(e.keyboard.layouts[i.layout],function(b,k){var v;if(""!==b&&!/^(name|lang|rtl)$/i.test(b))for("default"===b&&(b="normal"),p++,r=e("<div />").attr("name",b).addClass("ui-keyboard-keyset ui-keyboard-keyset-"+b).appendTo(h)["normal"===b?"show":"hide"](),o=0;o<k.length;o++){for(l=e.trim(k[o]).replace(/\{(\.?)[\s+]?:[\s+]?(\.?)\}/g,"{$1:$2}"),d=l.split(/\s+/),c=0;c<d.length;c++)if(s.temp=[r,o,c],n=!1,0!==d[c].length)if(/^\{\S+\}$/.test(d[c])){if(a=d[c].match(/^\{(\S+)\}$/)[1],/\!\!/.test(a)&&(a=a.replace("!!",""),n=!0),/^sp:((\d+)?([\.|,]\d+)?)(em|px)?$/i.test(a)&&(u=parseFloat(a.replace(/,/,".").match(/^sp:((\d+)?([\.|,]\d+)?)(em|px)?$/i)[1]||0),e("<span>&nbsp;</span>").width(a.match(/px/i)?u+"px":2*u+"em").addClass("ui-keyboard-button ui-keyboard-spacer").appendTo(r)),/^empty(:((\d+)?([\.|,]\d+)?)(em|px)?)?$/i.test(a)&&(u=/:/.test(a)?parseFloat(a.replace(/,/,".").match(/^empty:((\d+)?([\.|,]\d+)?)(em|px)?$/i)[1]||0):"",s.addKey(""," ").addClass(i.css.buttonDisabled+" "+i.css.buttonEmpty).attr("aria-disabled",!0).width(u?a.match("px")?u+"px":2*u+"em":"")),/^meta\d+\:?(\w+)?/i.test(a)){s.addKey(a.split(":")[0],a);continue}switch(v=a.split(":"),v[0].toLowerCase()){case"a":case"accept":s.addKey("accept",a).addClass(i.css.buttonAction);break;case"alt":case"altgr":s.addKey("alt",a);break;case"b":case"bksp":s.addKey("bksp",a);break;case"c":case"cancel":s.addKey("cancel",a).addClass(i.css.buttonAction);break;case"combo":s.addKey("combo",a).addClass(i.css.buttonAction);break;case"dec":y.push(s.decimal?".":","),s.addKey("dec",a);break;case"e":case"enter":s.addKey("enter",a).addClass(i.css.buttonAction);break;case"s":case"shift":s.addKey("shift",a);break;case"sign":y.push("-"),s.addKey("sign",a);break;case"space":y.push(" "),s.addKey("space",a);break;case"t":case"tab":s.addKey("tab",a);break;default:e.keyboard.keyaction.hasOwnProperty(v[0])&&s.addKey(v[0],a)[n?"addClass":"removeClass"](i.css.buttonAction)}}else t=d[c],y.push(":"===t?t:t.split(":")[0]),s.addKey(t,t,!0);r.find(".ui-keyboard-button:last").after('<br class="ui-keyboard-button-endrow">')}}),p>1&&(s.sets=!0),b.hasMappedKeys=!e.isEmptyObject(b.mappedKeys),b.$keyboard=h,h},s.destroy=function(){e(document).unbind("mousedown.keyboard keyup.keyboard touchstart.keyboard"),s.$keyboard.length&&s.$keyboard.remove();var t=e.trim(i.openOn+" accepted beforeClose canceled change contextmenu hidden initialized keydown keypress keyup visible ").split(" ").join(".keyboard ");s.$el.removeClass("ui-keyboard-input ui-keyboard-lockedinput ui-keyboard-placeholder ui-keyboard-notallowed ui-keyboard-always-open "+i.css.input).removeAttr("aria-haspopup").removeAttr("role").unbind(t+".keyboard").removeData("keyboard")},s.init()},e.keyboard.keyaction={accept:function(e){return e.close(!0),!1},alt:function(e,t){e.altActive=!e.altActive,e.showKeySet(t)},bksp:function(e){e.insertText("bksp")},cancel:function(e){return e.close(),!1},clear:function(e){e.$preview.val("")},combo:function(e){var t=!e.options.useCombos;return e.options.useCombos=t,e.$keyboard.find(".ui-keyboard-combo").toggleClass(e.options.css.buttonAction,t),t&&e.checkCombos(),!1},dec:function(e){e.insertText(e.decimal?".":",")},"default":function(e,t){e.shiftActive=e.altActive=e.metaActive=!1,e.showKeySet(t)},enter:function(t,a,i){var s=t.el.tagName,o=t.options;return i.shiftKey?o.enterNavigation?t.switchInput(!i[o.enterMod],!0):t.close(!0):o.enterNavigation&&("TEXTAREA"!==s||i[o.enterMod])?t.switchInput(!i[o.enterMod],o.autoAccept?"true":!1):void("TEXTAREA"===s&&e(i.target).closest("button").length&&t.insertText(" \n"))},lock:function(e,t){e.last.keyset[0]=e.shiftActive=e.capsLock=!e.capsLock,e.showKeySet(t)},left:function(e){var t=e.$preview.caret();t.start-1>=0&&(e.last.start=e.last.end=t.start-1)},meta:function(t,a){t.metaActive=e(a).hasClass(t.options.css.buttonAction)?!1:!0,t.showKeySet(a)},next:function(e){return e.switchInput(!0,e.options.autoAccept),!1},prev:function(e){return e.switchInput(!1,e.options.autoAccept),!1},right:function(e){var t=e.$preview.caret();t.start+1<=e.$preview.val().length&&(e.last.start=e.last.end=t.start+1)},shift:function(e,t){e.last.keyset[0]=e.shiftActive=!e.shiftActive,e.showKeySet(t)},sign:function(e){/^\-?\d*\.?\d*$/.test(e.$preview.val())&&e.$preview.val(-1*e.$preview.val())},space:function(e){e.insertText(" ")},tab:function(e){var t=e.el.tagName,a=e.options;return"INPUT"===t?a.tabNavigation?e.switchInput(!e.shiftActive,!0):!1:void e.insertText("	")}},e.keyboard.builtLayouts={},e.keyboard.layouts={alpha:{normal:["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}","{tab} a b c d e f g h i j [ ] \\","k l m n o p q r s ; ' {enter}","{shift} t u v w x y z , . / {shift}","{accept} {space} {cancel}"],shift:["~ ! @ # $ % ^ & * ( ) _ + {bksp}","{tab} A B C D E F G H I J { } |",'K L M N O P Q R S : " {enter}',"{shift} T U V W X Y Z < > ? {shift}","{accept} {space} {cancel}"]},qwerty:{normal:["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}","{tab} q w e r t y u i o p [ ] \\","a s d f g h j k l ; ' {enter}","{shift} z x c v b n m , . / {shift}","{accept} {space} {cancel}"],shift:["~ ! @ # $ % ^ & * ( ) _ + {bksp}","{tab} Q W E R T Y U I O P { } |",'A S D F G H J K L : " {enter}',"{shift} Z X C V B N M < > ? {shift}","{accept} {space} {cancel}"]},international:{normal:["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}","{tab} q w e r t y u i o p [ ] \\","a s d f g h j k l ; ' {enter}","{shift} z x c v b n m , . / {shift}","{accept} {alt} {space} {alt} {cancel}"],shift:["~ ! @ # $ % ^ & * ( ) _ + {bksp}","{tab} Q W E R T Y U I O P { } |",'A S D F G H J K L : " {enter}',"{shift} Z X C V B N M < > ? {shift}","{accept} {alt} {space} {alt} {cancel}"],alt:["~ ¡ ² ³ ¤ € ¼ ½ ¾ ‘ ’ ¥ × {bksp}","{tab} ä å é ® þ ü ú í ó ö « » ¬","á ß ð f g h j k ø ¶ ´ {enter}","{shift} æ x © v b ñ µ ç > ¿ {shift}","{accept} {alt} {space} {alt} {cancel}"],"alt-shift":["~ ¹ ² ³ £ € ¼ ½ ¾ ‘ ’ ¥ ÷ {bksp}","{tab} Ä Å É ® Þ Ü Ú Í Ó Ö « » ¦","Ä § Ð F G H J K Ø ° ¨ {enter}","{shift} Æ X ¢ V B Ñ µ Ç . ¿ {shift}","{accept} {alt} {space} {alt} {cancel}"]},colemak:{normal:["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}","{tab} q w f p g j l u y ; [ ] \\","{bksp} a r s t d h n e i o ' {enter}","{shift} z x c v b k m , . / {shift}","{accept} {space} {cancel}"],shift:["~ ! @ # $ % ^ & * ( ) _ + {bksp}","{tab} Q W F P G J L U Y : { } |",'{bksp} A R S T D H N E I O " {enter}',"{shift} Z X C V B K M < > ? {shift}","{accept} {space} {cancel}"]},dvorak:{normal:["` 1 2 3 4 5 6 7 8 9 0 [ ] {bksp}","{tab} ' , . p y f g c r l / = \\","a o e u i d h t n s - {enter}","{shift} ; q j k x b m w v z {shift}","{accept} {space} {cancel}"],shift:["~ ! @ # $ % ^ & * ( ) { } {bksp}",'{tab} " < > P Y F G C R L ? + |',"A O E U I D H T N S _ {enter}","{shift} : Q J K X B M W V Z {shift}","{accept} {space} {cancel}"]},num:{normal:["1 2 3","4 5 6","7 8 9",". 0 {b}","{a} {c}"]}},e.keyboard.language=e.extend({},e.keyboard.language,{en:{display:{a:"✔:Accept (Shift-Enter)",accept:"Accept:Accept (Shift-Enter)",alt:"Alt:⌥ AltGr",b:"⌫:Backspace",bksp:"Bksp:Backspace",c:"✖:Cancel (Esc)",cancel:"Cancel:Cancel (Esc)",clear:"C:Clear",combo:"ö:Toggle Combo Keys",dec:".:Decimal",e:"⏎:Enter",empty:" ",enter:"Enter:Enter ⏎",left:"←",lock:"Lock:⇪ Caps Lock",next:"Next ⇨",prev:"⇦ Prev",right:"→",s:"⇧:Shift",shift:"Shift:Shift",sign:"±:Change Sign",space:"&nbsp;:Space",t:"⇥:Tab",tab:"⇥ Tab:Tab"},wheelMessage:"Use mousewheel to see other keys",comboRegex:/([`\'~\^\"ao])([a-z])/gim,combos:{"`":{a:"à",A:"À",e:"è",E:"È",i:"ì",I:"Ì",o:"ò",O:"Ò",u:"ù",U:"Ù",y:"ỳ",Y:"Ỳ"},"'":{a:"á",A:"Á",e:"é",E:"É",i:"í",I:"Í",o:"ó",O:"Ó",u:"ú",U:"Ú",y:"ý",Y:"Ý"},'"':{a:"ä",A:"Ä",e:"ë",E:"Ë",i:"ï",I:"Ï",o:"ö",O:"Ö",u:"ü",U:"Ü",y:"ÿ",Y:"Ÿ"},"^":{a:"â",A:"Â",e:"ê",E:"Ê",i:"î",I:"Î",o:"ô",O:"Ô",u:"û",U:"Û",y:"ŷ",Y:"Ŷ"},"~":{a:"ã",A:"Ã",e:"ẽ",E:"Ẽ",i:"ĩ",I:"Ĩ",o:"õ",O:"Õ",u:"ũ",U:"Ũ",y:"ỹ",Y:"Ỹ",n:"ñ",N:"Ñ"}}}}),e.keyboard.defaultOptions={language:null,rtl:!1,layout:"qwerty",customLayout:null,position:{of:null,my:"center top",at:"center top",at2:"center bottom"},reposition:!0,usePreview:!0,alwaysOpen:!1,initialFocus:!0,stayOpen:!1,css:{input:"ui-widget-content ui-corner-all",container:"ui-widget-content ui-widget ui-corner-all ui-helper-clearfix",buttonDefault:"ui-state-default ui-corner-all",buttonHover:"ui-state-hover",buttonAction:"ui-state-active",buttonDisabled:"ui-state-disabled",buttonEmpty:"ui-keyboard-empty"},autoAccept:!1,lockInput:!1,restrictInput:!1,acceptValid:!1,cancelClose:!0,tabNavigation:!1,enterNavigation:!1,enterMod:"altKey",stopAtEnd:!0,appendLocally:!1,appendTo:"body",stickyShift:!0,preventPaste:!1,caretToEnd:!1,maxLength:!1,maxInsert:!0,repeatDelay:500,repeatRate:20,resetDefault:!1,openOn:"focus",keyBinding:"mousedown touchstart",useCombos:!0,validate:function(e,t,a){return!0}},e.keyboard.comboRegex=/([`\'~\^\"ao])([a-z])/gim,e.keyboard.currentKeyboard="",e.fn.keyboard=function(t){return this.each(function(){e(this).data("keyboard")||new e.keyboard(this,t)})},e.fn.getkeyboard=function(){return this.data("keyboard")}}(jQuery),function(e,t,a,i){"use strict";e.fn.caret=function(e,s){if("undefined"==typeof this[0]||this.is(":hidden")||"hidden"===this.css("visibility"))return this;var o,r,n,l,c,d,u,p,b,y=document.selection,h=this[0],k=h.scrollTop,v=!1,f=!0;try{v="selectionStart"in h}catch(m){f=!1}return"object"==typeof e&&"start"in e&&"end"in e?(r=e.start,l=e.end):"number"==typeof e&&"number"==typeof s&&(r=e,l=s),f&&"undefined"!=typeof r?(/(email|number)/i.test(h.type)||(v?(h.selectionStart=r,h.selectionEnd=l):(c=h.createTextRange(),c.collapse(!0),c.moveStart("character",r),c.moveEnd("character",l-r),c.select())),(this.is(":visible")||"hidden"!==this.css("visibility"))&&this.focus(),h.scrollTop=k,this):(/(email|number)/i.test(h.type)?o=n=this.val().length:v?(o=h.selectionStart,n=h.selectionEnd):y?"TEXTAREA"===h.tagName?(b=this.val(),d=y[a](),u=d[i](),u.moveToElementText(h),u.setEndPoint("EndToEnd",d),o=u.text.replace(/\r/g,"\n")[t],n=o+d.text.replace(/\r/g,"\n")[t]):(b=this.val().replace(/\r/g,"\n"),d=y[a]()[i](),d.moveEnd("character",b[t]),o=""===d.text?b[t]:b.lastIndexOf(d.text),d=y[a]()[i](),d.moveStart("character",-b[t]),n=d.text[t]):(o=0,n=(h.value||"").length),p=(h.value||"").substring(o,n),{start:o,end:n,text:p,replace:function(e){return h.value.substring(0,o)+e+h.value.substring(n,h.value[t])}})}}(jQuery,"length","createRange","duplicate");