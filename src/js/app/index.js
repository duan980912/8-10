require(["jquery", "bscroll", "handle", "swiper", "rander"], function($, bscroll, handle, swiper, rander) {
    var myscroll = new bscroll("section");
    $.ajax({
        url: "/api/swiper",
        dataType: "json",
        success: function(res) {
            if (res.code === 0) {
                rander("#tpl", "#top", res.msg);
                rander("#swiper", "#bottom", res.msg);
                var myswiper = new swiper('.top', {
                    slidesPerView: 5,
                    spaceBetween: 30,
                });
                var myswiper = new swiper('.bottom', {
                    slidesPerView: 4,
                    spaceBetween: 30,
                });
            }
        },
        error: function(error) {
            console.warn(error)
        }
    });
    $.ajax({
        url: "/api/list",
        dataType: "json",
        success: function(res) {
            if (res.code === 0) {
                console.log(res)
                rander("#list", ".imgBox", res.msg);
                myscroll.refresh()
            }
        },
        error: function(error) {
            console.warn(error)
        }
    })


})