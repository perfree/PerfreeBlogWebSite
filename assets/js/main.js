let path = location.pathname;
if (path.indexOf("/theme/") === 0){
    path = "/theme";
}
if (path.indexOf("/plugin/") === 0){
    path = "/plugin";
}
if (path.indexOf("/article/") === 0){
    path = "/blog";
}
$(".p-header .p-nav a").each(function (i,e){
    if (path === $(e).attr("href")) {
        $(e).parent("li").addClass("layui-this");
    }
})

let isShow = false;
$(".p-header").on('click','.nav-bar-btn',function(){
    if (isShow) {
        $(".p-nav").removeClass("mini-nav-show");
        isShow = false;
    } else {
        $(".p-nav").addClass("mini-nav-show");
        isShow = true;
    }
});