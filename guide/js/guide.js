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
var ADMIN = ADMIN || {};
var ADMIN = {
        init: function() {
            ADMIN.title();
            ADMIN.gnb();
            ADMIN.tab.init();
        },

        title: function() {
            var olCheck = $(".guide-nav li.inner_on");
            var olCheckParent = olCheck.parent().prev().text();
            var olTxt = olCheck.children("a").text();
            var ulTxt = $(".guide-nav li.active").children("a").text();
            if ((olCheck.length)) {
                $(".guide-contents .tit").text(olCheckParent + " > " + olTxt);
            } else {
                $(".guide-contents .tit").text(ulTxt);
            }
            /* $(".guide .guide-contents .tit").hide(); */
        },

        gnb: function() {
            $(".guide-nav ul").each(function() {
                $(".guide-nav ul > li ol").hide();
                $(this).find(" > li").mouseenter(function() {
                    var depthSt = $(this);
                    var depthNd = depthSt.find("ol");
                    //$(".guide-nav li ol").hide().closest("li").removeClass("active");
                    depthSt.addClass("on");
                    depthNd.slideDown(100).addClass("active");
                });
                $(this).find(" > li").mouseleave(function() {
                    var depthSt = $(this);
                    var depthNd = depthSt.find("ol");
                    depthSt.removeClass("on");
                    depthNd.hide().removeClass("active");
                });
            });
        },

        // tab menu
        tab: {
            init: function() {
                if ($(".as-tab").length == 0 || $(".tab-pass").length) {
                    return;
                }
                this.event();
            },
            event: function() {
                var tab = this;
                var $tabEle = $(".as-tab .area-tab-mnu").find("li");
                $tabEle.find('a[href^="#"]').click(function(e) { e.preventDefault() });
                $tabEle.on("click", function(e) {
                    tab.action($(this), $(this).closest(".area-tab-mnu").find(" > li").index(this));
                });
                if (($tabEle).hasClass("active")) {
                    $(".as-tab .area-tab-mnu > li.active > a").trigger("click");
                } else {
                    $tabEle.eq(0).find("> a").trigger("click");
                }
            },
            action: function(ele, getIndex) {
                var $findNode = $(ele);
                var realIndex = $findNode.index() + 1;
                var $findEle = $findNode.closest(".as-tab").find("> .area-tab-cont .tab-ele");
                $(ele).addClass("active").find(">a").attr("title", "선택된탭");
                $(ele).siblings().removeClass("active").find(">a").attr("title", "");
                $findEle.css("display", "none");
                $findEle.eq(getIndex).css("display", "block");
                console.log(realIndex);

                $(".frt-tbl").empty();
                if (parseInt(realIndex) >= 10) {
                    var targetA = "frt_tbl";
                    var targetB = "tab";
                } else {
                    var targetA = "frt_tbl0";
                    var targetB = "tab0";
                }

                $("." + targetA + realIndex).load("../../guide/html/convention_" + targetB + realIndex + ".html?" + Date.now(), function(responseTxt, statusTxt, xhr) {
                    if (statusTxt == "error...F5") {
                        alert("error");
                    } else if (statusTxt == "success") {
                        // link column
                        var linkLen = $('table td.link');
                        $(linkLen).each(function() {
                            if ($(this).text().length > 1) {
                                var getTag = $(this).wrapInner("<a href='#' class='complete' rel='external'></a>");
                                var getLink = $(this).text();
                                $(this).children("a").attr('href', getLink);
                                $(this).closest("tr").css('background', '#fff');
                            }
                        });
                        var frt_tbl_tr = function(frt_tbl) {

                            $(frt_tbl).find('table > tbody > tr').each(function(i) {
                                $("td:first", this).html(i + 1);
                                $(this).find("td").each(function(i) {
                                    $(".frt_tbl  table").attr("border", "0");
                                });
                            });
                            // indexing
                            var fileTot = $(frt_tbl).find('tbody > tr').not(".link-pass, .del").length;
                            var expect = $(frt_tbl).find('tbody > tr a').closest("td.ing").length;
                            var fileWork = $(frt_tbl).find('tbody > tr').not(".link-pass, .del").find("a").closest("td").not(".ing").length;
                            var fileProgress = parseInt((fileWork / fileTot) * 100) + "%";
                            console.log("대상파일 >", fileTot, ", 완료 >", fileWork, ", 제외 >", expect);

                            // 진행중 텍스트가 들어갈때는 수정태그를 감춤
                            $("table tbody td.ing").next('td')
                                .css("text-align", "center")
                                .text('진행중').css("color", "red").parent("tr").css("background-color", "#efefef");
                            $(frt_tbl).find(">p").empty();
                            $(frt_tbl).prepend('<p style="text-align:right; padding:5px; float:right; margin-top:15px;">front indexing : working <em><strong>' + fileWork + '</strong></em> of total ' + fileTot + ' progress <em><strong>' + fileProgress + '</strong></em></p>');
                            $('a[rel~=external]').attr('target', '_blank');
                        };

                        var targetTable = $(".frt_tbl");
                        var linker = targetTable.find('table tr');
                        linker.each(function() {
                            var Td = $(this).find('td').eq(6),
                                inLinker = Td.find('a'),
                                $url = inLinker.attr('href');
                            inLinker.off().on('click', function(e) {
                                e.preventDefault;
                                if (!e.ctrlKey) {
                                    if ($('.mobile-frame').hasClass('on')) {
                                        console.log("1");
                                        frameChange($url);
                                    } else {
                                        console.log("2");
                                        frameChange($url);
                                        $(".frame_close").trigger('click');
                                    }
                                    return false;
                                }
                            });
                        })
                    }
                    $('.link a').click(function() {
                        $('.link').removeClass('red');
                        $(this).parent('.link').addClass('red');
                    });
                    frt_tbl_tr('.frt_tbl0' + realIndex);
                });
            }
        },
    } //last

$(function() {
    ADMIN.init();
    keyEvent();
    $(".shot").trigger("click");

    $('body').off().on('click', '.frame_close', function() {
        console.log("frame_close");
        $('.mobile-frame').toggleClass('on');
    })
});


function frameChange($url) {
    var thisFrame = $('#mFrame');
    thisFrame.attr('src', $url);
}

function keyEvent() {
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            if ($('body').hasClass('preview-mode')) {
                $('body').removeClass('preview-mode');
            } else {
                $('body').addClass('preview-mode');
            }
        }
        if (e.keyCode == 49 || e.keyCode == 97) {
            window.location = '/guide/html/convention_ia.html';
        }
    });
    $(".guide-gnb").append("<section><span class='on'>① <em>②</em> ③</span> <span>App</span></section>");
}