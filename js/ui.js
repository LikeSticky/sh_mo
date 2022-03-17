// screen switching by device
eval(function(p, a, c, k, e, r) {
    e = function(c) { return c.toString(a) };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) { return r[e] }];
        e = function() { return '\\w+' };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('a 0=(/g|h|j|4|5|6|7\\8|9/i.b(c.d.e()));f(0){$("1").2("3-k")}l{$("1").2("3-m")}', 23, 23, 'mobile|html|addClass|type|android|blackberry|mini|windows|sce|palm|var|test|navigator|userAgent|toLowerCase|if|iphone|ipod||ipad|smart|else|pc'.split('|'), 0, {}))

if (window.console === undefined) { console = { log: function() {} }; }

(function(window, $) {
    'use strict';
    console.log("loading namespaces before");
})(window, jQuery);

// var SHS = SHS || {};
let popIndex = 100; // z-index between layer popups
let SHS = {
    init: function() {
        SHS.acc();
        SHS.tblSummary();
        SHS.accordion.init();
        SHS.tab.init();
        SHS.forms();

        // page top
        window.onscroll = function() {
            scrollFunction()
        };
        const speed = 200; // scroll speed
        function scrollFunction() {
            if ($(this).scrollTop() > 500) {
                SHS.addActive(".page-top");
            } else {
                SHS.removeActive(".page-top");
            }
        }
        //if (!$(".page-top").length) {
        let eleTop = document.getElementsByClassName('page-top');
        if ((typeof(eleTop) != 'undefined') && (eleTop != null)) {
            let topArea = '<div class="page-top">' +
                '<button style="float:right;">top</button>' +
                '</div>';
            $("body").append(topArea);
            //document.querySelector('body').appendChild(topArea);
        }

        $(".page-top button").click(function() { $('body, html').animate({ scrollTop: 0 }, speed) });


        // time extension
        function timeCheck(sec_num) {
            var minutes = Math.floor(sec_num / 60);
            var seconds = sec_num - (minutes * 60);
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            return minutes + ':' + seconds;
        }

        // time tick setting
        function tickRefresh() {
            $("#bar_core")
                .width(Math.floor(100 * (remaining / totalTime)) + "%")
                .offset({
                    right: timePos.right + 100 * ((totalTime - remaining) / totalTime),
                    left: timePos.left
                });
            $("#digit").val(timeCheck(remaining));
            if (remaining == 60) {
                //if (confirm("시간연장?") == true) {
                if (confirm("시간연장?") == true) {
                    remaining = timeIni;
                } else {
                    //clearInterval(timer);
                }
            } else if (remaining < 1) {
                clearInterval(timer);
            }
            remaining--;
        }
        var timeIni = 600;
        var totalTime = timeIni;
        remaining = totalTime;
        var timePos = $("#bar_core").offset();
        //tickRefresh();
        //var timer = setInterval(tickRefresh, 1);

        $("#tickRefresh").on("click", function() {
            console.log("tickRefresh()");
            remaining = timeIni;
        });
    },

    // active class
    addActive: function(tarEle) { $(tarEle).addClass("active") },
    removeActive: function(tarEle) { $(tarEle).removeClass("active") },

    // show/hide
    visibleEle: function(tar) { $("." + tar).show("fast") },
    hiddenEle: function(tar) { $("." + tar).hide("fast") },

    // content go
    skipJump: function() {
        if ($("#contents").length) {
            let getOffset = $("#contents").offset().top;
            $("html,body").animate({ scrollTop: getOffset }, 100);
            $("#contents").attr('tabindex', '0').css('outline', '0').focus();
        }
    },

    acc: function() {
        // div with scroll
        document.querySelectorAll(".as-has-scroll").tabindex = 0;
    },

    tblSummary: function() {
        // table caption setting    [summary rep.] www.w3.org/WAI/tutorials/tables/caption-summary/
        //Array.form(document.querySelectorAll("[data-role='table'] table")).forEach((index) => {
        $("[data-role='table'] table").each(function() {
            let tblHead = [],
                $tarTbl = $(this),
                tblId = "tableSeq" + $("table").index(this),
                tblSubject = $(this).closest("[data-role='table']").find("[data-role='table-subject']"),
                tblTit = tblSubject.length ? "하는 " + tblSubject.text() + " 입니다." : "",
                tblCaption = $(this).find("caption");

            if (tblCaption == null || tblCaption.text() == '' || !(tblCaption.hasClass('fixed'))) {
                $tarTbl.find("caption").not("fixed").remove();
                $tarTbl.prepend("<caption class='rep-caption' id=" + tblId + "></caption>");

                $(this).find("th").each(function(thIdx) {
                    var $tarTblPara = $tarTbl.find("caption");
                    if (thIdx < 6) {
                        tblHead[thIdx] = $(this).html().replace(/&nbsp;|<br>/gi, " ");
                        $tarTblPara.text(tblHead + ' 정보를 제공' + tblTit);
                    } else {
                        $tarTblPara.text(tblHead + ' 등의 정보를 제공' + tblTit);
                    }
                });
            } else {
                $tarTbl.find("caption")
                    .addClass("rep-caption")
                    .attr("id", tblId);
            }
            $tarTbl.attr("aria-describedby", tblId);
            return;
        });
    },


    // tab menu
    tab: {
        init: function() {
            if ($("[data-role='tab']").length == 0 || $(".tab-pass").length) {
                return;
            }

            let $tabs = $("[data-role='tab']"),
                $tabEle = $tabs.find(".area-tab-mnu li"),
                $tabPanel = $tabs.find(".area-tab-cont .tab-ele");

            $tabs.attr("role", "tablist");
            $tabPanel.attr("role", "tabpanel");

            $tabEle.each(function() {
                let makeTempCha = getRandomString(5); //Math.random().toString(36).substring(11, 5),

                $(this).find("a").attr({
                    "role": "tab",
                    "aria-selected": "false",
                    "aria-controls": makeTempCha
                });
                $(this).closest("[data-role='tab']")
                    .find(".area-tab-cont .tab-ele").eq($(this).index()).attr("id", makeTempCha);
            })

            let tab = this;

            $tabEle.off().on("click", function(e) {
                tab.action($(this), $(this).closest(".area-tab-mnu").find(" > li").index(this));
            });

            $tabEle.each(function() {
                let activeNum = $(this).closest("[data-role='tab']").data("show") - 1,
                    that = $(this).closest("[data-role='tab']").find("> .area-tab-mnu > li");
                if (activeNum < 0 || isNaN(activeNum) == true) {
                    that.eq(0).find("> a").trigger("click");
                } else {
                    that.eq(activeNum).find("> a").trigger("click");
                }
            });
        },
        action: function(ele, getIndex) {
            var $findNode = $(ele),
                $findEle = $findNode.closest("[data-role='tab']").find("> .area-tab-cont > .tab-ele");
            $(ele).addClass("active").find(">a").attr("aria-selected", "true");
            $(ele).siblings().removeClass("active").find(">a").attr("aria-selected", "false");
            $findEle.css("display", "none");
            $findEle.eq(getIndex).css("display", "block");
        },
        active: function(ele, num) {
            $(ele).find("> .area-tab-mnu > li").eq(num).find("> a").trigger("click");
        }
    },


    // accordion [opt. aria-multiselectable:multiple view / data-show:first visible ele.]
    accordion: {
        init: function() {
            let acc = $("[data-role='accordion']"),
                accordion = this;

            $(acc).each(function() {
                let activeNum = $(this).data("show") - 1;
                $(this).find(".toggle-btn")
                    .attr("role", "button")
                    .attr("aria-expanded", "false");
                if ($(this).attr("data-show") === 'null' || $(this).attr("data-show") === '') {
                    return;
                } else {
                    $(this).not(".as-no")
                        .find("> .toggle-items")
                        .eq(activeNum)
                        .addClass("active")
                        .find(".toggle-ele")
                        .css("display", "block")
                        .closest(".toggle-items").find(".toggle-btn")
                        .attr("aria-expanded", "true")
                }
            });

            acc.off("click").on("click", ".toggle-btn", function(e) {
                e.preventDefault();
                accordion.action($(this));
            });
        },
        action: function(ele) {
            let $eleAct;
            if ($(ele).parent().is(".toggle-items")) {
                $eleAct = $(ele).parent(".toggle-items");
            } else {
                $eleAct = $(ele).parent().parent();
            }
            var $eleActParent = $eleAct.closest("[data-role='accordion']");
            if ($eleAct.hasClass("active")) {
                $eleAct.find(".toggle-ele").slideUp(150, function() {
                    $eleAct
                        .removeClass("active")
                        .find(".toggle-btn")
                        .attr("aria-expanded", "false")
                });
            } else {
                if ($eleActParent.attr("aria-multiselectable") === 'true') {
                    $eleActParent.find(".toggle-items").removeClass("active")
                        .find(".toggle-btn")
                        .attr("aria-expanded", "false");
                    $eleActParent.find(".toggle-ele").slideUp(150);
                }
                $eleAct.addClass("active")
                    .find(".toggle-btn")
                    .attr("aria-expanded", "true");

                $eleAct.find(".toggle-ele").slideDown(150);
            }
        }
    },


    // modal layer
    modalLayer: {
        open: function(ele, unique, widNum, flag) {
            popIndex++; // z-index increase
            let uniqueId = $('#' + unique),
                checkState;

            // branch in flag state
            flag == "false" ? checkState = ele.is(":checked") : checkState = "false";
            if (!checkState) { return false; }

            $("body").css({
                "overflow": "hidden",
                "height": "100%"
            });
            $(ele).attr("data-focus", unique) //.addClass("layerActive");
            uniqueId.css({ "z-index": popIndex, "display": "flex" });
            uniqueId.find(".pop-area").attr("tabindex", "0").focus();
            uniqueId.find(".pop-tit").attr("tabindex", "0").focus();

            uniqueId.append('<a href="#" class="pop-loop">포커스이동</a><div class="dimmed"></div>');
            $(".pop-loop").on("focus", function() {
                uniqueId.find(".pop-area").attr("tabindex", "0").fadeIn().focus();
            });
            (widNum) ? $("#" + unique).find(".pop-area").width(widNum): $("#" + unique).find(".pop-area").css("width", "auto");
        },

        // layer popup close
        close: function(unique) {
            let lyrLength = $(".lyr-popup-wrap:visible");
            setTimeOutConst = setTimeout(function() {
                if (unique) {
                    $("#" + unique)
                        .css("display", "none")
                        .find('a.pop-loop, div.dimmed').remove();
                    //$(".layerActive[data-focus=" + unique + "]").focus()
                    $("[data-focus=" + unique + "]").focus()
                        .removeAttr("data-focus")
                        // .removeClass("layerActive");
                } else {
                    $(".lyr-popup-wrap")
                        .css("display", "none")
                        .find('a.pop-loop, div.dimmed').remove();
                    $('body').css({ 'overflow': '', 'height': '' });
                }
            }, 10);
            if (lyrLength.length == 1) {
                $('body').css({ 'overflow': '', 'height': '' });
            }
            popIndex--; // z-index decrease
        }
    },

    // modeless popup
    modeless: {
        open: function(ele, uniqueLess, fixed) {
            let uniqueIdLess = $('#' + uniqueLess),
                that = ele,
                myAbs = ele.closest(".lyr-wrap-rela").find(".lyr-wrap-abs"),
                half = $(window).width() / 2,
                btnLft = that.offset().left;

            let data = $("." + uniqueLess).html();
            let wid = $("." + uniqueLess).width();

            (btnLft > half) ? that.parents('.tooltip').addClass('right'): that.parents('.tooltip').removeClass('right');
            if (myAbs.length) {
                SHS.modeless.close(); // close own tooltips
            } else {
                SHS.modeless.close(); // close other tooltips
                $(".lyr-wrap-abs").remove();
                $(".lyr-wrap-rela").css("z-index", "");
                $(".layerActive").focus().removeClass("layerActive");
                console.log(ele.text());
                ele.closest(".lyr-wrap-rela")
                    .css("z-index", "100")
                    .append('<div id="' + uniqueLess + '" class="lyr-wrap-abs"></div>'); //title="'+ele.text()+' 상세메뉴"
                ele.closest(".lyr-wrap-rela")
                    .find(".lyr-wrap-abs").css('width', wid + 'px').append(data);
                uniqueIdLess.attr("tabindex", "0");
                $('#' + uniqueLess).append('<a href="#" class="pop-loop">포커스이동</a>');
                $(".pop-loop").focus(function() {
                    $('#' + uniqueLess).fadeIn().focus();
                });

                if (fixed) {
                    console.log("!!");
                    $("#" + uniqueLess).find(".tooltip-cont").css({
                        "padding-right": "10px",
                        "height": fixed
                    });
                }
                $(that)
                    .addClass("layerActive")
                    .next().attr('tabindex', '0').show("fast").focus().css("z-index", "1");
                $(document).on("focus", '.less-loop', function() {
                    $(this).closest(".lyr-wrap-abs").attr('tabindex', '0').fadeIn().focus().remove("z-index");
                });
            }
        },

        close: function() {
            $(".lyr-wrap-abs").fadeOut("fast", function() {
                var getId = $(this).attr("id");
                $(this).find("." + getId + ".local-node").appendTo("body");
                $(".lyr-wrap-rela").css("z-index", "");
                $(".pos-rela").css("z-index", "15");
                $(this).remove();
            });
            $(".layerActive").focus().removeClass("layerActive");
        }
    },

    forms: function() {
        // button set choice
        $("[data-btn-choice] .btn").each(function() {
            $(this).attr("aria-pressed", "false");
        }).click(function() {
            let pointEle = $(this).closest("[data-btn-choice]");
            if (pointEle.data("btnChoice") == "sync") {
                pointEle.find(".btn[aria-pressed='true']").attr("aria-pressed", "false"); //.not(this)
                $(this).attr("aria-pressed", "true");
            } else {
                if ($(this).attr("aria-pressed") == "true") {
                    $(this).attr("aria-pressed", "false");
                } else {
                    $(this).attr("aria-pressed", "true");
                }
            }
        });

        // attach files such as file fields
        $fileBox = $('.ipt-file');
        $.each($fileBox, function(idx) {
            var $this = $fileBox.eq(idx),
                $btnUpload = $this.find('[type="file"]'),
                $label = $this.find('.file-label');

            $btnUpload.on('change', function() {
                var $target = $(this),
                    fileName = $target.val(),
                    $fileText = $target.closest(".ipt-file").find('.file-name');
                $fileText.val(fileName);
            })

            $btnUpload.on('focusin focusout', function(e) {
                e.type == 'focusin' ?
                    $label.addClass('active') : $label.removeClass('active');
            })
        })
    },


    // ajax after anchor able
    anchorAble: function() {
        $("a[href='#']").not(".able-anchor").click(function(e) { e.preventDefault(); });
    },


    // breadcrumb
    breadcrumb: function() {
        $(".breadcrumbs ul > li > a").each(function(e) {
            $(this).attr("title", "하위메뉴 보기");
            $(this).click(function(e) {
                e.preventDefault();
                var accLi = $(this).parent("li");
                if (accLi.hasClass("crumbs-on")) {
                    $(this).attr("title", "하위메뉴 보기");
                    $(".breadcrumbs ul > li").removeClass("crumbs-on").find(".depth-area").hide();
                } else {
                    $(".breadcrumbs ul > li").removeClass("crumbs-on").find(".depth-area").hide();
                    accLi.addClass("crumbs-on").end().next().show();
                    $(".breadcrumbs ul > li > a").attr("title", "하위메뉴 보기");
                    $(this).attr("title", "하위메뉴 닫기");
                }
            });

            $(".breadcrumbs").off("click").on("click", ".depth-area li > a", function(e) {
                var spotEle = $(this).closest(".crumbs-on");
                spotEle
                    .removeClass("crumbs-on")
                    .find(".depth-area").hide()
                    .end().find(">a").attr("title", "하위메뉴 보기");
            });

            $(document).mousedown(".breadcrumbs", function(e) {
                var $tar = $(e.target);
                if (!$tar.is('.breadcrumbs a, .breadcrumbs ul > li .depth-area')) {
                    $('.breadcrumbs ul > li').removeClass('crumbs-on');
                    $('.breadcrumbs ul > li .depth-area').hide();
                }
            });
        });
    },

    popCenter: {
        docuType: function(url, w, h) {
            // Fixes dual-screen position solu.
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
            var h = h - browSize;

            width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var docuType = window.open(url, 'popupDocument', 'scrollbars=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            // Puts focus on the newWindow  
            if (window.focus) {
                docuType.focus();
            }
        },
        scrType: function(url, w, h) {
            var h = h - browSize;
            var scr = window.open(url, 'popupScreen', 'top=' + ((screen.availHeight - h) / 2 - 40) + ', left=' + (screen.availWidth - w) / 2 + ', width=' + w + ', height=' + h + ', toolbar=0, status=0, menubar=0, scrollbars=yes');
            if (scr) {
                scr.focus();
            }
        }
    },

    // only dimmed layer ... class(dimmed) for dim on layer popup
    onlyDimmed: {
        open: function() { // 
            if (!$(".only-dimmed").length) {
                $("body")
                    .append('<div class="only-dimmed"></div>')
                    .css({ 'overflow': 'hidden', 'height': '100%' });
            } else {
                console.log("already open");
            }
        },
        close: function() {
            $(".only-dimmed").remove();
            $("body").css("overflow", "");
        }
    },


    // loading...
    loading: {
        open: function(msg) {
            if (!$(".only-dimmed").length) {
                SHS.onlyDimmed.open();

                let innerNode = '<div class="loader-wrap">';
                innerNode += '<div class="loader"></div>';
                innerNode += '	<p class="load-msg">';
                innerNode += msg;
                innerNode += '	</p>';
                innerNode += '	</div>';
                innerNode += '	</div>';
                $("body .only-dimmed").append(innerNode);
                if (!msg || msg == "undefined") { $(".load-msg").text("") };
                $("body")
                    .css({ 'overflow': 'hidden', 'height': '100%' });
            } else {
                console.log("already open");
            }
        },
        close: function() {
            SHS.onlyDimmed.close();
        }
    },

    // bd.find('a.bubble').hover(function(){
    // 	var t = $(this);
    // 	if(!t.hasClass('no_bubble') && !t.find('.wrp').length){
    // 		t.append('<span class="wrp"><span class="speech">'+t.attr('title')+'</span><i class="edge"></i></span>').removeAttr('title');
    // 		if($('html,body').width()-t.offset().left < 80){
    // 			t.addClass('left').find('.wrp').css({marginTop:t.parent('.wrp').height()/2})
    // 		} else if(t.offset().top < 80 && !t.parent().parent().hasClass('rd_nav_side')){
    // 			t.addClass('btm').find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
    // 		} else {
    // 			t.find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
    // 		};
    // 		if(ie8Check) t.find('.wrp').prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
    // 	};
    // 	if(ie8Check) return;
    // 	if(t.is('.left,.right,.btm')){
    // 		t.find('.wrp:hidden').fadeIn(150)
    // 	} else {
    // 		t.find('.wrp:hidden').css('bottom','150%').animate({
    // 			bottom:'100%'
    // 		},{duration:150,specialEasing:{left:'easeInOutQuad'},complete:function(){
    // 			},step:null,queue:false
    // 		}).fadeIn(150)
    // 	}
    // },function(){
    // 	if(ie8Check) return;
    // 	$(this).find('.wrp').fadeOut(100)
    // })
    //last
}



if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready() {
    console.log("function ready");
    SHS.init();

    // anchor move
    $('a[href="#"]').not(".able-anchor").click(function(e) { e.preventDefault(); });
}


function TESTablePop() { // 운영포팅시 삭제. 함수호출시 자동레이어 팝업 포커스 테스트가능
    setTimeout(() => {
        console.log("auto popup test");
        autoPopup(); // 자동레이어팝업시 선행함수 실행필요
        SHS.modalLayer.open($(this), 'autoPopup');
    }, 3000);
}
// auto layer popup
function autoPopup() {
    let tempFocus = $(':focus');
    tempFocus
        .attr("data-focus", "autoPopup")
        .addClass("layerActive");
}

// 자동레이어팝업 테스트시 호출
//TESTablePop();

/* random cha. make */
function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}


/* input range current value */
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}