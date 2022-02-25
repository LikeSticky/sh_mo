// screen switching by device
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('a 0=(/g|h|j|4|5|6|7\\8|9/i.b(c.d.e()));f(0){$("1").2("3-k")}l{$("1").2("3-m")}',23,23,'mobile|html|addClass|type|android|blackberry|mini|windows|sce|palm|var|test|navigator|userAgent|toLowerCase|if|iphone|ipod||ipad|smart|else|pc'.split('|'),0,{}))

if (window.console === undefined) {console={log:function(){} };}
var SAIDA = SAIDA || {};
var SAIDA = {
    init : function(){
        SAIDA.tab.init();
    },

    // tab menu
    tab : {
        init : function() {
            if ($(".as-tab").length == 0 || $(".tab-pass").length) {
                return;
            } this.event();
        },
        event : function() {
            var tab = this;
            var $tabEle = $(".as-tab .area-tab-mnu").find("li");
            $tabEle.find('a[href^="#"]').click(function(e) {e.preventDefault()});
            $tabEle.on("click", function(e) {
				tab.action($(this), $(this).closest(".area-tab-mnu").find(" > li").index(this));
            });
            if (($tabEle).hasClass("active")) {
				$(".as-tab .area-tab-mnu > li.active > a").trigger("click");
            } else {
				$tabEle.eq(0).find("> a").trigger("click");
            }
        },
        action : function(ele, getIndex) {
            var $findNode = $(ele);
            var $findEle = $findNode.closest(".as-tab").find("> .area-tab-cont .tab-ele");
            $(ele).addClass("active").find(">a").attr("title", "선택된탭");
            $(ele).siblings().removeClass("active").find(">a").attr("title", "");
            $findEle.css("display", "none");
            $findEle.eq(getIndex).css("display", "block");
        }
    },
}//last

$(function(){
	SAIDA.init();

	// title
	var olCheck = $(".guide-nav li.inner_on");
	var olTxt = olCheck.children("a").text();
	var ulTxt = $(".guide-nav li.on").children("a").text();
	if ((olCheck.length)){
		$(".guide-contents .tit").text(olTxt);
	} else {
		$(".guide-contents .tit").text(ulTxt);
	}

	// nav slide
	$(document).on("click", ".guide-nav ul > li > a", function(){
		var depthSt = $(this).parent();
		var depthNd = depthSt.find("ol");
		if (depthSt.hasClass("on")){
			depthSt.removeClass("on");
			depthNd.slideUp(300).removeClass("on");
		} else {
			$(".guide-nav li ol").slideUp(300).closest("li").removeClass("on");
			depthSt.addClass("on");
			depthNd.slideDown(300).addClass("on");
		}
	});

	$(document).keydown(function(e){
		if(e.keyCode == 27) {
			if ($('body').hasClass('preview-mode')) {
				$('body').removeClass('preview-mode');
			} else {
				$('body').addClass('preview-mode');
			}
		}
		 if(e.keyCode == 49 || e.keyCode == 97) {
			window.location = '/guide/html/convention_ia.html';
		} else if(e.keyCode == 50 || e.keyCode == 98) {
			window.location = '/guide/html/convention_ia.html';
		} else if(e.keyCode == 51 || e.keyCode == 99) {
			window.location = '/guide/html/convention_ia.html';
		} else if(e.keyCode == 52 || e.keyCode == 100) {
			window.location = '/guide/html/convention_ia.html';
		}
	});
	$(".guide-gnb").append("<section><a href='#' class='on'>① / ② / ③ / ④</a> <a href='#'>moApp</a></section>");
	$(".shot").trigger("click");
});