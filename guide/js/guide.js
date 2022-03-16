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
        },

        gnb: function() {
            $(".guide-nav ul").each(function() {
                $(".guide-nav ul > li ol").hide();
                $(this).find(" > li").mouseenter(function() {
                    let depthSt = $(this);
                    let depthNd = depthSt.find("ol");
                    if (!depthSt.hasClass("active")) {
                        depthSt.addClass("on");
                    }
                    depthNd.slideDown(100).addClass("active");
                }).mouseleave(function() {
                    let depthSt = $(this);
                    let depthNd = depthSt.find("ol");
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
                                let getLink = $(this).text();
                                $(this)
                                    .wrapInner("<a href='#' class='complete' rel='external'></a>")
                                    .children("a").attr('href', getLink)
                                    .closest("tr").css('background', '#fff');
                            }
                        });
                        var frt_tbl_tr = function(frt_tbl) {

                            $(frt_tbl).find('table > tbody > tr').each(function(i) {
                                $("td:first", this).html(i + 1);
                                $(this).find("td").each(function(i) {
                                    $(".frt_tbl  table").attr("border", "0");
                                });
                                $(this).parent().find(".delete").find("td:first").text("삭제");
                                $(this).parent().find(".common").find("td:first").text("공통");
                            });
                            // indexing
                            var fileTot = $(frt_tbl).find('tbody > tr').not(".common, .delete").length;
                            var expect = $(frt_tbl).find('tbody > tr a').closest("td.ing").length;
                            var fileWork = $(frt_tbl).find('tbody > tr').not(".common, .delete").find("a").closest("td").not(".ing").length;
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

                        let targetTable = $(".frt_tbl"),
                            linker = targetTable.find('table tr');
                        linker.each(function() {
                            let Td = $(this).find('td.link'),
                                inLinker = Td.find('a'),
                                $url = inLinker.attr('href');
                            inLinker.off().on('click', function(e) {
                                e.preventDefault;
                                if (!e.ctrlKey) {
                                    if ($('.mobile-frame').hasClass('on')) {
                                        frameChange($url);
                                    } else {
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
                    frt_tbl_tr("." + targetA + realIndex);
                });
            }
        },
    } //last

$(function() {
    ADMIN.init();
    keyEvent();
    $(".shot").trigger("click");
    if ($('.device-frame').length < 1) {
        let deviceBtns = '<div class="device-frame" style="position:absolute; bottom:-60px !important; left:0; transition-duration:0.3s">' +
            '<div class="device-btns">' +
            '<button type="button" data-mode="iPhone5">아이폰5</button>' +
            '<button type="button" data-mode="galaxyS5">갤럭시 S5</button>' +
            '<button type="button" data-mode="iPhone6">아이폰6</button>' +
            '<button type="button" data-mode="iPhoneXR">iPhoneXR</button>' +
            '</div>' +
            '<strong class="info">iPhone6 : 375x667</strong>' +
            '</div>';
        $('.mobile-frame').append(deviceBtns);
    }
    $(".device-frame button").off().on("click", function(e) {
        let mode = $(this).data('mode'),
            $devFrame = $(".device-frame"),
            devices = [
                { 'mode': 'iPhone5', 'width': 320, 'height': 568 },
                { 'mode': 'galaxyS5', 'width': 360, 'height': 640 },
                { 'mode': 'iPhone6', 'width': 375, 'height': 667 },
                { 'mode': 'iPhoneXR', 'width': 414, 'height': 896 },
            ];
        for (let i = 0; i < devices.length; i++) {
            if (mode === devices[i].mode) {
                $devFrame.css({ 'top': (devices[i].height + 3) + 'px', 'width': (devices[i].width + 17) + 'px' });
                $devFrame.children('.info').text(devices[i].mode + ' : ' + devices[i].width + ' x ' + devices[i].height);
                $(".mobile-frame").css({ 'width': (devices[i].width + 17) + 'px', 'height': (devices[i].height) + 'px' });
                let frameMoove = devices[i].width + 17;
                console.log(frameMoove)
                return frameMoove;
            }
        }
    });

    $('.as-tab').off().on('click', '.frame_close', function() {
        if ($(this).closest(".mobile-frame").hasClass("on")) {
            $('.mobile-frame').css("right", -$('.mobile-frame').width() - 6);
            $('.mobile-frame').removeClass('on')
        } else {
            $('.mobile-frame').css("right", "0");
            $('.mobile-frame').addClass('on')
        }
    })

});

function frameChange($url) {
    var thisFrame = $('#mFrame');
    thisFrame.attr('src', $url);
}

function keyEvent() {
    $(document).keydown(function(e) {
        if (e.keyCode == 27) { // escacpe
            if ($('body').hasClass('preview-mode')) {
                $('body').removeClass('preview-mode');
                $(".noti-box").remove();
            } else {
                $('body').addClass('preview-mode');
                $("body").append('<div class="noti-box"></div>');
                $(".noti-box").load("/guide/html/convention_noti.html?" + Date.now(), function(responseTxt, statusTxt, xhr) {});
            }
        }
        if (e.keyCode == 49 || e.keyCode == 97) { // a, A
            window.location = '/guide/html/convention_ia.html';
        }
    });
    $(".guide-gnb").append("<section><span class='on' title='worklist'>①</span> <span title='Pub. reporting'>ESC</span></section>");
}