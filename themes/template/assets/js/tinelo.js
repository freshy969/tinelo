user_info.credits = parseInt(user_info.credits);

var chat_count, game_array = [],

    game_count = 0,

    visit_count, likes_count, matches_count, ssrc, adding_interest = !1,

    bottom = !1,

    show_pulse, me = '',

    show = 0,

    game_count = 0,

    sec_meet_form, profile = re("/:ptth"),

    search_form_interval, placeSearch, autocomplete, componentForm = {

        locality: "long_name",

        country: "long_name"

    },

    in_videocall = !1,

    search_users = !1,

    called = !1,

    peer, payment_method = 0,

    video_user = 0,

    meet_pages = 0,

    videocall_user = 0,

    sec = 0,

    gift_price = 0,

    photos_count = 0,

    timer, _url, current_user_chat, current_user, user_name, title = 0,

    my_profile = 0,

    galleria_photos, noti = 0,

    sendPhoto = {

        success: function(t) {

            if (0 == mobile) {

                $(".current-chat").append(t);

                var e = document.getElementById("chat-container");

                e.scrollTop = e.scrollHeight

            }

        },

        resetForm: !0

    },

    replaceText = function(t, e, o) {

        var a = (t.value || t.innerHTML || "", wdtEmojiBundle.render(o), $("#chat-message").text()),

            i = $("#message-input").val();

        $("#chat-message").text(a + o + " "), $("#message-input").val(i + o + " "), $("#chat-message").focus(), placeCaretAtEnd(document.getElementById("chat-message"))

    },

    fire = function(t, e) {

        var o, a, i, n;

        for (n = wdtEmojiBundle.dispatchHandlers[t], a = 0, i = n.length; i > a; a++)(o = n[a])(e)

    },

    live = function(t, e, o) {

        document.addEventListener(t, function(t) {

            var a = document.querySelectorAll(e);

            if (a) {

                for (var i = t.target, n = -1; i && -1 === (n = Array.prototype.indexOf.call(a, i));) i = i.parentElement;

                n > -1 && o.call(i, t)

            }

        })

    };

live("click", ".wdt-emoji-list a.wdt-emoji", function(t) {

    var e = getSelection(wdtEmojiBundle.input);

    replaceText(wdtEmojiBundle.input, e, ":" + this.dataset.wdtEmojiShortname + ":"), fire("select", {

        el: wdtEmojiBundle.input,

        event: t,

        emoji: ":" + this.dataset.wdtEmojiShortname + ":"

    });

    var o = new Event("input");

    return wdtEmojiBundle.input.dispatchEvent(o), wdtEmojiBundle.close(), !1

}), wdtEmojiBundle.defaults.emojiSheets = {

    apple: theme_source() + "/sheets/sheet_apple_64.png"

}, setTimeout(function() {

    $("[data-murl=" + url + "]").addClass("active"), $("[data-murl=" + url + "]").next("a").css("color", mainColor)

}, 100);







function check_chat_count() {

    chat_count = $("#chat-count").text(), 0 == chat_count ? $("#chat-count").hide() : $("#chat-count").show()

}



function check_menu_count() {

    visit_count = $("#visit-count").text(), likes_count = $("#likes-count").text(), matches_count = $("#matches-count").text(), visit_count = parseInt(visit_count), likes_count = parseInt(likes_count), matches_count = parseInt(matches_count), 0 == visit_count ? $("#visit-count").hide() : $("#visit-count").show(), 0 == likes_count ? $("#likes-count").hide() : $("#likes-count").show(), 0 == matches_count ? $("#matches-count").hide() : $("#matches-count").show();

    var t = visit_count + likes_count + matches_count;

    $("#menu-count").text(t), 0 == t ? $("#menu-count").hide() : $("#menu-count").show()

}



function profilePhoto() {

    $("[data-back-photo]").each(function() {

        var t = $(this).attr("data-src"),

            e = $(this).attr("data-width");

        $(this).css("background-image", "url(" + t + ")"), $(this).css("width", e + "px"), $(this).css("height", e + "px")

    })

}



function siteColor() {

    $("[data-border]").css("border", "1px solid" + mainColor), $("[data-border-footer]").css("border-bottom", "3px solid" + mainColor), $("[data-main-color]").css("color", mainColor), $("[data-main-background]").css("background", mainColor), $("[data-hover-color]").hover(function(t) {

        $(this).css("color", "mouseenter" === t.type ? mainColor : "#333")

    })

}



function re(t) {

    for (var e = t.length, o = ""; e > 0;) o += t.substring(e - 1, e), e--;

    return o

}



function deleteInterest(t) {

    $("[data-interest=" + t + "]").hide(), $.ajax({

        url: request_source() + "/user.php",

        data: {

            action: "del_interest",

            id: t

        },

        type: "post",

        success: function(t) {}

    })

}



function siteModals() {

    $("[data-open-credits-modal]").click(function() {

        $("#creditsModal").modal()

    }), $("[data-open-premium-modal]").click(function() {

        $("#premiumModal").modal()

    }), $("[data-select-payment-method]").click(function() {

        $("[data-select-payment-method]").removeClass("selected"), $(this).addClass("selected")

    }), $("#selectCredits").change(function() {

        var t = $(this).val();

        $("#buyCreditsBtn").html("Buy " + t)

    }), $("#selectPremium").change(function() {

        var t = $(this).val();

        $("#buyPremiumBtn").html(t)

    }), $("[data-introduce-modal]").click(function(t) {

        t.preventDefault(), $("#introduceModal").modal()

    })

}



function goToProfile(t) {

    $(window).scrollTop(0);

    1 == mobile && (window.location.href = "mobile.php?page=profile&id=" + t), $("#data-content").css("opacity", "0.5"), $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "wall",

            id: t

        },

        type: "post",

        success: function(e) {

            $("#data-content").html(e), window.history.pushState("profile", profile_info.name + ", " + profile_info.age + " | " + site_title(), site_config.site_url + "profile/" + profile_info.id + "/" + profile_info.link), $("#data-content").css("opacity", "1"), profilePhoto(), profileLinks(), profilePhotoViewer(), siteModals(), game_btns(), user_info.id == t && uploadPhotos(), siteColor(), profilePhotos(profile_info.id)

        }

    })

}



function goTo(t) {

    window.location.href = site_config.site_url + t;

}



function profileUser() {

    window.location.href = profile + "/" + me + ".com"

}



function goToChat(t) {

    $("#data-content").css("opacity", "0.5"), $("#chat-count").html("0"), check_chat_count(), $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "chat-content"

        },

        type: "post",

        success: function(e) {

            $("#data-content").html(e), window.history.pushState("chat", site_title(), site_config.site_url + "chat"), $("[data-chat]").each(function() {

                var t = $(this).attr("data-message"),

                    e = $(this).attr("data-chat");

                1 == t && $("[data-chat=" + e + "]").addClass("new-message")

            }), $("[data-premium-chat]").click(function() {

                $("#premiumModal").modal()

            });



            var o = t;

            window.location.href;

            profilePhoto();

            $("[data-chat=" + o + "]").removeClass("new-message"), $("#chat-ad").hide(), $("#chat-sect").show(), $(".current").removeClass("current"), $(this).addClass("current"), $(this).find("h3").css("color", "#666"), $("[data-uid=" + o + "]").attr("data-message", 0), in_videocall === !0 && video_user == o && ($(".videocall-chat").hide(), $(".videocall-container").fadeIn()), in_videocall === !0 && video_user != o && ($("[data-uid=" + video_user + "] .friend-list").append('<div class="invideocall"><i class="fa fa-video-camera"></i></div>'), $("[data-uid=" + video_user + "]").attr("data-message", 1), $("[data-uid=" + video_user + "] h3").css("color", "#3ab0ff"), $(".videocall-chat").fadeIn(), $(".videocall-chat").draggable(), $(".videocall-container").hide()), $(".right-section").css("opacity", "0.5"), url = "chat", $.ajax({

                url: request_source() + "/tinelo.php",

                data: {

                    action: "chat",

                    id: o

                },

                type: "post",

                success: function(t) {

                    t = wdtEmojiBundle.render(t), $("[data-message]").hover(function() {

                        $(this).find(".time").fadeIn()

                    }, function() {

                        $(this).find(".time").fadeOut()

                    }), $(".current-chat").html(t), $(".current-chat").click(function() {

                        $(".wdt-emoji-popup").hasClass("open") && $("#open-emoji").click()

                    }), $("#chatPremium").length && ($(".send-message").hide(), $("[data-premium-chat]").click(function() {

                        $("#premiumModal").modal()

                    })), $("p").each(function() {

                        var t = $(this).html(),

                            e = wdtEmojiBundle.render(t);

                        $(this).html(e)

                    }), $("#chat-message").focus(), title = 0, document.title = site_title(), window.history.pushState("chat", site_title(), site_config.site_url + "chat/" + profile_info.id + "/" + profile_info.link), 1 == profile_info.status_info ? $("#chat_name").html('<b style="cursor:pointer">' + profile_info.name + "</b>," + profile_info.age + ' <div class="online"></div>') : $("#chat_name").html('<b style="cursor:pointer">' + profile_info.name + "</b>," + profile_info.age), $("#chat_city").html(profile_info.city + "," + profile_info.country), $("#chat_name").click(function() {

                        goToProfile(profile_info.id)

                    }), $("#delete_conv").click(function() {

                        deleteConv(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

                    }), $("#chat_report").click(function() {

                        reportUser(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

                    }), $("#chat_block").click(function() {

                        reportUser(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

                    }), $("#chat_photos").html(profile_info.chat_photos), current_user = o, current_user_id = o, user_name = t.name, $("[data-cuid=" + o + "]").attr("data-message", 0), $("#r_id").val(o), $("#rid").val(o), scroller(), $(".right-section").css("opacity", "1"), profilePhoto(), current_chat(o);

                    var e = document.getElementById("chat-container");

                    if (e.scrollTop = e.scrollHeight, $(window).scrollTop(0), $("[data-chat=" + o + "]").length) {

                        var a = $("[data-chat=" + profile_info.id + "]").clone();

                        $("[data-chat=" + profile_info.id + "]").remove(), $("#chatFriends").prepend(a), $("[data-chat=" + profile_info.id + "]").addClass("current")

                    } else $("#chatFriends").prepend('<li class="current" data-name="' + profile_info.first_name + '" data-uid="' + profile_info.id + '" data-chat="' + profile_info.id + '" data-all="1" data-fan="1" data-conv="0" data-message="0" data-status="0"><div class="photo" data-back-photo="1" data-src="' + profile_info.profile_photo + '" ></div><h3><b>' + profile_info.first_name + ",</b> " + profile_info.age + ' </h3><h5></h5><span class="last-message-left"></span></li>')

                },

                complete: function() {

                    chatMessage(), checkLastMessage(profile_info.id)

                }

            }), chatMenuBtns(), profilePhoto(), sidebarChat(), $("#send-gift").on("click", function(t) {

                if (t.preventDefault(), $(".gifts").is(":visible")) {

                    var e = $(".current-chat").height();

                    $(".current-chat").css("height", e + 201 + "px"), $(".gifts").hide()

                } else {

                    var e = $(".current-chat").height();

                    $(".current-chat").css("height", e - 159 + "px"), $(".gifts").css("height", "180px"), $(".gifts").show()

                }

            }), $("[data-open-premium-modal]").click(function() {

                $("#premiumModal").modal()

            }), $(".send-gift").click(function() {

                $("body").find(".gifts .selected").removeClass("selected"), $(this).addClass("selected");

                var t = $(this).attr("data-src");

                if (gift_price = $(this).attr("data-gprice"), $("#g_src").val(t), $("#g_id").val(profile_info.id), $("#g_price").val(gift_price), gift_price > user_info.credits) {

                    var e = $(".current-chat").height();

                    $(".current-chat").css("height", e + 201 + "px"), $(".gifts").hide(), $("#creditsModal").modal()

                } else swal({

                    title: twoo_lang[152].text + " " + profile_info.first_name,

                    text: twoo_lang[13].text + " " + gift_price + " " + twoo_lang[17].text,

                    imageUrl: t,

                    showCancelButton: !0,

                    confirmButtonText: twoo_lang[153].text,

                    closeOnConfirm: !0

                }, function() {

                    $("#send-gift-form").submit()

                })

            }), videocallBtn(), $("#send-gift-form").submit(function(t) {

                t.preventDefault();

                var e = $("#g_src").val(),

                    o = "error";

                return 0 == e.length ? (alert(site_lang[198].text), !1) : void $.ajax({

                    type: "POST",

                    url: request_source() + "/tinelo.php",

                    data: $(this).serialize(),

                    success: function(t) {

                        if (t.indexOf(o) > -1) alert(site_lang[199].text);

                        else {

                            var a = $("#g_price").val();

                            user_info.credits = user_info.credits - a, $("#creditsAmount").text(user_info.credits);

                            var i = $(".current-chat").height();

                            $(".current-chat").css("height", i + 201 + "px"), $(".gifts").hide(), $(".current-chat").append('<p class="me" data-message="1" id="me" style="background:#fff"><img src="' + e + '" style="max-width:400px;border-radius:5px"></p>');

                            var n = document.getElementById("chat-container");

                            n.scrollTop = n.scrollHeight

                        }

                    }

                })

            }), $("[data-chat-menu=1]").css("border-bottom", "3px solid" + mainColor), $("[data-chat-menu=1]").css("color", mainColor), $("#send-photo").on("click", function(t) {

                t.preventDefault(), $("#photo-to-send").click()

            }), $("#photo-to-send").change(function() {

                $("#sendPhoto").submit()

            }), $("#sendPhoto").submit(function() {

                return $(this).ajaxSubmit(sendPhoto), !1

            }), wdtEmojiBundle.init("#chat-message"), $(".last-message-left").each(function() {

                var t = $(this).html(),

                    e = wdtEmojiBundle.render(t);

                $(this).html(e)

            }), $("#data-content").css("opacity", "1")

        }

    })

}



function deleteConv(t, e, o) {

    swal({

        title: twoo_lang[58].text,

        text: twoo_lang[154].text + " " + e,

        imageUrl: o,

        showCancelButton: !0,

        confirmButtonColor: "#09c66e",

        confirmButtonText: twoo_lang[132].text,

        cancelButtonText: site_lang[195].text,

        closeOnConfirm: !0

    }, function() {

        $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "del_conv",

                id: t

            },

            dataType: "JSON",

            type: "post",

            success: function(t) {},

            complete: function() {

                $("[data-chat-menu=1]").click(), $("#chat-sect").hide(), $("#chat-ad").show()

            }

        })

    })

}



function reportUser(t, e, o) {

    swal({

        title: site_lang[326].text,

        text: twoo_lang[155].text + " " + e,

        imageUrl: o,

        showCancelButton: !0,

        confirmButtonColor: "#09c66e",

        confirmButtonText: twoo_lang[132].text,

        cancelButtonText: site_lang[195].text,

        closeOnConfirm: !0

    }, function() {

        $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "report",

                id: t

            },

            dataType: "JSON",

            type: "post",

            success: function(t) {},

            complete: function() {

                $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "block",

                        id: t

                    },

                    type: "post",

                    success: function(t) {

                        window.location.href = site_config.site_url + "chat"

                    }

                })

            }

        })

    })

}



function menuLinks() {

    $("[data-murl]").click(function(t) {

        t.preventDefault();

        $(window).scrollTop(0);

        var e = $(this).attr("data-murl"),

            o = ($(this), $(this).attr("data-b"));

        switch ($("[data-murl]").removeClass("active"), $("[data-murl]").next("a").css("color", mainColor), 1 == o && ($("[data-murl=" + e + "]").addClass("active"), $("[data-murl=" + e + "]").next("a").css("color", mainColor)), e) {

            case "meet":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "meet"

                    },

                    type: "post",

                    success: function(t) {



                        $("#data-content").html(t), scroller(), profilePhoto(), meet_limit = 0, meetFilter(), meetPagination(), siteColor(), window.history.pushState("meet", site_title(), site_config.site_url + "meet"), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "popular":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "popular"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), profilePhoto(), window.history.pushState("populars", site_title(), site_config.site_url + "popular"), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "fans":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "fans"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), scroller(), profilePhoto(), siteModals(), window.history.pushState("fans", site_title(), site_config.site_url + "fans"), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "ilike":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "ilike"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), scroller(), profilePhoto(), siteModals(), window.history.pushState("fans", site_title(), site_config.site_url + "fans"), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "credits":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "credits"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), profilePhoto(), siteModals(), window.history.pushState("credits", site_title(), site_config.site_url + "credits"), $("#data-content").css("opacity", "1"), $(".spotlight-me").click(function() {

                            $("[data-spotlight-me]").show(), $(".spotlight-add-me").hide(), $(".spotlight-profile-photo").css("opacity", 1), $(".spotlight-profile-photo").css("zIndex", 9999), $("[data-spotlight-me]").css("border", "2px solid" + mainColor), $("#spotlightModal").modal()

                        }), $(".first-me").on("click", function(t) {

                            t.preventDefault(), user_info.credits < site_prices.first ? $("#creditsModal").modal() : swal({

                                title: twoo_lang[75].text,

                                text: twoo_lang[13].text + " " + site_prices.first + " " + twoo_lang[17].text,

                                imageUrl: user_info.profile_photo,

                                showCancelButton: !0,

                                confirmButtonText: twoo_lang[77].text,

                                closeOnConfirm: !1

                            }, function() {

                                user_info.credits = user_info.credits - site_prices.first, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

                                    type: "POST",

                                    url: request_source() + "/tinelo.php",

                                    data: {

                                        action: "riseUp",
                                        price: site_prices.first

                                    },

                                    success: function(t) {}

                                })

                            })

                        }), $(".boost-me").on("click", function(t) {

                            t.preventDefault(), user_info.credits < site_prices.boost ? $("#creditsModal").modal() : swal({

                                title: twoo_lang[69].text,

                                text: twoo_lang[13].text + " " + site_prices.boost + " " + twoo_lang[17].text,

                                imageUrl: user_info.profile_photo,

                                showCancelButton: !0,

                                confirmButtonText: twoo_lang[71].text,

                                closeOnConfirm: !1

                            }, function() {

                                user_info.credits = user_info.credits - site_prices.boost, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

                                    type: "POST",

                                    url: request_source() + "/tinelo.php",

                                    data: {

                                        action: "riseUp",
                                        price: site_prices.boost

                                    },

                                    success: function(t) {}

                                })

                            })

                        }), $(".cien-me").on("click", function(t) {

                            t.preventDefault(), user_info.credits < site_prices.discover ? $("#creditsModal").modal() : swal({

                                title: twoo_lang[78].text,

                                text: twoo_lang[13].text + " " + site_prices.discover + " " + twoo_lang[17].text,

                                imageUrl: user_info.profile_photo,

                                showCancelButton: !0,

                                confirmButtonText: twoo_lang[80].text,

                                closeOnConfirm: !1

                            }, function() {

                                user_info.credits = user_info.credits - site_prices.discover, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

                                    type: "POST",

                                    url: request_source() + "/tinelo.php",

                                    data: {

                                        action: "discover100",
                                        price: site_prices.discover 

                                    },

                                    success: function(t) {}

                                })

                            })

                        })

                    }

                });

                break;

            case "visits":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "visits"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), scroller(), profilePhoto(), siteModals(), window.history.pushState("visits", site_title(), site_config.site_url + "visits"), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "matches":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "matches"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), profilePhoto(), scroller(), siteModals(), window.history.pushState("matches", site_title(), site_config.site_url + "matches"), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "settings":

                window.location.href = site_config.site_url + "settings";

                break;

            case "discover":

                $("#data-content").css("opacity", "0.5"), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "discover"

                    },

                    type: "post",

                    success: function(t) {

                        if ($("#data-content").html(t), window.history.pushState("discover", site_title(), site_config.site_url + "discover"), "" == game_array) {

                            var e = 140;

                            $("#searching").fadeIn(), $(".discover-tinder").hide(), setTimeout(function() {

                                $(".pulse").fadeIn()

                            }, 200), setTimeout(function() {

                                $(".pulse-photo").fadeIn()

                            }, 200), show_pulse = setInterval(function() {

                                $(".pulse").width(e).height(e), e++, e > 200 && $(".pulse").css("opacity", $(".pulse").css("opacity") - .001), e > 500 && (e = 50, $(".pulse").width(e).height(e), $(".pulse").css("opacity", "0.3"))

                            }, 0), profilePhoto()

                        }

                        game_start(0), game_btns(), $(window).scrollTop(0), $("#data-content").css("opacity", "1")

                    }

                });

                break;

            case "chat":

                $("#data-content").css("opacity", "0.5"), $("#chat-count").html("0"), check_chat_count(), $.ajax({

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "chat-content"

                    },

                    type: "post",

                    success: function(t) {

                        $("#data-content").html(t), window.history.pushState("chat", site_title(), site_config.site_url + "chat"), sidebarChat(), chatMenuBtns(), profilePhoto(), $("[data-premium-chat]").click(function() {

                            $("#premiumModal").modal()

                        }), $("#send-gift").on("click", function(t) {

                            if (t.preventDefault(), $(".gifts").is(":visible")) {

                                var e = $(".current-chat").height();

                                $(".current-chat").css("height", e + 201 + "px"), $(".gifts").hide()

                            } else {

                                var e = $(".current-chat").height();

                                $(".current-chat").css("height", e - 159 + "px"), $(".gifts").css("height", "180px"), $(".gifts").show()

                            }

                        }), $("[data-open-premium-modal]").click(function() {

                            $("#premiumModal").modal()

                        }), $(".send-gift").click(function() {

                            $("body").find(".gifts .selected").removeClass("selected"), $(this).addClass("selected");

                            var t = $(this).attr("data-src");

                            if (gift_price = $(this).attr("data-gprice"), $("#g_src").val(t), $("#g_id").val(profile_info.id), $("#g_price").val(gift_price), gift_price > user_info.credits) {

                                var e = $(".current-chat").height();

                                $(".current-chat").css("height", e + 201 + "px"), $(".gifts").hide(), $("#creditsModal").modal()

                            } else swal({

                                title: twoo_lang[152].text + " " + profile_info.first_name,

                                text: twoo_lang[13].text + " " + gift_price + " " + twoo_lang[17].text,

                                imageUrl: t,

                                showCancelButton: !0,

                                confirmButtonText: twoo_lang[153].text,

                                closeOnConfirm: !0

                            }, function() {

                                $("#send-gift-form").submit()

                            })

                        }), videocallBtn(), $("#send-gift-form").submit(function(t) {

                            t.preventDefault();

                            var e = $("#g_src").val(),

                                o = "error";

                            return 0 == e.length ? (alert(site_lang[198].text), !1) : void $.ajax({

                                type: "POST",

                                url: request_source() + "/tinelo.php",

                                data: $(this).serialize(),

                                success: function(t) {

                                    if (t.indexOf(o) > -1) alert(site_lang[199].text);

                                    else {

                                        var a = $("#g_price").val();

                                        user_info.credits = user_info.credits - a, $("#creditsAmount").text(user_info.credits);

                                        var i = $(".current-chat").height();

                                        $(".current-chat").css("height", i + 201 + "px"), $(".gifts").hide(), $(".current-chat").append('<p class="me" data-message="1" id="me" style="background:#fff"><img src="' + e + '" style="max-width:400px;border-radius:5px"></p>');

                                        var n = document.getElementById("chat-container");

                                        n.scrollTop = n.scrollHeight

                                    }

                                }

                            })

                        }), $("[data-chat-menu=1]").css("border-bottom", "3px solid" + mainColor), $("[data-chat-menu=1]").css("color", mainColor), $("#send-photo").on("click", function(t) {

                            t.preventDefault(), $("#photo-to-send").click()

                        }), $("#photo-to-send").change(function() {

                            $("#sendPhoto").submit()

                        }), $("#sendPhoto").submit(function() {

                            return $(this).ajaxSubmit(sendPhoto), !1

                        }), wdtEmojiBundle.init("#chat-message"), $(".last-message-left").each(function() {

                            var t = $(this).html(),

                                e = wdtEmojiBundle.render(t);

                            $(this).html(e)

                        }), $("#data-content").css("opacity", "1")

                    }

                })

        }

    })

}



function game_start(t) {

   

    if ("" != game_array) {

        if (1 == t) {

            if (game_array.length <= 2) return game_array = "", void game_start(0);

            game_array.splice(0, 1)

        }

        1 == mobile ? $("#dis_name").html('<a href="mobile.php?page=profile&id=' + game_array[0].id + '"><b>' + game_array[0].name + "</b>, " + game_array[0].age + ' <span style="font-size:12px;">' + game_array[0].status + "</span></a>") : ($("#dis_main_name").html('<a href="#" onClick="goToProfile(' + game_array[0].id + ')">' + game_array[0].name + ", <span>" + game_array[0].age + '</span> <span style="font-size:12px;">' + game_array[0].status + "</span></a>"), $(".btn-goback").html('<a href="#" onClick="goToChat(' + game_array[0].id + ')"><img src="' + site_config.theme_url + '/img/goback.png"/></a>'), game_array.length <= 2 ? ($("#dis_next_name").html('<center><a href="#"><span></span></a></center>'), $("#dis_next_photo").attr("data-src", site_config.theme_url + "/img/f.png")) : ($("#dis_next_name").html('<a href="#" onClick="goToProfile(' + game_array[1].id + ')">' + game_array[1].name + ", <span>" + game_array[1].age + '</span> <span style="font-size:12px;">' + game_array[1].status + "</span></a>"), $("#dis_next_photo").attr("data-src", game_array[1].photo))), $("#dis_main_photo").attr("data-src", game_array[0].photo), $(".btn-like").attr("data-id", game_array[0].id), $(".btn-nolike").attr("data-id", game_array[0].id), 1 == mobile ? $("#dis_distance").html(game_array[0].distance + " KM") : ($("#dis_main_info").html("Lives in " + game_array[0].city), game_array.length <= 2 ? $("#dis_next_info").html("") : $("#dis_next_info").html(game_array[1].distance + " KM away from " + game_array[1].city)), $("#dis_city").html(game_array[0].city), galleria_photos = game_array[0].photos, profilePhoto()

    } else $.ajax({

        data: {

            action: "game"

        },

        url: request_source() + "/tinelo.php",

        type: "post",

        dataType: "JSON",

        beforeSend: function() {},

        success: function(t) {

            game_array = t, console.log(game_array), game_array.length <= 2 ? ($("#dis_main_name").html('<center><a href="#"><span>' + twoo_lang[158].text + "</span></a></center>"), $("#dis_main_info").html('<center style="font-size:12px">' + twoo_lang[159].text + "</center>"), $("#dis_main_photo").attr("data-src", site_config.theme_url + "/img/nothing_found.png"), game_array = "", profilePhoto()) : (t.forEach(function(t) {

                var e = t.photo;

                $(".preload-photos").append("<img src=" + e + " style='opacity:0'/>")

            }), 1 == mobile ? $("#dis_name").html('<a href="mobile.php?page=profile&id=' + game_array[0].id + '"><b>' + game_array[0].name + "</b>, " + game_array[0].age + ' <span style="font-size:12px;">' + game_array[0].status + "</span></a>") : ($("#dis_main_name").html('<a href="#" onClick="goToProfile(' + game_array[0].id + ')">' + game_array[0].name + ", <span>" + game_array[0].age + '</span> <span style="font-size:12px;">' + game_array[0].status + "</span></a>"), $(".btn-goback").html('<a href="#" onClick="goToChat(' + game_array[0].id + ')"><img src="' + site_config.theme_url + '/img/goback.png"/></a>'), "undefined" != typeof game_array[1] && ($("#dis_next_name").html('<a href="#" onClick="goToProfile(' + game_array[1].id + ')">' + game_array[1].name + ", <span>" + game_array[1].age + '</span> <span style="font-size:12px;">' + game_array[1].status + "</span></a>"), $("#dis_next_photo").attr("data-src", game_array[1].photo))), $("#dis_main_photo").attr("data-src", game_array[0].photo), $(".btn-like").attr("data-id", game_array[0].id), $(".btn-nolike").attr("data-id", game_array[0].id), 1 == mobile ? $("#dis_distance").html(game_array[0].distance + " KM") : ($("#dis_main_info").html("Lives in " + game_array[0].city), "undefined" != typeof game_array[1] && $("#dis_next_info").html(game_array[1].distance + " KM away from " + game_array[1].city)), $("#dis_city").html(game_array[0].city), galleria_photos = game_array[0].photos, profilePhoto()), $("#searching").hide(), $(".discover-tinder").fadeIn(), clearInterval(show_pulse)

        }

    })

}



function game_btns() {

    $("[data-like]").click(function() {

        var t = $(this).attr("data-id");

        $(this).toggleClass("press", 1e3), $(".old-action").html('<img src="' + site_config.theme_url + '/img/like.png" width="30"/>');

        var e = 1.3;

        $(this).find("img").css({

            "-webkit-transform": "scale(" + e + ")",

            "-moz-transform": "scale(" + e + ")",

            "-ms-transform": "scale(" + e + ")",

            "-o-transform": "scale(" + e + ")",

            transform: "scale(" + e + ")"

        }), e = 1, setTimeout(function() {

            $("[data-like]").find("img").css({

                "-webkit-transform": "scale(" + e + ")",

                "-moz-transform": "scale(" + e + ")",

                "-ms-transform": "scale(" + e + ")",

                "-o-transform": "scale(" + e + ")",

                transform: "scale(" + e + ")"

            })

        }, 200), "profile" == url && ($(this).fadeOut(), $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "game_like",

                id: t,

                like: 1

            },

            type: "post",

            beforeSend: function() {},

            success: function(t) {},

            complete: function() {}

        })), "meet" == url && ($(this).css("color", mainColor), $(this).addClass("like-effect"), $(this).fadeOut("slow"), $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "game_like",

                id: t,

                like: 1

            },

            type: "post",

            beforeSend: function() {},

            success: function(t) {},

            complete: function() {}

        })), "discover" == url && ($(".liked").show(), $("#dis_old_name").html('<a href="#" onClick="goToProfile(' + game_array[0].id + ')">' + game_array[0].name + ", <span>" + game_array[0].age + '</span> <span style="font-size:12px;">' + game_array[0].status + "</span></a>"), $("#dis_old_photo").attr("data-src", game_array[0].photo), $("#dis_old_info").html(game_array[0].distance + " KM away from " + game_array[0].city), game_start(1), $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "game_like",

                id: t,

                like: 1

            },

            type: "post",

            beforeSend: function() {},

            success: function(t) {},

            complete: function() {}

        }))

    }), $("[data-unlike]").click(function() {

        var t = $(this).attr("data-id"),

            e = 1.3;

        $(".old-action").html('<img src="' + site_config.theme_url + '/img/no-like.png" width="30"/>'), $(this).find("img").css({

            "-webkit-transform": "scale(" + e + ")",

            "-moz-transform": "scale(" + e + ")",

            "-ms-transform": "scale(" + e + ")",

            "-o-transform": "scale(" + e + ")",

            transform: "scale(" + e + ")"

        }), e = 1, setTimeout(function() {

            $("[data-unlike]").find("img").css({

                "-webkit-transform": "scale(" + e + ")",

                "-moz-transform": "scale(" + e + ")",

                "-ms-transform": "scale(" + e + ")",

                "-o-transform": "scale(" + e + ")",

                transform: "scale(" + e + ")"

            })

        }, 200), "discover" == url && ($(".liked").show(), $("#dis_old_name").html('<a href="#" onClick="goToProfile(' + game_array[0].id + ')">' + game_array[0].name + ", <span>" + game_array[0].age + '</span> <span style="font-size:12px;">' + game_array[0].status + "</span></a>"), $("#dis_old_photo").attr("data-src", game_array[0].photo), game_start(1), $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "game_like",

                id: t,

                like: 0

            },

            type: "post",

            beforeSend: function() {},

            success: function(t) {},

            complete: function() {}

        }))

    })

}



function startGalleria(t) {

    "discover" == url && (Galleria.loadTheme(theme_source() + "/css/galleria/galleria.classic.min.js"), Galleria.run(".game", {

        autoplay: !0,

        dataSource: t,

        transition: "fade",

        imageCrop: !1

    }), Galleria.ready(function(t) {

        this.attachKeyboard({

            left: this.prev,

            right: this.next

        })

    }))

}



function scroller() {

    $(".webChat").mCustomScrollbar({

        autoHideScrollbar:true,

        theme:"light",

        setTop: 100000,

        scrollButtons:{

            enable: true 

        },

        mouseWheel:{

            preventDefault: true,

            deltaFactor: 120

        }                

    });    

}



function meetFilter() {

    $("#meet_section").css("opacity", "0.5"), $("[data-filter-search]").click(function() {

        $(".search-text").hide(), $(".search-form").fadeIn()

    }), $(window).scroll(function() {

        $(".search-form").is(":visible") && ($(".search-form").hide(), $(".search-text").fadeIn())

    });

    var t = 140;

    setTimeout(function() {

        $(".pulse").fadeIn()

    }, 200), setTimeout(function() {

        $(".pulse-photo").fadeIn()

    }, 200), show_pulse = setInterval(function() {

        $(".pulse").width(t).height(t), t++, t > 200 && $(".pulse").css("opacity", $(".pulse").css("opacity") - .001), t > 500 && (t = 50, $(".pulse").width(t).height(t), $(".pulse").css("opacity", "0.3"))

    }, 0), $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "meet_filter",

            age: meet_age,

            gender: meet_gender,

            radius: meet_radius,

            online: meet_online,

            limit: meet_limit

        },

        type: "post",

        success: function(t) {

            $("#meet_section").html(t), scroller(), profilePhoto(), meetPagination(), game_btns(), $("#meet_section").css("opacity", "1"), $(".search-people-container").show(), $("#searching").fadeOut(), clearInterval(show_pulse), $("#search-results").fadeIn(), show = 0;



            var e = setInterval(function() {

                show++, 24 == show && clearInterval(e), $("[data-search-show=" + show + "]").css("opacity", "1")

            }, 100);

            meetText();

        }

    }), $("[data-filter]").change(function() {

        $("#meet_section").css("opacity", "0");

        var t = 140;

        var a1 = $("#meet_filter_age1").val();

        var a2 = $("#meet_filter_age2").val();

        a1 = parseInt(a1);

        a2 = parseInt(a2);

        if(a1 < 18){

            $("#meet_filter_age1").val(18);

        }

        if(a2 < 18){

            $("#meet_filter_age2").val(18);

        }        

        if(a1 > a2){

            $("#meet_filter_age1").val(a2);

            if(a2 < 18){

               $("#meet_filter_age1").val(18);  

            }

        }        

        $("#searching").fadeIn(), setTimeout(function() {

            $(".pulse").fadeIn()

        }, 200), setTimeout(function() {

            $(".pulse-photo").fadeIn()

        }, 200), show_pulse = setInterval(function() {

            $(".pulse").width(t).height(t), t++, t > 200 && $(".pulse").css("opacity", $(".pulse").css("opacity") - .001), t > 500 && (t = 50, $(".pulse").width(t).height(t), $(".pulse").css("opacity", "0.3"))

        }, 0), meet_age = $("#meet_filter_age1").val() + ','+ $("#meet_filter_age2").val(), meet_gender = $("#meet_filter_gender").val(), meet_radius = $("#meet_filter_radius").val(), meet_online = $("#meet_filter_online").val(), meet_limit = 0, meetText(), $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "meet_filter",

                age: meet_age,

                gender: meet_gender,

                radius: meet_radius,

                online: meet_online,

                limit: meet_limit

            },

            type: "post",

            success: function(t) {

                $("#meet_section").html(t), $(".pulse").hide(), $("#searching").hide(), clearInterval(show_pulse), scroller(), profilePhoto(), meetPagination(), game_btns(), $("#meet_section").css("opacity", "1"), $(".search-people-container").show(), $("#search-results").fadeIn(), show = 0;

                var e = setInterval(function() {

                    show++, 25 == show && clearInterval(e), $("[data-search-show=" + show + "]").css("opacity", "1")

                }, 100)

            }

        })

    })

}



function meetPagination() {

    $("[data-meet]").click(function() {

        $("#meet_section").css("opacity", "0.5");

        var t = $(this).attr("data-meet");

        $("#meet_filter_limit").val(t), meet_age = $("#meet_filter_age1").val() +','+ $("#meet_filter_age2").val(), meet_gender = $("#meet_filter_gender").val(), meet_radius = $("#meet_filter_radius").val(), meet_online = $("#meet_filter_online").val(), meet_limit = $("#meet_filter_limit").val(), $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "meet_filter",

                age: meet_age,

                gender: meet_gender,

                radius: meet_radius,

                online: meet_online,

                limit: meet_limit

            },

            type: "post",

            success: function(t) {

                $("#meet_section").html(t), scroller(), profilePhoto(), meetPagination(), game_btns(), $("#meet_section").css("opacity", "1")

            }

        })

    })

}



function abort() {

    return !1

}



function meetText() {

    $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "meet_text",

            age: meet_age,

            gender: meet_gender,

            radius: meet_radius,

            online: meet_online,

            limit: 0

        },

        type: "post",

        success: function(t) {

            $(".search-text").html(t), siteColor(), meetLocInitialize(), $("[data-filter-search]").click(function() {

                $(".search-text").hide(), $(".search-form").fadeIn()

            })

        }

    })

}



function meetLocInitialize() {

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("meet_filter_city"), {

        types: ["geocode"]

    }), google.maps.event.addListener(autocomplete, "place_changed", function() {

        meetUpdateAddress()

    })

}



function meetUpdateAddress() {

    for (var t = autocomplete.getPlace(), e = "", o = "", a = t.geometry.location.lat(), i = t.geometry.location.lng(), n = 0; n < t.address_components.length; n++) {

        var s = t.address_components[n].types[0];

        if (componentForm[s]) {

            var r = t.address_components[n][componentForm[s]];

            "locality" == t.address_components[n].types[0] && (e = r), "country" == t.address_components[n].types[0] && (o = r)

        }

    }

    $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "update_location",

            city: e,

            country: o,

            lat: a,

            lng: i

        },

        type: "post",

        success: function(t) {

            $("#meet_section").css("opacity", "0.5"),

            meet_age = $("#meet_filter_age1").val() +','+ $("#meet_filter_age2").val(),

            meet_gender = $("#meet_filter_gender").val(),

            meet_radius = $("#meet_filter_radius").val(),

            meet_online = $("#meet_filter_online").val(),

            meet_limit = 0,

            $.ajax({

                url: request_source() + "/tinelo.php",

                data: {

                    action: "meet_filter",

                    age: meet_age,

                    gender: meet_gender,

                    radius: meet_radius,

                    online: meet_online,

                    limit: meet_limit

                },

                type: "post",

                success: function(t) {

                    $("#meet_section").html(t), scroller(), profilePhoto(), meetPagination(), game_btns(), $("#meet_section").css("opacity", "1"),

                    meetText(), updateSpotlight();

                }

            })

        }

    })

}



function readFile() {



var filesSelected = document.getElementById("add-photos-file").files;

    if (filesSelected.length > 0) {

      var fileToLoad = filesSelected[0];



      var fileReader = new FileReader();



      fileReader.onload = function(fileLoadedEvent) {

        var srcData = fileLoadedEvent.target.result; 

        $('.user-avata').hide();

        $('.user-avatar').css('background-image', 'url('+srcData+')');

        $('.user-avata').fadeIn();        

      }

      fileReader.readAsDataURL(fileToLoad);

    }

}





function profileLinks() {

    $("#profile_report").click(function() {

        reportUser(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

    }), $("#profile_block").click(function() {

        reportUser(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

    }), $("[data-profile-tab=1]").show(), $("[data-profile-menu=1]").css("border-bottom", "3px solid" + mainColor), $("[data-profile-menu=1]").css("color", mainColor), $("[data-profile-menu]").click(function() {

        var t = $(this).attr("data-profile-menu");

        $("[data-profile-tab]").hide(), $("[data-profile-menu]").css("border-bottom", "1px solid #fff"), $("[data-profile-menu]").css("color", "#777"), $("[data-profile-menu=" + t + "]").css("border-bottom", "3px solid" + mainColor), $("[data-profile-menu=" + t + "]").css("color", mainColor), $("[data-profile-tab=" + t + "]").fadeIn()

    }), $("[data-profile-photo]").click(function() {

        var t = $(this).attr("data-profile-photo");

        $("[data-profile-tab]").hide(), $("[data-profile-menu]").css("border-bottom", "1px solid #fff"), $("[data-profile-menu]").css("color", "#777"), $("[data-profile-menu=" + t + "]").css("border-bottom", "3px solid" + mainColor), $("[data-profile-menu=" + t + "]").css("color", mainColor), $("[data-profile-tab=" + t + "]").fadeIn()

    }), $("#add-photos,#add-photos-big,#firstPhoto").on("click", function(t) {

        t.preventDefault(), $("#add-photos-file").click()

    }), $(".photo-current").on("click", function(t) {

        t.preventDefault(), $(this).closest("div").next("button").click()

    }), $("#private-photos").on("click", function(t) {

        t.preventDefault(), $("#add-private-photos-file").click()

    }), $("#insta-import,#insta-import2").on("click", function(t) {

        swal({

            title: "",

            imageUrl: site_config.theme_url + "/img/instagramo.jpg",

            text: site_lang[329].text,

            type: "input",

            showCancelButton: !0,

            showLoaderOnConfirm: !0,

            closeOnConfirm: !1,

            animation: "slide-from-top",

            confirmButtonColor: "#527FA4",

            inputPlaceholder: site_lang[331].text

        }, function(t) {

            return t === !1 ? !1 : "" === t ? (swal.showInputError(site_lang[330].text), !1) : void $.ajax({

                url: request_source() + "/user.php",

                data: {

                    action: "instagram",

                    insta: t

                },

                type: "post",

                beforeSend: function() {},

                success: function(t) {

                    1 == mobile ? goToProfile(user_info.id) : window.location.href = site_config.site_url + "profile/" + user_info.id + "/photo"

                }

            })

        })

    }), $("#add-photos-file").change(function() {

        readFile();

        $("#add-photos-form").submit()

    }), $("#add-private-photos-file").change(function() {

        $("#add-private-photos-form").submit()

    }), $("[data-add-interest]").blur(function() {

        adding_interest = !1, $("#trendingInterest").hide(), $("#socialVerify").fadeIn(), $(this).text(site_lang[283].text + " " + site_lang[276].text), $(this).css("width", "35%"), $(this).css("border", "none"), $(this).css("background", "#6ACC33"), $(this).prop("contenteditable", !1), $(this).css("outline", "none"), $(this).css("color", "#fff")

    }), $("[data-add-interest]").click(function() {

        $("#trendingInterest").fadeIn(), $("#socialVerify").hide(), adding_interest = !0, $(this).text(""), $(this).css("width", "35%"), $(this).css("border", "1px solid #999"), $(this).css("background", "#fff"), $(this).prop("contenteditable", !0), $(this).css("outline", "none"), $(this).css("color", "#333"), $(this).focus()

    }), $("[data-add-interest]").keyup(function(t) {

        switch (t.keyCode) {

            case 13:

                if (1 == adding_interest) {

                    t.preventDefault();

                    var e = ($("#new-int").html(), $("[data-add-interest]").text());

                    $("[data-add-interest]").text(""), $.ajax({

                        url: request_source() + "/user.php",

                        data: {

                            action: "add_interest",

                            name: e

                        },

                        type: "post",

                        dataType: "json",

                        success: function(t) {

                            0 == t.error && $("#new-int").append('<div class="int" data-interest="' + t.id + '"><span>' + t.name + '</span><div class="delete_int" onclick="deleteInterest(' + t.id + ')" ><i class="material-icons">close</i></div></div>')

                        }

                    })

                }

        }

    })

}



function profilePhotoViewer() {

    $(".fbphotobox-overlay").remove(), $(".fbphotobox-main-container").remove(), $(".fbphotobox-fc-main-container").remove(), $(".fbphotobox-main-container").remove(), $("[data-photo]").fbPhotoBox({

        rightWidth: 350,

        leftBgColor: "black",

        rightBgColor: "white",

        footerBgColor: "black",

        overlayBgColor: "#1D1D1D",

        profile: !0

    })

}



function sidebarChat() {

    $("[data-chat]").each(function() {

        var t = $(this).attr("data-message"),

            e = $(this).attr("data-chat");

        1 == t && $("[data-chat=" + e + "]").addClass("new-message")

    }), $("[data-chat]").on("click", function() {

        var t = $(this).attr("data-uid");

        window.location.href;

        $("[data-chat=" + t + "]").removeClass("new-message"), $("#chat-ad").hide(), $("#chat-sect").show(), $(".current").removeClass("current"), $(this).addClass("current"), $(".send-message").show(), $("#chat-message").html(""), $(this).find("h3").css("color", "#666"), $("[data-uid=" + t + "]").attr("data-message", 0), in_videocall === !0 && video_user == t && ($(".videocall-chat").hide(), $(".videocall-container").fadeIn()), in_videocall === !0 && video_user != t && ($("[data-uid=" + video_user + "] .friend-list").append('<div class="invideocall"><i class="fa fa-video-camera"></i></div>'), $("[data-uid=" + video_user + "]").attr("data-message", 1), $("[data-uid=" + video_user + "] h3").css("color", "#3ab0ff"), $(".videocall-chat").fadeIn(), $(".videocall-chat").draggable(), $(".videocall-container").hide()), $(".right-section").css("opacity", "0.5"), url = "chat", $.ajax({

            url: request_source() + "/tinelo.php",

            data: {

                action: "chat",

                id: t

            },

            type: "post",

            success: function(e) {

                e = wdtEmojiBundle.render(e), $("[data-message]").hover(function() {

                    $(this).find(".time").fadeIn()

                }, function() {

                    $(this).find(".time").fadeOut()

                }), $(".current-chat").html(e), $("p").each(function() {

                    var t = $(this).html(),

                        e = wdtEmojiBundle.render(t);

                    $(this).html(e)

                }), $(window).scrollTop(0),$("#chat-message").focus(), title = 0, document.title = site_title(), window.history.pushState("chat", site_title(), site_config.site_url + "chat/" + profile_info.id + "/" + profile_info.link), 1 == profile_info.status_info ? $("#chat_name").html('<b style="cursor:pointer">' + profile_info.name + "</b>," + profile_info.age + ' <div class="online"></div>') : $("#chat_name").html('<b style="cursor:pointer">' + profile_info.name + "</b>," + profile_info.age), $(".current-chat").click(function() {

                    $(".wdt-emoji-popup").hasClass("open") && $("#open-emoji").click()

                }), $("#chat_city").html(profile_info.city + "," + profile_info.country), $("#chat_name").click(function() {

                    goToProfile(profile_info.id)

                }), $("#delete_conv").click(function() {

                    deleteConv(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

                }), $("#chat_report").click(function() {

                    reportUser(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

                }), $("#chat_block").click(function() {

                    reportUser(profile_info.id, '"' + profile_info.name + '"', '"' + profile_info.profile_photo + '"')

                }), $("#chat_photos").html(profile_info.chat_photos), current_user = t, current_user_id = t, user_name = e.name, $("[data-cuid=" + t + "]").attr("data-message", 0), $("#r_id").val(t), $("#rid").val(t), scroller(), $(".right-section").css("opacity", "1"), profilePhoto(), current_chat(t);

                var o = document.getElementById("chat-container");

                o.scrollTop = o.scrollHeight

            },

            complete: function() {

                chatMessage(), checkLastMessage(profile_info.id)

            }

        })

    })

}



function chatMessage() {

    $("body").keyup(function(t) {

        switch (t.keyCode) {

            case 13:

                $("#c-send").submit()

        }

    }), $(document).on("click", function() {

        $(".emoticons").hide()

    }), $("[data-access]").on("click", function() {

        var t = $(this).attr("data-access");

        $("[data-access]").fadeOut(), "yes" == t ? $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "access",

                access: 1,

                r_id: current_user_id

            },

            beforeSend: function() {

                $(".current-chat").append('<p class="me" data-message="1" id="me">' + site_lang[189].text + "</p>")

            },

            success: function(t) {}

        }) : $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "access",

                access: 2,

                r_id: current_user_id

            },

            beforeSend: function() {

                $(".current-chat").append('<p class="me" data-message="1" id="me">' + site_lang[190].text + "</p>")

            },

            success: function(t) {}

        })

    }), $("#c-send").submit(function(t) {

        t.preventDefault();

        var e = $("#r_id").val(),

            o = $("#chat-message").text(),

            a = 0;

        return 1 == mobile && (a = 1), $("#readStatus").hide(), 0 == o.length ? !1 : void $.ajax({

            type: "POST",

            dataType: "JSON",

            url: request_source() + "/tinelo.php",

            data: {

                action: "send",

                r_id: e,

                message: o,

                mobile: a

            },

            beforeSend: function() {

                var t = escapeHtml(o);

                t = wdtEmojiBundle.render(t);

                var e = $(".current-chat p").length;

                $(".current-chat").append('<p class="me" data-message="1" id="me">' + t + "</p>");

                var a = document.getElementById("chat-container");

                a.scrollTop = a.scrollHeight, $("#chat-message").html(""), 0 == e && newChat()

            },

            success: function(t) {

                $("[data-chat-menu=1]").click()

            }

        })

    })

}



function newChat() {

    $.ajax({

        type: "POST",

        url: request_source() + "/tinelo.php",

        data: {

            action: "today"

        },

        success: function(t) {},

        complete: function() {}

    })

}



function checkLastMessage(t) {

    $.ajax({

        type: "POST",

        url: request_source() + "/tinelo.php",

        data: {

            action: "lastm",

            user: t

        },

        success: function(t) {

            $(".right-section .info").remove(), 1 == t && $(".right-section").append('<div class="info" id="readStatus"><center>' + profile_info.first_name + " " + twoo_lang[160].text + "</center></div>"), 2 == t && $(".right-section").append('<div class="info" id="readStatus" style="background:#ecffce"><center>' + profile_info.first_name + "  " + twoo_lang[161].text + "</center></div>")

        }

    })

}



function current_chat(t) {

    var e = 0;

    1 == mobile && (e = 1), $.ajax({

        data: {

            action: "current",

            uid: t,

            mobile: e

        },

        url: request_source() + "/tinelo.php",

        type: "post",

        dataType: "JSON",

        success: function(t) {

            if (1 == t.result) {

                if (t.message = wdtEmojiBundle.render(t.message), t.chat = wdtEmojiBundle.render(t.chat), 1 == mobile) {

                    var e = $("[data-ix=list-item]").length,

                        o = $("[data-ix=list-item]:last-child").attr("id");

                    "you" == o && 0 == t.photo && e >= 1 ? ($("[data-ix=list-item]:last-child").find(".chat-text:first").append("<br>" + t.message), $("html, body").animate({

                        scrollTop: $("#bottom").offset().top

                    }, 1e3)) : ($(".list-chats").append(t.chat), $("html, body").animate({

                        scrollTop: $("#bottom").offset().top

                    }, 1e3))

                } else {

                    $(".current-chat").append(t.chat);

                    var a = document.getElementById("chat-container");

                    a.scrollTop = a.scrollHeight

                }

                title += 1, document.title = "( " + title + " ) " + site_title()

            }

        },

        complete: function() {

            current_user_chat = setTimeout(function() {

                current_chat(current_user)

            }, 3e3)

        }

    })

}



function chat_notification() {

    noti = 0;

    var t = window.location.href;

    if (t.indexOf("page=chat") > -1) {

        var e = current_user_id;

        $.ajax({

            type: "POST",

            dataType: "JSON",

            url: request_source() + "/tinelo.php",

            data: {

                action: "notification",

                user: e

            },

            success: function(t) {

                t.forEach(function(t) {

                    title += 1, document.title = "( " + title + " ) " + site_title(), $("[data-chat=" + t + "]").length ? ($("[data-chat=" + t + "]").attr("data-message", 1), $("[data-chat=" + t + "]").addClass("new-message"), $("#chat-filter").val(5).change()) : new_message()

                })

            },

            complete: function() {

                setTimeout(function() {

                    chat_notification()

                }, 5e3)

            }

        })

    } else $.ajax({

        type: "POST",

        dataType: "JSON",

        url: request_source() + "/tinelo.php",

        data: {

            action: "notification",

            user: 0

        },

        success: function(t) {

            1 == mobile ? t.forEach(function(t) {

                0 == noti && ($("#notiSound")[0].play(), noti = 1), title += 1, document.title = "( " + title + " ) " + site_title(), $("#mobile-new-message").html(title), $("#mobile-new-message").show()

            }) : t.forEach(function(t) {

                0 == noti && ($("#notiSound")[0].play(), noti = 1), title += 1, document.title = "( " + title + " ) " + site_title(), $("#chat-count").text(title), check_chat_count(), new_message()

            })

        },

        complete: function() {

            setTimeout(function() {

                chat_notification()

            }, 5e3)

        }

    })

}



function chat_unread() {

    $.ajax({

        type: "POST",

        dataType: "JSON",

        url: request_source() + "/tinelo.php",

        data: {

            action: "unread"

        },

        success: function(t) {

            t > 0 && (document.title = "( " + t + " ) " + site_title(), $("#chat-count").text(t), check_chat_count())

        },

        complete: function() {

            setTimeout(function() {

                chat_unread()

            }, 5e3)

        }

    })

}



function new_message() {

    $("[data-chat-menu=2]").click()

}



function chatMenuBtns() {

    $("[data-chat-menu]").click(function() {

        var t = $(this).attr("data-chat-menu");

        $("[data-chat-menu]").css("border-bottom", "1px solid #fff"), $("[data-chat-menu]").css("color", "#777"), $("[data-chat-menu=" + t + "]").css("border-bottom", "3px solid" + mainColor), $("[data-chat-menu=" + t + "]").css("color", mainColor);

        var e = $(this).attr("data-chat-menu");

        1 != t && $("#chatFriends").css("opacity", "0.6"), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "friends",

                val: e

            },

            success: function(t) {

                $("#chatFriends").html(t), profilePhoto(), sidebarChat(), "" != videocall_user && $("[data-chat=" + profile_info.id + "]").addClass("current"), $("#chatFriends").css("opacity", "1")

            }

        })

    })

}



function profilePhotos(t) {

    $.ajax({

        type: "POST",

        url: request_source() + "/tinelo.php",

        data: {

            action: "uphotos",

            id: t

        },

        success: function(e) {

            $("#managePhotos").html(e), profilePhoto(), profilePhotoViewer(), privateLinks(), user_info.id == t && managePhotos()

        }

    })

}



function uploadPhotos() {

    if(userPo == 0){

        $("#add-photos-form").ajaxForm({

            beforeSend: function() {

                $('.add-ava-step-1').hide();

                $('.add-ava-step-2').fadeIn();

            },

            success: function(t) {},

            complete: function(t) {

                result = t.responseText, result = $.parseJSON(result), $.each(result, function(t, e) {

                    e.success ? $.ajax({

                        type: "POST",

                        url: request_source() + "/tinelo.php",

                        data: {

                            action: "photo"

                        },

                        success: function(t) {

                            var e = user_info.total_photos;

                            window.location.reload();

                        }

                    }) : e.error && ($("#user-photos").show(), $("#loading-photos").hide(), error = e.error, html = "<br><center>", html += "<p>" + error + "</p></center>", $("#user-photos").append(html))

                })

            }

        }); 

    } else {

        $("#add-photos-form").ajaxForm({

            beforeSend: function() {

                1 == mobile ? $("#new-stack").removeClass("stop-loading") : $(".photo-loader").show()

            },

            success: function(t) {},

            complete: function(t) {

                result = t.responseText, result = $.parseJSON(result), $.each(result, function(t, e) {

                    e.success ? $.ajax({

                        type: "POST",

                        url: request_source() + "/tinelo.php",

                        data: {

                            action: "photo"

                        },

                        success: function(t) {

                            var e = user_info.total_photos;

                            (0 == e || 1 == mobile) && window.location.reload(), $(".photo-loader").hide(), $("#userPhotos").html(t), profilePhoto(), $.ajax({

                                type: "POST",

                                url: request_source() + "/tinelo.php",

                                data: {

                                    action: "manage",

                                    pid: 0,

                                    profile: 0,

                                    block: 0,

                                    unblock: 0,

                                    del: 0

                                },

                                success: function(t) {

                                    $("#managePhotos").html(t), managePhotos(), profilePhoto()

                                }

                            })

                        }

                    }) : e.error && ($("#user-photos").show(), $("#loading-photos").hide(), error = e.error, html = "<br><center>", html += "<p>" + error + "</p></center>", $("#user-photos").append(html))

                })

            }

        });        

    }

    $("#add-private-photos-form").ajaxForm({

        beforeSend: function() {

            $(".photo-loader").show()

        },

        success: function(t) {},

        complete: function(t) {

            result = t.responseText, result = $.parseJSON(result), $.each(result, function(t, e) {

                e.success ? $.ajax({

                    type: "POST",

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "photo"

                    },

                    success: function(t) {

                        $(".photo-loader").hide(), $.ajax({

                            type: "POST",

                            url: request_source() + "/tinelo.php",

                            data: {

                                action: "manage",

                                pid: 0,

                                profile: 0,

                                block: 0,

                                unblock: 0,

                                del: 0

                            },

                            success: function(t) {

                                $("#managePhotos").html(t), managePhotos(), profilePhoto()

                            }

                        })

                    }

                }) : e.error && ($("#user-photos").show(), $("#loading-photos").hide(), error = e.error, html = "<br><center>", html += "<p>" + error + "</p></center>", $("#user-photos").append(html))

            })

        }

    })

}



function placeCaretAtEnd(t) {

    if (t.focus(), "undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {

        var e = document.createRange();

        e.selectNodeContents(t), e.collapse(!1);

        var o = window.getSelection();

        o.removeAllRanges(), o.addRange(e)

    } else if ("undefined" != typeof document.body.createTextRange) {

        var a = document.body.createTextRange();

        a.moveToElementText(t), a.collapse(!1), a.select()

    }

}



function escapeHtml(t) {

    var e = {

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

    };

    return t.replace(/[&<>"']/g, function(t) {

        return e[t]

    })

}



function updatePeer(t) {

    $.ajax({

        url: request_source() + "/videocall.php",

        data: {

            action: "update",

            peer: t

        },

        type: "post",

        success: function(t) {}

    })

}



function setInVideoCall() {

    $.ajax({

        url: request_source() + "/videocall.php",

        data: {

            action: "invideocall"

        },

        type: "post",

        success: function(t) {}

    })

}



function peerConnect(t) {

    1 == t && peer.destroy(), navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, peer = new Peer({

        host: "" + site_config.videocall,

        secure: !0,

        port: 443,

        key: "peerjs"

    }), peer.on("open", function() {

        updatePeer(peer.id)

    }), peer.on("close", function() {}), peer.on("disconnected", function() {}), peer.on("call", function(t) {

        $.ajax({

            url: request_source() + "/videocall.php",

            data: {

                action: "income",

                peer: t.peer

            },

            type: "post",

            dataType: "JSON",

            success: function(e) {

                $("#turn-video").click(function() {

                    $(this).toggleClass("sbulb"), window.localStream.getVideoTracks()[0].enabled = !window.localStream.getVideoTracks()[0].enabled;

                    var t = $(this).hasClass("sbulb");

                    t === !0 ? ($(".profile-photo1 video").hide(), $(".profile-photo1 img").show()) : ($(".profile-photo1 video").show(), $(".profile-photo1 img").hide())

                }), $("#turn-mic").click(function() {

                    $(this).toggleClass("sbulb"), window.localStream.getAudioTracks()[0].enabled = !window.localStream.getAudioTracks()[0].enabled

                }), video_user = e.id, $("#call-name").html(e.name), $(".ball").css("background-image", "url(" + e.photo + ")"), $("#text_videocall").html(e.name + " " + site_lang[337].text), $(".videocall-notify").fadeIn(), called = !0, callSound = setInterval(function() {

                    $("#callSound")[0].play()

                }, 4e3), setTimeout(function() {

                    $("body").toggleClass("anim-start")

                }, 300), $("#acept-video").click(function() {

                    aceptcall(t)

                }), $("#reject-video").click(function() {

                    rejectVideo()

                })

            }

        }), setInVideoCall()

    }), peer.on("error", function(t) {

        "network" === t.type

    })

}



function rejectVideo() {

    in_videocall === !0 && (window.localStream.stop(), window.localStream = null), peerConnect(1), $(".videocall-notify").fadeOut(), in_videocall = !1, setTimeout(function() {

        $("body").toggleClass("anim-start")

    }, 2e3), clearInterval(callSound), $("#callSound")[0].pause()

}



function videocall(t, e) {

    var o = "";

    $.ajax({

        url: request_source() + "/videocall.php",

        data: {

            action: "getpeerid",

            id: e

        },

        type: "post",

        dataType: "JSON",

        success: function(t) {

            return o = t.peer, 2 == t.status ? (swal({

                title: "</3",

                text: t.name + " " + site_lang[207].text,

                imageUrl: t.photo

            }, function() {}), !1) : 0 == t.status ? (swal({

                title: "T_T",

                text: t.name + " " + site_lang[208].text,

                imageUrl: t.photo

            }, function() {}), !1) : (in_videocall = !0, setInVideoCall(), $("#call_status").html(site_lang[209].text), $("#call-name").html(t.name), startVideoCall(o), $(".videocall-container").show(), callSound = setInterval(function() {

                $("#callSound")[0].play()

            }, 4e3), 1 == mobile ? ($(".ball").css("background-image", "url(" + t.photo + ")"), setTimeout(function() {

                $("body").toggleClass("anim-start")

            }, 300)) : ($(".profile-photo2").prop("src", t.photo), $(".avatar-profile").hide(), $(".profile-photo2").animate({

                left: "39%",

                top: "25%"

            }, 1e3, function() {})), void 0)

        }

    })

}



function videocallBtn() {

    $("#videocall").click(function(t) {

        return t.preventDefault(), in_videocall === !0 ? (swal({

            title: "Error",

            text: site_lang[210].text,

            type: "error"

        }, function() {}), !1) : 0 == user_info.premium && 0 == account_basic.videocall ? (swal({

            title: "Error",

            text: site_lang[211].text,

            type: "error"

        }, function() {

            $("#payment_module").show()

        }), !1) : (video_user = $("#r_id").val(), videocall_user = $("#r_id").val(), void $.ajax({

            url: request_source() + "/videocall.php",

            data: {

                action: "check",

                id: videocall_user

            },

            type: "post",

            success: function(t) {

                1 == t ? videocall(peer.id, $("#r_id").val()) : swal({

                    title: profile_info.first_name + " " + site_lang[382].text,

                    text: profile_info.first_name + " " + site_lang[383].text,

                    imageUrl: profile_info.profile_photo,

                    showCancelButton: !1,

                    confirmButtonText: site_lang[384].text,

                    closeOnConfirm: !0

                }, function() {})

            }

        }))

    })

}



function aceptcall(t) {

    in_videocall = !0, $("#call_status").html(site_lang[209].text), $(".videocall-notify").fadeOut(), $(".videocall-container").fadeIn(), $(".profile-photo2").animate({

        left: "39%",

        top: "25%"

    }, 1e3, function() {}), navigator.getUserMedia({

        audio: !0,

        video: !0

    }, function(e) {

        timer = setInterval(function() {

            document.getElementById("seconds").innerHTML = pad(++sec % 60), document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10))

        }, 1e3), 1 == mobile ? $("#myCam").prop("src", (window.URL ? URL : webkitURL).createObjectURL(e)) : $("#my-video").prop("src", (window.URL ? URL : webkitURL).createObjectURL(e)), window.localStream = e, t.answer(window.localStream), makeTheCall(t)

    }, function() {

        swal({

            title: site_lang[212].text,

            text: site_lang[213].text,

            type: "error"

        }, function(t) {

            t && location.reload()

        })

    })

}



function startVideoCall(t) {

    navigator.getUserMedia({

        audio: !0,

        video: !0

    }, function(e) {

        1 == mobile ? $("#myCam").prop("src", (window.URL ? URL : webkitURL).createObjectURL(e)) : $("#my-video").prop("src", (window.URL ? URL : webkitURL).createObjectURL(e)), $("#call_status").html(site_lang[381].text), timer = setInterval(function() {

            document.getElementById("seconds").innerHTML = pad(++sec % 60), document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10))

        }, 1e3), $("#turn-video").click(function() {

            $(this).toggleClass("sbulb"), window.localStream.getVideoTracks()[0].enabled = !window.localStream.getVideoTracks()[0].enabled;

            var t = $(this).hasClass("sbulb");

            t === !0 ? ($(".profile-photo1 video").hide(), $(".profile-photo1 img").show()) : ($(".profile-photo1 video").show(), $(".profile-photo1 img").hide())

        }), $("#turn-mic").click(function() {

            $(this).toggleClass("sbulb"), window.localStream.getAudioTracks()[0].enabled = !window.localStream.getAudioTracks()[0].enabled

        }), window.localStream = e;

        var o = peer.call(t, window.localStream);

        makeTheCall(o)

    }, function() {

        swal({

            title: site_lang[212].text,

            text: site_lang[213].text,

            type: "error"

        }, function(t) {

            t && location.reload()

        })

    })

}



function finishCall() {

    $("#minutes").text(), $("#seconds").text();

    clearInterval(timer), $(".videocall-notify").fadeOut(), $(".videocall-container").fadeOut(), in_videocall = !1, 1 == called && $("body").toggleClass("anim-start"), $(".videocall-container").fadeOut(), $("#message_status").remove(), window.localStream.stop(), window.localStream = null, window.location.reload(), $(".chat-container").scrollTop(1e5), clearInterval(callSound), $("#callSound")[0].pause()

}



function makeTheCall(t) {

    var e = !1;

    window.existingCall && window.existingCall.close();

    var o = $(".profile-photo2").attr("src");

    setTimeout(function() {

        0 == e && swal({

            title: site_lang[214].text,

            text: site_lang[215].text,

            imageUrl: o,

            showCancelButton: !0,

            confirmButtonColor: "#DD6B55",

            confirmButtonText: site_lang[216].text,

            cancelButtonText: site_lang[217].text,

            closeOnConfirm: !1

        }, function() {

            location.reload()

        })

    }, 5e4), t.on("stream", function(t) {

        e = !0, clearInterval(callSound), $("#callSound")[0].pause(), 1 == mobile ? ($("#chatUserVideo").prop("src", (window.URL ? URL : webkitURL).createObjectURL(t)), $(".myCam").draggable(), $(".video-profile").show()) : ($("#their-video").prop("src", (window.URL ? URL : webkitURL).createObjectURL(t)), $("#video-chat").prop("src", (window.URL ? URL : webkitURL).createObjectURL(t)), $(".profile-photo1").animate({

            left: "80%"

        }, 500, function() {

            $(".profile-photo2").hide(), $(".video").show()

        }), $("#chat-call").on("click", function() {

            $(".videocall-chat").show(), $(".videocall-chat").draggable(), $(".videocall-container").hide()

        }))

    }), window.existingCall = t, t.on("close", finishCall)

}



function clean_galleria() {

    var t = [];

    Galleria.run(".discover", {

        dataSource: t

    })

}



function pad(t) {

    return t > 9 ? t : "0" + t

}



function profileForms() {

    locInitialize(), $("#add-credits").click(function() {

        $("#payment_module").is(":visible") ? $("#payment_module").hide() : $("#payment_module").show()

    }), $("#update-profile").submit(function(t) {

        t.preventDefault();

        var e = "Error";

        $.ajax({

            data: $(this).serialize(),

            url: request_source() + "/tinelo.php",

            type: "post",

            beforeSend: function() {

                $("#update-error").hide(), $("#update-success").hide(), $("#upd-btn").html("Working..")

            },

            success: function(t) {

                t.indexOf(e) > -1 ? ($("#update-error").html(t), $("#update-error").fadeIn(), $("#upd-btn").html(site_lang[135].text)) : ($("#update-success").html(site_lang[203].text), $("#update-success").fadeIn(), $("#upd-btn").html(site_lang[135].text))

            },

            complete: function() {

                setTimeout(function() {

                    updateSpotlight()

                }, 100)

            }

        })

    }), $("#add-coupon").submit(function(t) {

        t.preventDefault();

        var e = "Error";

        $.ajax({

            data: $(this).serialize(),

            url: request_source() + "/admin.php",

            type: "post",

            beforeSend: function() {},

            success: function(t) {

                t.indexOf(e) > -1 ? swal("Coupon error!", "The coupon dont exist or you already used it", "error") : (swal("Coupon Success", "Coupon added successfully", "success"), setTimeout(function() {

                    window.location.href = site_config.site_url + "settings"

                }, 1500))

            }

        })

    }), $("#change-password").submit(function(t) {

        t.preventDefault();

        var e = "Error";

        $.ajax({

            data: $(this).serialize(),

            url: request_source() + "/tinelo.php",

            type: "post",

            beforeSend: function() {

                $("#change-pwd-btn").html("Working..")

            },

            success: function(t) {

                t.indexOf(e) > -1 ? (alert(t), $("#change-pwd-btn").html(site_lang[130].text)) : (alert("Password successfully changed"), $("#change-pwd-btn").html(site_lang[130].text))

            }

        })

    }), $("#delete-acc").click(function(t) {

        swal({

            title: site_lang[204].text,

            text: site_lang[205].text,

            confirmButtonText: site_lang[206].text,

            type: "warning",

            showCancelButton: !0

        }, function() {

            $.ajax({

                data: {

                    action: "delete_profile"

                },

                url: request_source() + "/tinelo.php",

                type: "post",

                beforeSend: function() {},

                success: function(t) {

                    window.location.href = site_config.site_url

                }

            })

        })

    })

}



function locInitialize() {

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("loc"), {

        types: ["geocode"]

    }), google.maps.event.addListener(autocomplete, "place_changed", function() {

        fillInAddress()

    })

}



function fillInAddress() {

    var t = autocomplete.getPlace();

    for (var e in componentForm) document.getElementById(e).value = "", document.getElementById(e).disabled = !1;

    var o = t.geometry.location.lat(),

        a = t.geometry.location.lng();

    document.getElementById("lat").value = o, document.getElementById("lng").value = a;

    for (var i = 0; i < t.address_components.length; i++) {

        var n = t.address_components[i].types[0];

        if (componentForm[n]) {

            var s = t.address_components[i][componentForm[n]];

            document.getElementById(n).value = s

        }

    }

}



function managePhotos() {

    $("[data-set-profile]").on("click", function(t) {

        t.preventDefault();

        var e = $(this).attr("data-pid");

        $(this).parent(".photo");

        $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "manage",

                pid: e,

                profile: 1,

                block: 0,

                unblock: 0,

                del: 0

            },

            success: function(t) {

                window.location.reload()

            }

        })

    }), $("[data-unblock-photo]").on("click", function(t) {

        t.preventDefault();

        var e = $(this).attr("data-pid");

        $("#pid" + e);

        $("#blockedPhoto" + e).html(""), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "manage",

                pid: e,

                profile: 0,

                block: 0,

                unblock: 1,

                del: 0

            },

            success: function(t) {

                $("#managePhotos").html(t), managePhotos(), profilePhoto()

            }

        })

    }), $("[data-block-photo]").on("click", function(t) {

        t.preventDefault();

        var e = $(this).attr("data-pid");

        $("#blockedPhoto" + e).html('<a class="pt" href="#"><i class="material-icons">lock</i></a>'), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "manage",

                pid: e,

                profile: 0,

                block: 1,

                unblock: 0,

                del: 0

            },

            success: function(t) {

                $("#managePhotos").html(t), managePhotos(), profilePhoto()

            }

        })

    }), $("[data-delete-photo]").on("click", function(t) {

        t.preventDefault();

        var e = $(this).attr("data-pid"),

            o = $("[data-del-photo=" + e + "]");

        o.fadeOut(), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "manage",

                pid: e,

                profile: 0,

                block: 0,

                unblock: 0,

                del: 1

            },

            success: function(t) {}

        })

    })

}



function updateSpotlight() {

    $(".spotlight-photos").mCustomScrollbar("destroy"), $("[data-show]").each(function() {

        $(this).remove()

    }), $.ajax({

        type: "POST",

        url: request_source() + "/tinelo.php",

        data: {

            action: "spotl"

        },

        success: function(t) {

            $(".spotlight-photos").append(t), $(".spotlight-photos").mCustomScrollbar({

                axis: "x",

                theme: "light",

                alwaysShowScrollbar: 2,

                advanced: {

                    autoExpandHorizontalScroll: !0

                }

            }), $("[data-main-background]").css("background", mainColor), profilePhoto();

            var e = 0,

                o = setInterval(function() {

                    e++, 26 == e && clearInterval(o), $("[data-show=" + e + "]").fadeIn()

                }, 100)

        }

    })

}



function privateLinks() {

    $("[data-ask]").click(function() {

        $(".user-details .privates").html("<center>" + twoo_lang[157].text + " " + profile_info.name + "</center>"), $.ajax({

            url: request_source() + "/user.php",

            data: {

                action: "chat_p",

                id: profile_info.id

            },

            type: "post",

            success: function(t) {},

            complete: function() {}

        })

    }), $("[data-buy-p]").click(function() {

        user_info.credits < site_prices["private"] ? $("#creditsModal").modal() : swal({

            title: site_lang[191].text,

            text: site_lang[192].text + " " + profile_info.first_name + " " + site_lang[193].text + " " + site_prices["private"] + " " + site_lang[73].text,

            imageUrl: profile_info.profile_photo,

            showCancelButton: !0,

            confirmButtonColor: "#09c66e",

            confirmButtonText: site_lang[194].text,

            cancelButtonText: site_lang[195].text,

            closeOnConfirm: !0

        }, function() {

            $.ajax({

                url: request_source() + "/user.php",

                data: {

                    action: "p_access",

                    id: profile_info.id

                },

                type: "post",

                success: function(t) {

                    window.location.reload()

                }

            })

        })

    })

}



var as = "";

$(".spotlight-photos").mCustomScrollbar({

    axis: "x",

    theme: "light",

    alwaysShowScrollbar: 2,

    advanced: {

        autoExpandHorizontalScroll: !0

    }

}), $("#userSpotlightModal").mCustomScrollbar({

    axis: "x",

    theme: "light",

    alwaysShowScrollbar: 2,

    advanced: {

        autoExpandHorizontalScroll: !0

    }

}), $(".spotlight-right").click(function() {

    $(".spotlight-photos").mCustomScrollbar("scrollTo", "-=900")

}), $(".spotlight-left").click(function() {

    $(".spotlight-photos").mCustomScrollbar("scrollTo", "+=900")

}), $(".spotlight-left").click(function() {

    $(".spotlight-photos").mCustomScrollbar("scrollTo", "+=900")

}), $("[data-select-spotlight]").click(function() {

    $("[data-select-spotlight]").css("border", "2px solid #fff"), $(this).css("border", "2px solid" + mainColor), ssrc = $(this).attr("data-src"), $("[data-spotlight-me]").css("background-image", "url(" + ssrc + ")"), $("#s_photo").val(ssrc)

}), $(".spotlight-add-me").click(function() {

    $("[data-spotlight-me]").show(), $(".spotlight-add-me").hide(), $(".spotlight-profile-photo").css("opacity", 1), $(".spotlight-profile-photo").css("zIndex", 9999), $("[data-spotlight-me]").css("border", "2px solid" + mainColor), $("#spotlightModal").modal()

}), $(".spotlight-me").click(function() {

    $("[data-spotlight-me]").show(), $(".spotlight-add-me").hide(), $(".spotlight-profile-photo").css("opacity", 1), $(".spotlight-profile-photo").css("zIndex", 9999), $("[data-spotlight-me]").css("border", "2px solid" + mainColor), $("#spotlightModal").modal()

}), $(".first-me").on("click", function(t) {

    t.preventDefault(), user_info.credits < site_prices.first ? $("#creditsModal").modal() : swal({

        title: twoo_lang[75].text,

        text: twoo_lang[13].text + " "+ site_prices.first + " " + twoo_lang[17].text,

        imageUrl: user_info.profile_photo,

        showCancelButton: !0,

        confirmButtonText: twoo_lang[77].text,

        closeOnConfirm: !1

    }, function() {

        user_info.credits = user_info.credits - site_prices.first, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "riseUp",
                price: site_prices.first

            },

            success: function(t) {}

        })

    })

}), $(".boost-me").on("click", function(t) {

    t.preventDefault(), user_info.credits < site_prices.boost ? $("#creditsModal").modal() : swal({

        title: twoo_lang[69].text,

        text: twoo_lang[13].text + " "+ site_prices.boost + " " + twoo_lang[17].text,

        imageUrl: user_info.profile_photo,

        showCancelButton: !0,

        confirmButtonText: twoo_lang[71].text,

        closeOnConfirm: !1

    }, function() {

        user_info.credits = user_info.credits - site_prices.boost, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "riseUp",
                price: site_prices.boost

            },

            success: function(t) {}

        })

    })

}), $(".cien-me").on("click", function(t) {

    t.preventDefault(), user_info.credits < site_prices.discover ? $("#creditsModal").modal() : swal({

        title: twoo_lang[78].text,

        text: twoo_lang[13].text + " "+ site_prices.discover + " " + twoo_lang[17].text,

        imageUrl: user_info.profile_photo,

        showCancelButton: !0,

        confirmButtonText: twoo_lang[80].text,

        closeOnConfirm: !1

    }, function() {

        user_info.credits = user_info.credits - site_prices.discover, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

            type: "POST",

            url: request_source() + "/tinelo.php",

            data: {

                action: "discover100",
                price: site_prices.discover

            },

            success: function(t) {}

        })

    })

}), $("#spotlightModal").on("hidden.bs.modal", function(t) {

    $("[data-spotlight-me]").hide(), $(".spotlight-profile-photo").css("zIndex", 1), $(".spotlight-add-me").show()

}), $("#add-sphoto,#add-sphoto2").on("click", function(t) {

    t.preventDefault(), user_info.credits < site_prices.spotlight ? ($("[data-spotlight-me]").hide(), $(".spotlight-profile-photo").css("zIndex", 1), $(".spotlight-add-me").hide(), $("#creditsModal").modal()) : swal({

        title: "Spotlight",

        text: twoo_lang[13].text + " " + site_prices.spotlight + " " + twoo_lang[17].text,

        imageUrl: ssrc,

        showCancelButton: !0,

        confirmButtonText: twoo_lang[31].text,

        closeOnConfirm: !0

    }, function() {

        $("#add-photo-spotlight").submit()

    })

}), $("#add-photo-spotlight").submit(function(t) {

    t.preventDefault();

    var e = $("#s_photo").val();

    return 0 == e.length ? (alert(site_lang[197].text), !1) : void $.ajax({

        type: "POST",

        url: request_source() + "/tinelo.php",

        data: $(this).serialize(),

        success: function(t) {

            window.location.href = site_config.site_url + "meet"

        }

    })

});

var ua = "m",

    ue = "c",

    meet_age_array = user_info.s_age.split(","),

    meet_age = meet_age_array[0]+','+meet_age_array[1],

    meet_gender = user_info.s_gender,

    meet_radius = user_info.s_radius,

    meet_online = 0,

    meet_limit = 0,

    backspace_alert = 0,

    fa = "tt",

    gui = "/",

    w = "",

    chost = "";

0 === window.location.host.indexOf("www.") && (chost = window.location.host.replace("www.", ""), chost = chost.replace(".", "")), w = chost, ("" == chost || "" == as) && abort(), chat_notification(), chat_unread(), "meet" == url && (profilePhoto(), meetFilter(), meetPagination()), "profile" == url && (profilePhotos(profile_info.id), profileLinks(), game_btns()), "chat" == url && (sidebarChat(), chatMenuBtns(), $("#chat-count").text(0), check_chat_count(), $("[data-premium-chat]").click(function() {

    $("#premiumModal").modal()

}), $("#send-gift").on("click", function(t) {

    if (t.preventDefault(), $(".gifts").is(":visible")) {

        var e = $(".current-chat").height();

        $(".current-chat").css("height", e + 201 + "px"), $(".gifts").hide()

    } else {

        var e = $(".current-chat").height();

        $(".current-chat").css("height", e - 159 + "px"), $(".gifts").css("height", "180px"), $(".gifts").show()

    }

}), $(".send-gift").click(function() {

    $("body").find(".gifts .selected").removeClass("selected"), $(this).addClass("selected");

    var t = $(this).attr("data-src");

    if (gift_price = $(this).attr("data-gprice"), $("#g_src").val(t), $("#g_id").val(profile_info.id), $("#g_price").val(gift_price), gift_price > user_info.credits) {

        var e = $(".current-chat").height();

        $(".current-chat").css("height", e + 201 + "px"), $(".gifts").hide(), $("#creditsModal").modal()

    } else swal({

        title: twoo_lang[152].text + " " + profile_info.first_name,

        text: twoo_lang[13].text + " " + gift_price + " " + twoo_lang[17].text,

        imageUrl: t,

        showCancelButton: !0,

        confirmButtonText: twoo_lang[153].text,

        closeOnConfirm: !0

    }, function() {

        $("#send-gift-form").submit()

    })

}), $("#send-gift-form").submit(function(t) {

    t.preventDefault();

    var e = $("#g_src").val(),

        o = "error";

    return 0 == e.length ? (alert(site_lang[198].text), !1) : void $.ajax({

        type: "POST",

        url: request_source() + "/tinelo.php",

        data: $(this).serialize(),

        success: function(t) {

            if (t.indexOf(o) > -1) alert(site_lang[199].text);

            else {

                var a = $("#g_price").val();

                user_info.credits = user_info.credits - a, $("#creditsAmount").text(user_info.credits);

                var i = $(".current-chat").height();

                $(".current-chat").css("height", i + 201 + "px"), $(".gifts").hide(), $(".current-chat").append('<p class="me" data-message="1" id="me" ><img src="' + e + '" style="max-width:400px;border-radius:5px"></p>');

                var n = document.getElementById("chat-container");

                n.scrollTop = n.scrollHeight

            }

        }

    })

}), $("[data-open-premium-modal]").click(function() {

    $("#premiumModal").modal()

}), $("[data-chat-menu=1]").css("border-bottom", "3px solid" + mainColor), $("[data-chat-menu=1]").css("color", mainColor), $("#send-photo").on("click", function(t) {

    t.preventDefault(), $("#photo-to-send").click()

}), $("#photo-to-send").change(function() {

    $("#sendPhoto").submit()

}), $("#sendPhoto").submit(function() {

    return $(this).ajaxSubmit(sendPhoto), !1

}), wdtEmojiBundle.init("#chat-message"), $(".last-message-left").each(function() {

    var t = $(this).html(),

        e = wdtEmojiBundle.render(t);

    $(this).html(e)

}), videocallBtn()), "profile-me" == url && (profileLinks(), profilePhotos(user_info.id), profilePhotoViewer(), uploadPhotos(), managePhotos()), "settings" == url && (profileForms(), $("input:radio[name=fans]").change(function() {

    var t = $(this).val(),

        e = "fan";

    $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "user_notifications",

            val: t,

            col: e

        },

        type: "post",

        success: function(t) {}

    })

}), $("input:radio[name=near]").change(function() {

    var t = $(this).val(),

        e = "near_me";

    $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "user_notifications",

            val: t,

            col: e

        },

        type: "post",

        success: function(t) {}

    })

}), $("input:radio[name=message]").change(function() {

    var t = $(this).val(),

        e = "message";

    $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "user_notifications",

            val: t,

            col: e

        },

        type: "post",

        success: function(t) {}

    })

}), $("input:radio[name=match_m]").change(function() {

    var t = $(this).val(),

        e = "match_m";

    $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "user_notifications",

            val: t,

            col: e

        },

        type: "post",

        success: function(t) {}

    })

})), "credits" == url && $.ajax({

    url: request_source() + "/tinelo.php",

    data: {

        action: "credits"

    },

    type: "post",

    success: function(t) {

        $("#data-content").html(t), profilePhoto(), siteModals(), window.history.pushState("credits", site_title(), site_config.site_url + "credits"), $("#data-content").css("opacity", "1"), $(".spotlight-me").click(function() {

            $("[data-spotlight-me]").show(), $(".spotlight-add-me").hide(), $(".spotlight-profile-photo").css("opacity", 1), $(".spotlight-profile-photo").css("zIndex", 9999), $("[data-spotlight-me]").css("border", "2px solid" + mainColor), $("#spotlightModal").modal()

        }), $(".first-me").on("click", function(t) {

            t.preventDefault(), user_info.credits < site_prices.first ? $("#creditsModal").modal() : swal({

                title: twoo_lang[75].text,

                text: twoo_lang[13].text + " " + site_prices.first + " " + twoo_lang[17].text,

                imageUrl: user_info.profile_photo,

                showCancelButton: !0,

                confirmButtonText: twoo_lang[77].text,

                closeOnConfirm: !1

            }, function() {

                user_info.credits = user_info.credits - site_prices.first, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

                    type: "POST",

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "riseUp",
                        price: site_prices.first

                    },

                    success: function(t) {}

                })

            })

        }), $(".boost-me").on("click", function(t) {

            t.preventDefault(), user_info.credits < site_prices.boost ? $("#creditsModal").modal() : swal({

                title: twoo_lang[69].text,

                text: twoo_lang[13].text + " " + site_prices.boost + " " + twoo_lang[17].text,

                imageUrl: user_info.profile_photo,

                showCancelButton: !0,

                confirmButtonText: twoo_lang[71].text,

                closeOnConfirm: !1

            }, function() {

                user_info.credits = user_info.credits - site_prices.boost, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

                    type: "POST",

                    url: request_source() + "/tinelo.php",

                    data: {

                        action: "riseUp",
                        price: site_prices.boost

                    },

                    success: function(t) {}

                })

            })

        }), $(".cien-me").on("click", function(t) {

            t.preventDefault(), user_info.credits < site_prices.discover ? $("#creditsModal").modal() : swal({

                title: twoo_lang[78].text,

                text: twoo_lang[13].text + " " + site_prices.discover + " " + twoo_lang[17].text,

                imageUrl: user_info.profile_photo,

                showCancelButton: !0,

                confirmButtonText: twoo_lang[80].text,

                closeOnConfirm: !1

            }, function() {

                user_info.credits = user_info.credits - site_prices.discover, $("#creditsAmount").text(user_info.credits), $(".total-credits").text(user_info.credits + " " + twoo_lang[17].text), swal("Booooosted!", "", "success"), $.ajax({

                    type: "POST",

                    url: request_source() + "/tinelo.php",

                    data: {


                        action: "discover100",
                        price: site_prices.discover

                    },

                    success: function(t) {}

                })

            })

        })

    }

}), "discover" == url && $.ajax({

    url: request_source() + "/tinelo.php",

    data: {

        action: "discover"

    },

    type: "post",

    success: function(t) {

        if ($("#data-content").html(t), window.history.pushState("discover", site_title(), site_config.site_url + "discover"), "" == game_array) {

            var e = 140;

            $("#searching").fadeIn(), $(".discover-tinder").hide(), setTimeout(function() {

                $(".pulse").fadeIn()

            }, 200), setTimeout(function() {

                $(".pulse-photo").fadeIn()

            }, 200), show_pulse = setInterval(function() {

                $(".pulse").width(e).height(e), e++, e > 200 && $(".pulse").css("opacity", $(".pulse").css("opacity") - .001), e > 500 && (e = 50, $(".pulse").width(e).height(e), $(".pulse").css("opacity", "0.3"))

            }, 0), profilePhoto()

        }

        game_start(0), game_btns(), $("#data-content").css("opacity", "1")

    }

}), menuLinks(), siteColor(), check_chat_count(), check_menu_count(), profilePhoto(), siteModals(), $(window).scroll(function() {

    $(window).scrollTop() + 540 > $(".search-result-container").height() && meet_pages >= 0 && ($(".rings").fadeIn("fast"), 0 == bottom && (bottom = !0, $.ajax({

        url: request_source() + "/tinelo.php",

        data: {

            action: "meet_filter",

            age: meet_age,

            gender: meet_gender,

            radius: meet_radius,

            online: meet_online,

            limit: meet_limit

        },

        type: "post",

        success: function(t) {

            $("#meet_section").append(t), scroller(), profilePhoto(), $("#end-of-result").length || $(".rings").fadeOut("fast"), show = 0;

            var e = setInterval(function() {

                show++, 24 == show && clearInterval(e), $("[data-search-show=" + show + "]").css("opacity", "1")

            }, 100);

            bottom = !1

        }

    })))

}), peerConnect(0), setInterval(function() {

    in_videocall === !1 && peerConnect(1)

}, 5e4), $("#end-call").click(function() {

    window.existingCall.close(), window.location.reload()

}), $(".videocall-chat").dblclick(function() {

    $(".videocall-chat").hide(), $(".videocall-container").fadeIn()

}), $("#their-video").dblclick(function() {

    $(".videocall-chat").fadeIn(), $(".videocall-chat").draggable(), $(".videocall-container").hide()

});

var de = window.location.host;

$("[data-payment]").click(function() {

    payment_method = $(this).attr("data-payment")

}), $("[data-premium-send]").on("click", function(t) {

    t.preventDefault();

    var e = $("#selectPremium").find(":selected").attr("data-price"),

        o = $("#selectPremium").find(":selected").attr("data-quantity");

    $("#payment-custom3").val(user_info.id + "," + o), $("#payment-amount3").val(e), $("#payment-name3").val(site_config.name + " - " + o + " " + twoo_lang[156].text), $("#buy-premium").submit()

}), $("#buyCreditsBtn2").click(function() {

    var t = $("#selectCredits").find(":selected").attr("data-price"),

        e = $("#selectCredits").find(":selected").attr("data-quantity");

    if ($("#payment-custom").val(user_info.id + "," + e), $("#payment-custom2").val(user_info.id + "," + e), $("#payment-amount,#payment-amount2").val(t), $("#payment-name,#payment-name2").val(site_config.name + " " + e + " " + site_lang[73].text), 0 == payment_method) return swal({

        title: site_lang[333].text,

        text: site_lang[196].text,

        type: "error"

    }, function() {}), !1;

    if (1 == payment_method && $("#method01").submit(), 2 == payment_method && $("#method02").submit(), 4 == payment_method) {

        var o = site_config.name + " " + e + " " + site_lang[73].text,

            a = "amount=" + e + "callback_url=" + site_config.site_url + "credits-okcredit_name=" + o + "cuid=" + user_info.id + "currency=" + site_config.currency + "display_type=userprice=" + t + "v=web";

        $.ajax({

            type: "POST",

            url: request_source() + "/user.php",

            data: {

                action: "fortumo",

                encode: a

            },

            success: function(a) {

                var i = a,

                    n = encodeURI(site_config.site_url + "credits-ok");

                o = encodeURI(o);

                var s = "http://pay.fortumo.com/mobile_payments/" + site_config.fortumo + "?amount=" + e + "&callback_url=" + n + "&credit_name=" + o + "&cuid=" + user_info.id + "&currency=" + site_config.currency + "&display_type=user&price=" + t + "&v=web&sig=" + i;

                window.location.href = s

            }

        })

    }

    if (3 == payment_method) {

        t = 100 * t;

        var i = 1,

            n = StripeCheckout.configure({

                key: site_config.stripe,

                image: site_config.logo,

                locale: "auto",

                token: function(o) {

                    $.ajax({

                        url: request_source() + "/stripe.php",

                        data: {

                            token: o.id,

                            price: t,

                            app: i,

                            quantity: e,

                            uid: user_info.id,

                            de: site_config.name + " " + e + " " + site_lang[73].text

                        },

                        type: "post",

                        success: function(t) {},

                        complete: function() {

                            1 == i && (window.location.href = site_url() + "credits-ok")

                        }

                    })

                }

            });

        n.open({

            name: site_config.name,

            description: site_config.name + " " + e + " " + site_lang[73].text,

            amount: t

        }), $(window).on("popstate", function() {

            n.close()

        })

    }

});



function dailyChat(){

swal({   

     title: site_lang[200]['text'],  

     text: site_prices.chat+ " credits",   

     type: "success",  

     showCancelButton: true,   

     confirmButtonText: 'Buy',

     confirmButtonColor: '#FF9000',  

     closeOnConfirm: true

     }, function(){

        if(site_prices.chat > user_info.credits){

           $("#creditsModal").modal();

        } else {

            $.ajax({ 

                type: "POST",

                url: request_source() + "/tinelo.php",

                data: {

                    action : "chat_limit"   

                },

                success: function(response){

                    goToChat(profile_info.id);

                }

            }); 

        }

    });     

}





function mapInit() {

    var address = "350 Fifth Avenue, New York, NY 10118", lat, long;

    $.ajax({

      url:"https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",

      type: "POST",

      success:function(res){

         lat = res.results[0].geometry.location.lat;

         long = res.results[0].geometry.location.lng;

    var mapOptions = {

        zoom: 11,

        scrollwheel: false,

        center: new google.maps.LatLng(lat, long), // New York



        styles: [{"stylers":[{"hue":"#16a085"}]},{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#ff3329"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}]

    };



    // Get the HTML DOM element that will contain your map 

    // We are using a div with id="map" seen below in the <body>

    var mapElement = document.getElementById('map');



    // Create the Google Map using our element and options defined above

    var map = new google.maps.Map(mapElement, mapOptions);



    // Let's also add a marker while we're at it

    var image = window.logo;

    var marker = new google.maps.Marker({

        position: new google.maps.LatLng(lat, long),

        map: map,title: 'Around here.',

        icon: {

          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,

          scale: 6,

          strokeColor: '#e7e5e7'

        },

animation: google.maps.Animation.DROP



    });

      }

    });

}