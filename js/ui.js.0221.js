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
            SHS.btnSlide();
            SHS.forms();

            // time extension
            function timeCheck(sec_num) {
                var minutes = Math.floor(sec_num / 60);
                var seconds = sec_num - (minutes * 60);
                if (minutes < 10) minutes = "0" + minutes;
                if (seconds < 10) seconds = "0" + seconds;
                return minutes + ':' + seconds;
            }

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

        // myself add class
        addOn: function(overEle) { $(overEle).addClass("active") },

        // parent add class
        addOnParent: function(overEle) { $(overEle).parent().addClass("active") },

        // remove class
        removeOn: function(outEle) { $(outEle).removeClass("active") },

        visibleEle: function(tar) {
            $("." + tar).show("fast");
        },

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
            $("[data-role='table'] table").each(function() {
                let tblHead = [],
                    $tarTbl = $(this),
                    $tarId = "tableSeq" + $("table").index(this),
                    $findTit = $(this).closest("[data-role='table']").find("[data-role='table-subject']"),
                    $tblTit = $findTit.length ? "하는 " + $findTit.text() + " 입니다." : "";

                if ($(this).find("caption") == null || $(this).find("caption").text() == '') {
                    $tarTbl.prepend("<caption class='rep-caption' id=" + $tarId + "></caption>");
                    $(this).find("th").each(function(thIdx) {
                        var $tarTblPara = $tarTbl.find("caption");
                        if (thIdx < 6) {
                            tblHead[thIdx] = $(this).html().replace(/&nbsp;|<br>/gi, " ");
                            $tarTblPara.text(tblHead + ' 정보를 제공' + $tblTit);
                        } else {
                            $tarTblPara.text(tblHead + ' 등의 정보를 제공' + $tblTit);
                        }
                    });
                } else {
                    $tarTbl.find("caption")
                        .addClass("rep-caption")
                        .attr("id", $tarId);
                }
                $tarTbl.attr("aria-describedby", $tarId);
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
                //SHS.ini.anchorAble();
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
                    pointEle.find(".btn[aria-pressed='true']").attr("aria-pressed", "false");
                    $(this).attr("aria-pressed", "true");
                } else {
                    if ($(this).attr("aria-pressed") == "true") {
                        $(this).attr("aria-pressed", "false");
                    } else {
                        $(this).attr("aria-pressed", "true");
                    }
                }
                // let pointEle = $(this).closest("[data-btn-choice]");
                // if (pointEle.data("btnChoice") == "sync") {
                //     pointEle.find(".btn.active").removeClass("active");
                // } else {
                //     pointEle.find(".btn.active").not(this).removeClass("active");
                // }
                // $(this).toggleClass("active");
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
                        $label.addClass('file-focus') : $label.removeClass('file-focus');
                })
            })

            $('select:required').on('change', function() {
                if ($(this).val()) {
                    return $(this).css('color', 'black');
                } else {
                    return $(this).css('color', '#aaa');
                }
            });

        },

        // only dimmed layer [event].
        onlyDimmed: {
            open: function() {
                if (!$(".only-dimmed").length) {
                    $("body").append('<div class="only-dimmed"></div>')
                        .css({ "overflow": "hidden", "height": "100%" });
                } else {
                    //
                }
            },
            close: function() {
                $(".only-dimmed").remove();
                $("body").css("overflow", "");
            }
        },


        // GNB
        gnb: function() {
            var delay = 200;
            var $lnb = $(".gnb > ul > li");
            var $anchor = $lnb.find(">a");

            $anchor.on("mouseenter focusin", function() {
                var $anchorLi = $(this).parent();
                var $depth = $(this).next(".gnb-ext");
                setTimeOutConst = setTimeout(function() {
                    $lnb.removeClass("on");
                    if ($depth.length) {
                        $anchorLi.addClass("on")
                    }
                }, delay);
            });

            $(".gnb > ul > li > a").on("mouseout", function() {
                clearTimeout(setTimeOutConst);
                if ($lnb.hasClass("on") && depth_1 == false && depth_2 == false) {
                    gnbMouseCheck();
                }
            });

            $(".gnb > ul").on("mouseenter", function() {
                depth_1 = true;
                gnbCheck();
            });
            $(".gnb-ext").on("mouseenter", function() {
                depth_2 = true;
                gnbCheck();
            });
            $(".gnb > ul").on("mouseleave", function() {
                depth_1 = false;
                gnbCheck();
            });
            $(".gnb-ext").on("mouseleave", function() {
                depth_2 = false;
                gnbCheck();
            });

            // mouse leave.enter flag
            depth_1 = false;
            depth_2 = false;

            // mopuseleave add opt.
            function gnbMouseCheck() {
                if (depth_1 == false && depth_2 == false) {
                    $(".gnb > ul > li").removeClass("on")
                }
            }

            function gnbCheck() {
                setTimeout(function() {
                    gnbMouseCheck();
                }, 400);
            }

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

        // only dimmed layer [event]
        onlyDimmed: {
            open: function() {
                if (!$(".only-dimmed").length) {
                    $("body").append('<div class="only-dimmed"></div>')
                        .css({ 'overflow': 'hidden', 'height': '100%' });
                } else {
                    //
                }
            },
            close: function() {
                $(".only-dimmed").remove();
                $("body").css("overflow", "");
            }
        },

        // button slide choice
        btnSlide: function() {
            $('.btn-slide').each(function() {
                $(this).find('.in-btn').each(function() {
                    $(this).click(function() {
                        $(this).parent().find('.in-btn').removeClass('btn-active');
                        $(this).addClass('btn-active');
                    });
                });
            });
        },
    } //last

$(function() {
    SHS.init();


    $('a[href="#"]').not(".able-anchor").click(function(e) { e.preventDefault(); });

    //layer focus 
    $('.layer-top').keydown(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == 9) {
            $(this).closest('.layer').attr('tabindex', '0').focus();
        }
    });



    // category column[width] size
    $(".cate-divisiton").each(function() {
        $(this).find(" > li").each(function(i) {
            var localNum = (i % 5) + 1;
            $(this).addClass("ver_clmn" + parseInt(localNum));

            var heightArr = [];
            $(".ver_clmn" + localNum).each(function() {
                var getArr = heightArr.push($(this).width() + 5);
            });
            heightArr.sort(function(a, b) {
                return b - a;
            });
            $(".ver_clmn" + localNum).width(heightArr[0]);
        });
    });
    /* 
        <style>
        category size .cate-division:after {
            content: "";
            display: block;
            clear: both;
        }
        
        .cate-division li {
            float: left;
        }
        
        .cate-division li:nth-child(5n + 1) {
            clear: both;
        }
        
        .key-search {
            background-color: rgba(248, 248, 248, 0.5);
            border-radius: 0.6667rem;
            padding: 1.333rem;
            border: 1px solid #ececec;
        }
    </style>
    <ul class="cate-division">
        <li>111111</li>
        <li>h4 5yht</li>
        <li>222222</li>
        <li>jjjjjjjjj</li>
        <li>3333</li>
        <li>4</li>
        <li>5555555555</li>
        <li>66666</li>
        <li>77777777777</li>
    </ul> */


    $.fn.dragcheck = function(options) {
        var opts = $.extend({}, $.fn.dragcheck.defaults, options);
        return this.each(function() {
            var $this = $(this),
                enabled = false,
                state = false,
                startIndex = null;

            // meta data plugin support
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

            $(':checkbox', $this)
                .mousedown(function() {
                    var $obj = $(this);
                    enabled = true;
                    state = !$obj.is(':checked');
                    startIndex = (o.container ? $obj.parents(o.container).index() : $obj.index());

                    $obj.one('mouseout', function() {
                        if (enabled) {
                            o.onSelect($(this), state);
                        }
                    });
                })
                .mouseover(function() {
                    if (enabled) {
                        var $obj = $(this);
                        var sourceRow = (o.container ? $obj.parents(o.container) : $obj);
                        var targetRow = (o.container ? $obj.parents(o.container).parent().children(o.container).eq(startIndex) : $obj.parent().children(':checkbox').eq(startIndex));

                        var endIndex = sourceRow.index();
                        if (endIndex > startIndex) {
                            var prevelements = sourceRow.prevUntil(targetRow, o.container || ':checkbox');
                            o.onSelect((o.container ? targetRow.find(':checkbox') : targetRow), state);
                            o.onSelect((o.container ? sourceRow.find(':checkbox') : sourceRow), state);
                            $.each((o.container ? prevelements.find(':checkbox') : prevelements), function() {
                                o.onSelect($(this), state);
                            });
                        } else if (endIndex < startIndex) {
                            var nextelements = sourceRow.nextUntil(targetRow, o.container || ':checkbox');
                            o.onSelect((o.container ? targetRow.find(':checkbox') : targetRow), state);
                            o.onSelect((o.container ? sourceRow.find(':checkbox') : sourceRow), state);
                            $.each((o.container ? nextelements.find(':checkbox') : nextelements), function() {
                                o.onSelect($(this), state);
                            });
                        }
                    }
                });

            $('html').mouseup(function() {
                enabled = false;
            });
        });
    };

    $.fn.dragcheck.defaults = {
        container: null,
        onSelect: function(obj, state) {}
    };
});


function TESTablePop() {
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


//<button type="button" class="btn color-st size-lg btn-ripple">data-color</button>
//<button type="button" class="btn color-nd size-lg btn-ripple" data-color="rgba(0, 0, 0, 0.7)">rgba(0, 0, 0, 0.7)</button>
// Array.from(document.querySelectorAll(".btn-ripple")).forEach(function (a) {
//     a.addEventListener("click", function (e) {
//         var ripple = document.createElement("div"),
//             rect = a.getBoundingClientRect();
//         ripple.className = "animate", 
//         ripple.style.left = e.x - rect.left + "px", 
//         ripple.style.top = e.y - rect.top + "px", 3
//         ripple.style.background = (a.dataset.color !== undefined ? a.dataset.color : "rgba(255, 255, 255, 0.3)"), 
//         ripple.style.setProperty("--material-scale", a.offsetWidth), a.append(ripple), 
//         setTimeout(function () {
//             ripple.parentNode.removeChild(ripple);
//         }, 1000);
//     });
// });
// $(window).load(function(){
//     $('.drag-able').dragcheck({
//     container: '.drag-ele',
//     onSelect: function(obj, state) {
//             obj.prop('checked', state);
//         }
//     });
// });

/* 리스트관련하여 2차적용 테스트 필요
const circled_symbol = [
    '① ', '② ', '③ ', '④ ', '⑤ ', '⑥ ', '⑦ ', '⑧ ', '⑨ ', '⑩ ', 
    '⑪ ', '⑫ ', '⑬ ', '⑭ ', '⑮ ', '⑯ ', '⑰ ', '⑱ ', '⑲ ', '⑳ '
];
const ul_elements = document.getElementsByClassName('circled');
Array.prototype.forEach.call(ul_elements, (ul) => {
    let li_elements = ul.getElementsByTagName('li');
    Array.prototype.forEach.call(li_elements, (li, index) => {
        if (index < circled_symbol.length) {
            li.innerText = circled_symbol[index] + li.innerText;
        }
    });
});
*/

// // :root 변수
// let theme = document.querySelector(':root');
// let styles = getComputedStyle(theme);

// console.log(styles.getPropertyValue('--bg-color')); // 변수 값 얻기
// theme.style.setProperty('--bg-color', 'green'); // 변수 값 변경

// // 선택자 변수
// element.style.getPropertyValue("--font-size");
// element.style.setProperty("--font-size", 20);

//https://www.k-pis.go.kr/addMbrAgreView.do 테이블스타일 참조필요

// Count increments every time the function is executed