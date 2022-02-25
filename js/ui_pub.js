// browser check
var Browser = {chk : navigator.userAgent.toLowerCase()}
Browser = {ie : Browser.chk.indexOf('msie') != -1, ie6 : Browser.chk.indexOf('msie 6') != -1, ie7 : Browser.chk.indexOf('msie 7') != -1, ie8 : Browser.chk.indexOf('msie 8') != -1, ie9 : Browser.chk.indexOf('msie 9') != -1, ie10 : Browser.chk.indexOf('msie 10') != -1, ie11 : Browser.chk.indexOf('msie 11') != -1, opera : !!window.opera, safari : Browser.chk.indexOf('safari') != -1, safari3 : Browser.chk.indexOf('applewebkir/5') != -1, mac : Browser.chk.indexOf('mac') != -1, chrome : Browser.chk.indexOf('chrome') != -1, firefox : Browser.chk.indexOf('firefox') != -1}  
var responCheck = Browser.ie7 || Browser.ie8;
if (Browser.ie7) {$("html").addClass("ie7");
	} else if(Browser.ie8){$("html").addClass("ie8");
	} else { //
}

if (window.console == undefined) {console={log:function(){} };}
var GJB = GJB || {};
var GJB = {
	init : function(){
		GJB.ini.init();
		GJB.winScroll();
		GJB.tab.init();
		GJB.menuAll.init();
		GJB.accordion.init();
		//GJB.accordion2.init();	// 삭제예정
		GJB.dsgnForm();				//[스크립트이관]일반 체크/라디오
		GJB.dsgnRdo();				//[스크립트이관]박스형라디오
		GJB.fixedSticker.ini();
		GJB.GNB();
		//GJB.mainpage();
		GJB.fieldSize();
		GJB.breadcrumb();
		GJB.familySite();
		GJB.selChange();
	},

	// global scroll
	winScroll : function(){
		var win = $(window),
		body = $('body'),
		sec = $('.sec');

		win.on('load scroll', function(){
			GJB.fixedSticker.ini();
		});

		win.on('resize', function(){
			GJB.fixedSticker.ini();
		});
	},

	// GNB
	GNB : function() {
		var delay = 200, setTimeOutConst;
		var $lnb = $(".gnb > ul > li");
		var $anchor = $lnb.find(">a");

		var gnbLast = ($(".gnb > ul > li").last().find(".inner-box .box-local:last-child").find("li:last-child"));
		gnbLast.find(">a").addClass("gnb-last");

		$anchor.on("mouseenter focusin", function() {
			var $anchorLi = $(this).parent();
			var $depth = $(this).next(".gnb-ext");
			setTimeOutConst = setTimeout(function() {
				$lnb.removeClass("on");
				if ($depth.length) {
					$anchorLi.addClass("on")
				}
			}, delay);

      console.log($(".gnb-ext .inner-box > .box-local > strong").css("height"));
      console.log($(".gnb-ext .inner-box > .box-local > strong").actual("height"));

		});
		$("#gnb_menu").on("mouseleave", function() {
			clearTimeout(setTimeOutConst);
			if ($lnb.hasClass("on")) {
				$lnb.removeClass("on");
			}
		});
		$(".gnb-last").on("blur", function() {
			$lnb.removeClass("on");
		});

		// gnb : 2depth first column check
		$(".gnb-ext .inner-box").each(function() {
			$(this).find(" > .box-local").each(function(i) {
				var localNum = (i % 5) + 1;
				$(this).addClass("ver_clmn" + parseInt(localNum));
			});
		});
		
		// gnb : 3depth be
		var nodeCheck = $(".box-local > .local-menu li");
		nodeCheck.find("> .depth-last").each(function(i) {
			if (nodeCheck.find("> .depth-last")){
				$(this).closest("li").addClass("depth-be");
			}
		});
		$(document).on("click", ".box-local .depth-be > a", function(){
			alert("111");
			var $gnbAcc = $(this).closest(".depth-be");
			console.log($gnbAcc);
			if ($gnbAcc.hasClass("on")){
				$gnbAcc.find("> .depth-last").slideUp(150, function(){
					$gnbAcc.removeClass("on");
				});
			} else {
				if ($(this).closest(".local-menu").hasClass("sync")){
					console.log("sync");
					$(".inner-box .depth-be").removeClass("on");
					$(".inner-box .depth-be").find("> .depth-last").slideUp(150);
				}
				$gnbAcc.addClass("on");
				$gnbAcc.find("> .depth-last").slideDown(150);
			}
		});

		//util layer
		$(".major-serice > li.crd > a").each(function(e){
			$(this).click(function(e) {
				e.preventDefault();
				var accLi = $(this).parent("li");
				if (accLi.hasClass("active")){
					$(".major-serice > li").removeClass("active").find(".layer-list").hide();
				} else {
					$(".major-serice > li").removeClass("active").find(".layer-list").hide();
					accLi.addClass("active").end().next().show();
				}
			});
			$(document).mousedown(".major-serice", function(e){
				var $tar = $(e.target);
				if(!$tar.is('.major-serice a')){
					$('.major-serice > li').removeClass('active');
					$('.major-serice > li .layer-list').hide();
				}
			});
		});

    
	},

	//main page
	mainpage : function(){
		//console.log("main page");
	},

	//fixedStickerButton
	fixedSticker : {
		ini : function(){
		if ($(".direct-sticker").length){
			var wTop = $(window).scrollTop();
			var stickerEle = $(".direct-sticker");
			var offsetTop = stickerEle.offset().top;
			if(wTop > 146){
				$(".fix-topper").fadeIn("fast");
			} else {
				$(".fix-topper").fadeOut("fast");
			}
			if(wTop < 139){
				stickerEle.css({"z-index":10, "top":199 - $(window).scrollTop()})
			} else {
				stickerEle.css({"z-index":0, "top":"65px"})
			}
			}
		}
	},

	// ini
	ini : {
		init: function(){
			this.event();
		},

		event: function(){
			this.action();
		},

		action: function(){
			//
		},

		// myself add class
		addOn: function(overEle){ $(overEle).addClass("on") },

		// parent add class
		addOnParent: function(overEle){ $(overEle).parent().addClass("on") },

		// remove class
		removeOn: function(outEle){ $(outEle).removeClass("on")},

		// layer popup close
		popCloseFunc : function(){
			$('.pop_loop').remove();
			//$('.layer-popup').fadeOut();
			//$(".layer-popup .pop-area").removeClass('scroll');
			//$('.layer-popup').fadeOut(function(){
			//	console.log("111");
			//	$(".layer-popup .pop-area").removeClass('scroll');
			//});

			console.log("11");
			$('.layer-popup').fadeOut();
			/* 20170922 팝업 중복 노출 후 하나를 닫으면 위치 오류 현상 때문에 삭제 테스트
			$('.layer-popup').promise().done(function() {
				$(".layer-popup .pop-area").removeClass('scroll').css({
					'margin-top' : '0'
				});
			});
			*/

			$(".layer-popup .pop-area").each(function(){
				pop_h = $(this).outerHeight();
			});

			$('body').css({'overflow':'auto','height':'auto'});
			$(".layerActive").focus().removeClass("layerActive");
		},

		// modeless close
		lessCloseFunc : function(){
			$('.less-loop').remove();
			$('.less-popup').fadeOut(function(){
				$(".layer-popup .pop-area").removeClass('scroll');
			});
			$(".layerActive").focus().removeClass("layerActive");
		}

	},


	//all menu
	menuAll : {
		init: function(){
			var $menuAll = $("#header .menu-all a");
			var $menuAllWrap = $("#header .menu-all-wrap");
			var $menuAllWrapScroll = $menuAllWrap.find(".gnb-ext");
			var $menuAllWrapClose = $menuAllWrap.find(".layer-close");
			$menuAll.click(function() {
				if (!$(this).hasClass("active")){
					$(this).addClass("active");
					$("html,body").animate({scrollTop:0}, 100);
					$menuAllWrap.show();
					$menuAllWrap.css("height", ($(window).height()) - ($("#header .top-sec").outerHeight()));
					$menuAllWrapScroll.css("height", (($menuAllWrap.outerHeight()) - ($(".menu-all-wrap .search-area").outerHeight()) - ($(".menu-all-wrap .tab-list").outerHeight())) - 62);
					$menuAllWrap.attr("tabindex", "0").focus();
					$("body").css("overflow", "hidden");
				} else {
					$(this).removeClass("active");
					$menuAllWrap.hide();
					$menuAllWrap.removeAttr("tabindex", "");
					$(this).focus();
					$("body").css("overflow", "");
				}
			});
			$menuAllWrapClose.click(function() {
				$menuAllWrap.removeAttr("tabindex", "").hide();
				$menuAll.removeClass("active").focus();
				$("body").css("overflow", "");
			});
		
			/* key check function */
			$menuAllWrap.on('keydown', function(event){
				if(event.target.className === "menu-all-wrap") {
					if (event.keyCode==9 && event.shiftKey) return false;
				}
			});
			$menuAllWrapClose.on('keydown', function(event){
				if(event.keyCode==9 && event.shiftKey){
				} else if(event.target.className === "layer-close") {
					if (event.keyCode==9) {
						$menuAllWrap.focus();
					}
				}
			});

			$(window).resize(function(){
				$menuAllWrap.css("height", ($(window).height()) - ($("#header .top-sec").outerHeight()));
				$menuAllWrapScroll.css("height", (($menuAllWrap.outerHeight()) - ($(".menu-all-wrap .search-area").outerHeight()) - ($(".menu-all-wrap .tab-list").outerHeight())) - 62);
			}).resize();
		},
	},

	// accordion [opt. addclass:"sync"]
	accordion : {
		init: function(){
			$acc = $(".as-accordion");
			$accLi = $(".as-accordion > li");
			$accThis = $accLi.find("a");
			this.event();
			$($acc).each(function(){
				if ($(this).hasClass("as-no")){
					return;
				} else if ($(this).hasClass("as-allview")){
					$(this).find("li").addClass("on").find(".toggle-ele").css("display","block");
				} else {
					$acc.not(".as-no")
						.find("li:first-child")
						.addClass("on")
						.find(".toggle-ele")
						.css("display","block");
				}
			});
			$acc.find(".title-wrap > a").each(function(index){
				$(this).attr("title", $(this).find(".title").text()+" 상세내용 보기");
				$acc.find("li")
					.first().find(".title-wrap > a")
					.attr("title", $(this).closest('.as-accordion').find("> li:first-child .title-wrap a .title").text()+" 상세내용 닫기");
			});
			
			// faq 추가타입
			if ($acc.hasClass("acco-faq")){
				$acc.find("li").each(function(){
					if ($(this).find(".toggle-ele").is(":visible")){
						$(this).closest("li").find("a").attr("title", "답변닫기");
					} else {
						$(this).closest("li").find("a").attr("title", "답변열기");
					}
				});
			}
		},
		event: function(){
			var accordion = this;
			$acc.on("click", ".title-wrap > a, .toggle-btn", function(e){
				e.preventDefault();
				if ($(this).closest(".as-accordion").hasClass("acco-faq")){
					accordion.actionFaq($(this));
				} else {
					accordion.action($(this));
				}
			});
			
		},
		action: function(eleAcc){
			var $eleAcc;
			if ($(eleAcc).parent().is("li")){
				$eleAcc = $(eleAcc).parent("li");
			}else{
				$eleAcc = $(eleAcc).parent().parent();
			}
			var $eleAccParent = $eleAcc.closest(".as-accordion");
			if ($eleAcc.hasClass("on")){
				$eleAcc.find(".toggle-ele").slideUp(150, function(){
					$eleAcc
					.removeClass("on")
					.find(".title-wrap > a").attr("title", $eleAcc.find(".title-wrap > a .title").text()+" 상세내용 보기");
				});
			} else {
				if ($eleAccParent.hasClass("sync")){
					$eleAccParent.find("li").removeClass("on");
					$eleAccParent.find(".toggle-ele").slideUp(150);
					console.log($(this).closest(".as-accordion").find(">a"));
					$acc.find(".title-wrap > a").each(function(index){						
						$(this).attr("title", $(this).find(".title").text()+" 상세내용 보기");
					});
					
				}
				$eleAcc.addClass("on");
				$eleAcc.find(".toggle-ele").slideDown(150);
				$eleAcc.find(".title-wrap > a").attr("title", $eleAcc.find(".title-wrap > a .title").text()+" 상세내용 닫기");
			}
		},
		actionFaq: function(eleAcc) {
			var $eleAcc;
			if ($(eleAcc).parent().is("li")){
				$eleAcc = $(eleAcc).parent("li");
			} else {
				$eleAcc = $(eleAcc).parent().parent();
			}
			var $eleAccParent = $eleAcc.closest(".as-accordion");
			var $eleAccParentFaq = $eleAcc.closest(".as-accordion.acco-faq");
			if ($eleAcc.hasClass("on")){
				$eleAcc.find(".toggle-ele").slideUp(150, function(){
					$eleAcc.find("a").attr("title", "답변열기");
					$eleAcc.removeClass("on");
				});
			} else {
				if ($eleAccParent.hasClass("sync")){
					$eleAccParent.find("li").removeClass("on");
					$eleAccParent.find(".toggle-ele").slideUp(150);
					$eleAccParent.find("li a").attr("title", "답변열기");
				}
				$eleAcc.addClass("on");
				$eleAcc.find(".toggle-ele").slideDown(150);
				$eleAcc.find("a").attr("title", "답변닫기");
			}
		}
	},
	
	// accordion2 [opt. addclass:"sync"]
	accordion2 : {
		init: function(){
			$acc = $(".as-accordion");
			$accLi = $(".as-accordion > .acc-box");
			$accThis = $accLi.find(".acc-title a");
			//$accThisTitle = $accThis.html();
			this.event();
			$($acc).each(function(){
				/*
				$(this).find(".acc-box").each(function(){
					$(this).find(".acc-title > .title").attr("title", $(this).find(".acc-title > .title").text()+'도움말 열기');
				});
				*/
				if ($(this).hasClass("as-no")){
						return;
				} else {
					$acc.not(".as-no")
						.find(".acc-box:first-child")
						.addClass("on")
						.find('.toggle-ele')
						.css("display","block");	
					$(".acc-box.on .title").attr("title", $(".acc-box.on .title").text()+' 도움말 닫기'); 
				}
			});
		},
		event: function(){
			var accordion = this;
			$acc.on("click", ".acc-box .acc-title > a", function(e){
				e.preventDefault();
				accordion.action($(this));
			});
		},
		action: function(eleAcc){
			var $eleAcc = $(eleAcc).closest(".acc-box");
			var $eleAccParent = $eleAcc.closest(".as-accordion");
			
			if ($eleAcc.hasClass("on")){
				$eleAcc.find(".toggle-ele").slideUp(150, function(){
					$eleAcc.removeClass("on");
					$eleAcc.find(".acc-title .title").attr('title', $(eleAcc).text()+' 도움말 열기');
				});
			} else {
				if ($eleAccParent.hasClass("sync")){
					$eleAccParent.find(".acc-box").removeClass("on");
					$eleAccParent.find(".toggle-ele").slideUp(150);
					
					$(".acc-title > .title").each(function(){
						$(this).attr("title", $(this).text()+'도움말 열기');
					});
				}

				$eleAcc.addClass("on").find(".acc-title .title").attr('title',$(eleAcc).text()+' 도움말 닫기');
				$eleAcc.find(".toggle-ele").slideDown(150);
			}
		}
	},

	// tab menu
	tab : {
		init: function(){
			if ($(".as-tab").length == 0 || $(".tab-pass").length) {return;}
			$tabEle = $(".as-tab .area-tab-mnu").find("li");
			$tabEleLen = $tabEle.length;
			this.event();
		},
		event: function(){
			var tab = this;
			$tabEle.find('a[href^="#"]').click(function(e){e.preventDefault();});
			$tabEle.on("click", function(e){
				tab.action($(this), $(this).closest(".area-tab-mnu").find(" > li").index(this));
			});
			$tabEle.not(":hidden").each(function() {
				if ($(this).parent(".area-tab-mnu").hasClass("flexible")){
					return;
				} else {
					var menuEa = $(this).parent(".area-tab-mnu").find("li").length;
					var menuSize = (100/menuEa);
					$(this).parent(".area-tab-mnu").find("li").width(menuSize+"%");
					console.log(menuEa, menuSize );
				}
			});
			if (($tabEle).hasClass("active")) {
				$(".as-tab .area-tab-mnu > li.active > a").trigger("click");
			} else {
			 $tabEle.eq(0).find("> a").trigger("click");
			}
		},
		action: function(ele, getIndex){
			var $findNode = $(ele);
			var $findEle = $findNode.closest(".as-tab").find("> .area-tab-cont .tab-ele");
			$(ele).addClass("active").find(">a").attr("title", "선택된탭");
			$(ele).siblings().removeClass("active").find(">a").attr("title","");
			$findEle.css("display","none");
			$findEle.eq(getIndex).css("display","block");
		}
	},

	// checkbox, radio design solution
	dsgnForm : function() {
		$('.dsgn-form input, .dsgn-ele').each(function(){
				if($(this).attr('type') == 'checkbox'){
					if ($(this).parent(".ele-chk").length == 0){
						//$(this).wrap('<span class="ele-chk"></span>');
					} else {

						$(this).focus(function(){
								$(this).parent('.ele-chk').addClass('focus');
						});
						$(this).blur(function(){
								$(this).parent('.ele-chk').removeClass('focus');
						});
						$(this).change(function(){
								if(this.checked){
										$(this).parent('.ele-chk').addClass('checked');
								}else{
										$(this).parent('.ele-chk').removeClass('checked');
								}
						});
						if($(this).is(":disabled")){
								$(this).parent('.ele-chk').addClass('disabled');
						}
						if($(this).is(":checked")){
								$(this).parent('.ele-chk').addClass('checked');
						}
					}
				} else if($(this).attr('type') == 'radio'){
					if ($(this).parent(".ele-rdo").length == 0){
						//$(this).wrap('<span class="ele-rdo"></span>');
					} else {
						$(this).focus(function(){
								$(this).parent('.ele-rdo').addClass('focus');
						});
						$(this).blur(function(){
								$(this).parent('.ele-rdo').removeClass('focus');
						});
						$('input[type=radio]').change(function(){
								$('input[type=radio]').parent('.ele-rdo').removeClass('checked');
								$('input[type=radio]:checked').parent('.ele-rdo').addClass('checked');
						});
					}
				}
				if(this.checked){
						$(this).parent().addClass('checked');
				}
		});
	},

	dsgnRdo : function() {
		$('.ele-rdo2 .rdo-item input[type=radio]').each(function(){
			if(this.checked){
				$(this).parents('.rdo-item').addClass('check');
			}
		});
		$('.ele-rdo2 .rdo-item input[type=radio]').change(function(){
			var name = $(this).attr('name');
			if(this.checked){
				$('.ele-rdo2 .rdo-item input[name=' + name + ']').parents('.rdo-item').removeClass('check');
				$(this).parents('.rdo-item').addClass('check');
			}else{
				$(this).parents('.rdo-item').removeClass('check');
			}
		});

		$('.ele-rdo2 .rdo-item input[type=radio]').focus(function(){
			$(this).parents('.rdo-item').addClass('focus');
		}).blur(function(){
			$(this).parents('.rdo-item').removeClass('focus');
		});
	},

	// layer popup open [event] [스크립트이관]
	modalLayer : {
		open: function(ele, unique, widNum, flag){
			var uniqueId = $('#'+unique),
				that = ele;
			$(that).addClass("layerActive");
			uniqueId.attr('tabindex', '0').fadeIn("fast").focus();
			uniqueId.append('<a href="#" class="pop_loop">포커스이동</a>');
			$('.pop_loop').focus(function(){
				uniqueId.attr('tabindex', '0').fadeIn().focus();
			});
			if (widNum){
				$('#'+unique).find(".pop-area").width(widNum);
			} else {
				$('#'+unique).find(".pop-area").css("width","700px");
			}
			$('body').css({'overflow':'hidden','height':'100%'});

			var win_h = $(window).height();
			pop_h = uniqueId.find('.pop-area').outerHeight();
			
			$(window).resize(function(){
				var win_w = $(window).width();
				var pop_w = uniqueId.find('.pop-area').width();
				var position_top =	(win_h - pop_h) / 2;
				var position_left = (win_w - pop_w) / 2;
				
				if(position_top <= 0){position_top = 0;}
				if(position_left <= 0){position_left = 0;}
				uniqueId.find('.pop-area').css({'top':position_top,'left':position_left});
				
				var win_h = $(window).height();
				// 20170922 아코디언 포함된 팝업 스타일 아코디언 갯수로 분기 처리
				if(uniqueId.find('.pop-area .acco-type2').length >= 1){
					uniqueId.find('.pop-area').addClass('scroll').css({'margin-top':'0'});
				}else{
					if(pop_h >= win_h){
						uniqueId.find('.pop-area').addClass('scroll').css({'margin-top':'0'});
					}else{
						uniqueId.find('.pop-area').removeClass('scroll').css({'margin-top':-pop_h/2});
					}
				}
			}).resize();

			//close [event]
			uniqueId.find('.as-pop-close').click(function(e){
				e.preventDefault();
				GJB.ini.popCloseFunc();
			});
		},
		close: function(){
			GJB.ini.popCloseFunc();
		}
	},

	// modeless popup
	modeless : {
		open: function(ele, uniqueLess, load, type){
			var uniqueIdLess = $('#'+uniqueLess),
				that = ele,
				myAbs = ele.closest(".lyr-wrap-rela").find(".lyr-wrap-abs");

				var half = $(window).width()/2;
				var btnLft = that.offset().left;
				if(btnLft > half){
					that.parents('.tooltip').addClass('right');
				}

			if (myAbs.length){
				GJB.modeless.close();
			} else {
				GJB.modeless.close();
				$(".lyr-wrap-abs").remove();
				$(".lyr-wrap-rela").css("z-index","");
				$(".layerActive").focus().removeClass("layerActive");
				ele.closest(".pos-rela").css("z-index","200");
				ele.closest(".lyr-wrap-rela")
					.css("z-index","100")
					.append('<div id="'+uniqueLess+'" class="lyr-wrap-abs"></div>'); //title="'+ele.text()+' 상세메뉴"
				if (load == "html"){
					$("#"+uniqueLess).load("/resource/html/bpb/load-test.html?17 ."+uniqueLess ,function(responseTxt, statusTxt, xhr){
						if(statusTxt == "error"){} else if(statusTxt == "success"){}
					});
				} else {
					var data = $("."+uniqueLess).html();
					var wid = $("."+uniqueLess).width();
					ele.closest(".lyr-wrap-rela").find(".lyr-wrap-abs").css('width', wid + 'px').append(data);
				}
				$(that)
					.addClass("layerActive")
					.next().attr('tabindex', '0').show("fast").focus();
				$(document).on("focus", '.less-loop', function(){
					$(this).closest(".lyr-wrap-abs").attr('tabindex', '0').fadeIn().focus();
				});
				if (type == "calType"){
					var getRelPos = ele.closest(".pos-rela").offset().left;
					var getAbsPos = ele.closest(".lyr-wrap-rela").find(".lyr-wrap-abs").offset().left;
					$(that).next().css({
						'left':-(getAbsPos-getRelPos-4),
						'top':"-15px"
					});
				}
			}
		},

		close: function(){
			$(".lyr-wrap-abs").fadeOut("fast", function() {
        var getId = $(this).attr("id");
        $(this).find("."+getId+".local-node").appendTo("body");
				$(".lyr-wrap-rela").css("z-index","");
				$(".pos-rela").css("z-index","15");

        $(this).remove();
			});
			$(".layerActive").focus().removeClass("layerActive");
		},

	},

	// 나의점수 레이어 토글
	conLayer : function(ele, unique){
		var uniqueId = $('#'+unique);

		function close(){
			$(ele).focus().removeClass("layerActive");
			uniqueId.hide().removeAttr('tabindex').find('.pop_loop').remove();
		}

		if($(ele).hasClass("layerActive")){
			close();
		}else{
			$(ele).addClass("layerActive");
			$('#'+unique).show();
			uniqueId.attr('tabindex', '0').fadeIn("fast").focus().append('<a href="#" class="pop_loop">포커스이동</a>');
		}
		$('.pop_loop').focus(function(){
			uniqueId.attr('tabindex', '0').fadeIn().focus();
		});

		uniqueId.find('.btn-close').click(function(){
			close();
		});
	},

	targetLyr : function(ele){
		$(ele).addClass("on");
	},

	fieldSize: function(){
		// inquiry column sync. width
		var highestBox = 0;
		$(".colsWidCalc ul li > div").each(function(i){
			//var getIndex = $(".colsWidCalc li").find(".in-item").index();
			var verNum = i / 2;
			var verNumAll = verNum + 1;
			$(this).addClass("ver_clmn"+parseInt(verNumAll));
			if (verNum == 2) {
				highestBox = 0;
			}
			$(this).find('.tit-item').each(function(){
				if($(this).width() > highestBox){
					highestBox = $(this).width();
				}
			});
			$("."+"ver_clmn"+parseInt(verNumAll)).find(">.tit-item").width(highestBox +5);
	
		});
	},

	breadcrumb: function(){
		$(".breadcrumb > li > a").each(function(e){
			$(this).click(function(e) {
				e.preventDefault();
				var accLi = $(this).parent("li");
				if (accLi.hasClass("active")){
					$(".breadcrumb > li").removeClass("active").find("ul").hide();
				} else {
					$(".breadcrumb > li").removeClass("active").find("ul").hide();
					accLi.addClass("active").end().next().show();
				}
			});
			$(document).mousedown(".breadcrumb", function(e){
				var $tar = $(e.target);
				if(!$tar.is('.breadcrumb a')){
					$('.breadcrumb > li').removeClass('active');
					$('.breadcrumb > li ul').hide();
				}
			});
		});
	},

	familySite: function(){
		$(".foot-link > .sel-type > a").each(function(e){
			$(this).click(function(e) {
				e.preventDefault();
				var accLi = $(this).parent(".sel-type");
				if (accLi.hasClass("active")){
					$(".foot-link > .sel-type").removeClass("active").find("ul").hide();
				} else {
					$(".foot-link > .sel-type").removeClass("active").find("ul").hide();
					accLi.addClass("active").end().next().show();
				}
			});
			$(document).mousedown(".foot-link", function(e){
				var $tar = $(e.target);
				if(!$tar.is('.foot-link a')){
					$('.foot-link > .sel-type').removeClass('active');
					$('.foot-link > .sel-type ul').hide();
				}
			});
		});
	},

	// loading...
	loading : {
		open: function(){
			if (!$(".load-dimmed").length){
				$("body").append('<div class="load-dimmed"><img src="/resource/img/common/ico/loading_txt.gif" alt="로딩중"></div>');
			} else {
				console.log("로딩중중복 호출");
			}
		},
		close: function(){
			$(".load-dimmed").remove();
		}
	},
	
	selChange : function(){
		var $select = $('.as-selChange');
		var idx = $('.selChangeWrap').index($('.selChangeWrap.current'));
		var name = $select.find('option').eq(idx).text();
		var val = $select.find('option').eq(idx).val();
		var $targetContent = $('.selChangeWrap');
		
		selChangeView(idx, val, name);

		$('.btn-selChange').click(function(){
			idx = $select.find('option').index($select.find('option:selected'));
			name = $select.find('option:selected').text();
			eng = $select.find('option:selected').val();
			selChangeView(idx, eng, name);
		});
		
		function selChangeView(idx, eng, name){
			var $thisContent = $targetContent.eq(idx);
			$targetContent.hide();
			$thisContent.show();
			$select.next().text(name);
			$select.find('option').eq(idx).prop('selected', true);
			
			$('.top-link-box').each(function(){
				$(this).find('.title').html('OECD국가화폐의 위조지폐 감별 요령 - '+name);
				$(this).find('.national-flag').html('<img src="/resource/img/common/ico/img_flag_'+eng+'.gif" alt="'+name+' 국기">');
			})
		}
	},
}//last

$(function(){
		GJB.init(); // GJB ini. call		

		$('a[href^="#"]').not(".able-anchor").click(function(e){e.preventDefault();});

		/* selec box focus */
		$('.ele-select select').focus(function(){
				$(this).parents('.ele-select').addClass('focus');
		});
		$('.ele-select select').blur(function(){
				$(this).parents('.ele-select').removeClass('focus');
		});

	// select
	$('select.select').each(function(){
		var title = $(this).attr('title');
		if( $('option:selected', this).val() != '')
			title = $('option:selected',this).text();
			$(this)
			//.after($('option:selected',this).text() + '</span>')
			.change(function(){
			val = $('option:selected',this).text();
			$(this).next().text(val);
		});
	}); //$(this).css({'z-index':10,'opacity':0,'-khtml-appearance':'none'}).after('<span class="select-indi">' + $('option:selected',this).text() + '</span>')

	// inquiry column sync. width
	/*
	var highestBox = 0;
	$(".colsWidCalc .in-list ul li > div").each(function(i){
		//var getIndex = $(".colsWidCalc li").find(".in-item").index();
		var verNum = i / 2;
		var verNumAll = verNum + 1;
		$(this).addClass("ver_clmn"+parseInt(verNumAll));
		if (verNum == 2) {
			highestBox = 0;
		}
		$(this).find('.tit-item').each(function(){
			if($(this).width() > highestBox){
				highestBox = $(this).width();
			}
		});
		$("."+"ver_clmn"+parseInt(verNumAll)).find(">.tit-item").width(highestBox +5);

	});*/

	//기간설정 / 금액설정 버튼그룹
	$(document).on('click', '.terms a', function(){
		$(this).parents('.terms').find('.terms-sel').removeClass('on');
		$(this).addClass('on');return false;
	});

	//계좌조회 셀렉트 레이어
	$(document).on('click', '.sel-wrap .text-indi', function(){
		var title = $(this).closest('.choice-dl').find('dt').text();
		
		$(this).parents('.sel-wrap').find('.layer').append('<a href="#" class="layer-loop">포커스 이동</a>');
		$(this).parents('.sel-wrap').find('.layer-loop').focus(function(){
			$(this).parents('.sel-wrap').find('.layer').attr('tabindex', '0').focus();
		});
		
		if($(this).parents('.sel-wrap').hasClass('on')){
			$(this).attr('title', title + ' 목록 열기');
			$(this).parents('.sel-wrap').find('.layer').slideUp(100, function(){
				$(this).parents('.sel-wrap').removeClass('on').find('.text-indi').attr('tabindex', '0').focus();
				$('.layer').removeAttr('tabindex');
			});
		}else{
			$(this).attr('title', title + ' 목록 닫기');
			var wid = $(this).parents('.sel-wrap').find('.layer').outerWidth();
			$(this).parents('.sel-wrap').find('.layer').css({'left':'50%', 'margin-left':-wid/2});
			$(this).parents('.sel-wrap').addClass('on').find('.layer').slideDown(200);
			var scrollH = $(this).parents('.sel-wrap').find('.scroll-area').outerHeight();
			var listH = $(this).parents('.sel-wrap').find('.scroll-area .list').outerHeight();
			if(listH > scrollH){
				$(this).parents('.sel-wrap').find('.layer .btn-close').css({'right':'17px'});
			}
		}
	});
	$(document).on('click', '.sel-wrap .layer .list .item', function(){
		var data = $(this).html();
		$(this).parents('.list').find('.item').removeClass('on');
		$(this).addClass('on');
		$(this).parents('.sel-wrap').find('.text-indi').html(data);
		$(this).parents('.sel-wrap').find('.layer').slideUp(100, function(){
			$(this).parents('.sel-wrap').removeClass('on').find('.text-indi').attr('tabindex', '0').focus();
			$('.layer').removeAttr('tabindex');
			$('.layer-loop').remove();
		});
	});
	$(document).on('click', '.sel-wrap .layer .btn-close', function(){
		$(this).parents('.sel-wrap').find('.layer').slideUp(100, function(){
			$(this).parents('.sel-wrap').removeClass('on').find('.text-indi').attr('tabindex', '0').focus();
			$('.layer').removeAttr('tabindex');
		});
	});

	//테이블 열고닫기 버튼
	$(document).on('click', '.tbl-wrap .tbl-headnote .btn-aco', function(){
		if($(this).parents('.tbl-wrap').hasClass('on')){
			$(this).parents('.tbl-wrap').removeClass('on').find('.tbl-tog').slideUp(100);
			$(this).html('추가정보 열기');
		}else{
			$(this).parents('.tbl-wrap').addClass('on').find('.tbl-tog').slideDown(200);
			$(this).html('추가정보 닫기');
		}
	});
	// 하단 알림박스 내용이 길면 토글 버튼 자동 생성
	$('.notice-box').each(function(){
		var hei = $(this).outerHeight();
		var accRea = "'acc-area'";
		$(this).find('.notice-aco').remove();
		if(hei >= '350'){
			$(this).find('.title-area').not(".as-pass").append('<a href="#" class="notice-aco" onclick="noticeAco($(this), ' + accRea + ');">도움말 접기</a>');
		}
	});

	// 토글 공용버튼
	$(document).on('click', '.btn-toggle', function(){
		$(this).toggleClass('on');
	});

	// 전계좌조회 자세히 보기 버튼
	$(document).on('click', '.btn-detailView', function(){
		var data = $(this).attr('data');
		var btn = $(this).parents('.lyr-wrap-rela');
		var btnH = $(this).outerHeight();
		
		if($(this).hasClass('layerActive')){
			$(this).removeClass('layerActive');
			$('.con-layer#'+data).css({'opacity':'0'}).hide().removeAttr('tabindex');
			$('.pop_loop').remove();
		}else{
			$(this).addClass('layerActive');
			$('.con-layer#'+data).appendTo(btn);
			$('.con-layer#'+data).css({'left':'50%', 'top':btnH+10, 'opacity':'0'}).show();
			var widH = $('.con-layer#'+data).outerWidth()/2;
			$('.con-layer#'+data).css({'margin-left':-widH, 'opacity':'1'}).attr('tabindex', '0').focus().append('<a href="#" class="pop_loop">포커스이동</a>');
			$('.pop_loop').focus(function(){
				$('.con-layer#'+data).attr('tabindex', '0').fadeIn().focus();
			});
		}
	});

	$(document).on('click', '.lyr-wrap-rela .btn-close', function(){
		$(this).parents('.lyr-wrap-rela').find('.btn-detailView').focus().removeClass('layerActive');
		$(this).parents('.lyr-wrap-rela').find('.con-layer').css({'opacity':'0'}).hide().removeAttr('tabindex');
		$('.pop_loop').remove();
	});

	// 중도금대출 인터넷 신청 (IBSLOAN040100V40)
	$(document).on('click', '.as-next-accordion .click .toggle-btn', function(){
		$(this).parents('.as-next-accordion').find('> li').each(function(){
			 var tit = $(this).find('.toggle-btn .title').html();
			 $(this).find('.toggle-btn').attr('title', tit + ' 추가정보 열기');
		});
		if($(this).parents('li').hasClass('on')){
			$(this).parents('.as-next-accordion').find('> li').removeClass('on');
			$(this).parents('.as-next-accordion').find('.toggle-ele').slideUp();
		}else{
			var itemT = $(this).parents('.as-next-accordion').offset().top;
			var itemH = $(this).parents('.as-next-accordion').find('.title-wrap').outerHeight();
			var idx = $(this).parents('li').index();
			var scrl = itemT + (itemH * idx) - 100;
			$('html, body').animate({scrollTop:scrl});
			$(this).parents('.as-next-accordion').find('> li').removeClass('on');
			$(this).parents('.as-next-accordion').find('.toggle-ele').slideUp();
			var tit = $(this).parents('li').find('.toggle-btn .title').html();
			$(this).parents('li').find('.toggle-btn').attr('title', tit + ' 추가정보 닫기')
			$(this).parents('li').addClass('on').find('.toggle-ele').slideDown();
		}
	});
	$(document).on('click', '.as-next-accordion .btn-next-step', function(){
		$(this).parents('li').next('li').addClass('click').find('.toggle-btn').click();
	});
	
	/* 금융주소 한번에 변경 */
	$(document).on('click', '.ele-btns .btns', function(){
		$('.ele-btns .btns').removeClass('on');
		$(this).addClass('on');
	});
	

});

/* 거래도움말 : 도움말 접기 */
function noticeAco(ele, id){
	if (ele.hasClass('on'))
	{
		ele.removeClass('on').text('도움말 접기').closest('.notice-box').find('#'+id).slideDown('fast');
	}else{
		ele.addClass('on').text('도움말 펼치기').closest('.notice-box').find('#'+id).slideUp('fast');
	}
	event.preventDefault();
}

/* zoom funu */
var scale = 1, count = 0;
function zoomIn() {
	count += 1;
	if(scale>1.4){
		alert("더 이상 확대 하실 수 없습니다.");
		return;
	} else {
		scale += 0.1;
	}
	zoom();
}
function zoomOut() {
	count -= 1;
	if(scale<0.8){
		alert("더 이상 축소 하실 수 없습니다.");
		return;
	} else {
		scale -= 0.1;
	}
	zoom();
}
function zoomIni() {count = 1, scale = 1, zoom()}
function zoom() {
	var posChange = $("#contents").offset();
			var zoomNode = document.getElementById("wrap");
			zoomNode.style.zoom = scale;
	if (posChange.left < 100){
			var setAlign = "0 0";
			zoomNode.style.zoom = setAlign;
			zoomNode.style.webkitTransformOrigin = setAlign;
			zoomNode.style.MozTransformOrigin = setAlign;
			zoomNode.style.OTransformOrigin = setAlign;
	} else {
			console.log(scale);
			var setAlign = "center center";
			zoomNode.style.zoom = setAlign;
			zoomNode.style.webkitTransformOrigin = setAlign;
			zoomNode.style.MozTransformOrigin = setAlign;
			zoomNode.style.OTransformOrigin = setAlign;
	}
}


function printArea(areaName){
	var printContents = document.getElementById(areaName).innerHTML;
	var originalContents = document.body.innerHTML;
	var win = window.open();
	win.document.write('<!doctype html>');
	win.document.write('<html lang="ko">');
	win.document.write('<head><meta charset="utf-8">');
	win.document.write('<title>출력 - 광주은행</title>');
	win.document.write('<link rel="stylesheet" href="/resource/css/ini.min.css">');
	win.document.write('<link rel="stylesheet" href="/resource/css/module.css">');
	win.document.write('<link rel="stylesheet" href="/resource/css/contents.css">');
	win.document.write('<link rel="stylesheet" href="/resource/css/bpb/module.css">');
	win.document.write('<link rel="stylesheet" href="/resource/css/bpb/contents.css">');
	win.document.write('<style>html, body {width:100%; min-width:1080px;}</style>');
	win.document.write('<scr'+'ipt type="text/javascript" src="/resource/js/jquery-1.11.3.min.js"></scr'+'ipt>');
	win.document.write('</head><body>');
	win.document.write(printContents);
	win.document.write('</body>');
	win.document.write('<scr'+'ipt>');
	win.document.write('$(".pop-area").removeClass("scroll")');
	win.document.write('</scr'+'ipt>');
	win.document.write('</html>');
	win.document.close();
	setTimeout(function(){win.print();},100);
	setTimeout(function(){win.close();},100);
}




//퍼블확인용 (팝업)
$(window).load(function(){
	var winH = $(window).height();
	var popH = $('.pop-area').outerHeight();
	
	if(popH >= winH){
		$('.pop-area').addClass('scroll');
	}else{
		$('.pop-area').removeClass('scroll');
	}
});