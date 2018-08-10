define(["jquery", "handle"], function($, handle) {
    return function render(source, wrap, data, isHtml) {
        var tel = $(source).html();
        var template = handle.compile(tel);
        var html = template(data);
        if (isHtml) {
            $(wrap).html(html)
        } else {
            $(wrap).append(html)
        }


    }
})