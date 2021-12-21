let layer,form,notice,laypage,laytpl,flow;
let pageIndex = 1;
let pageSize = 5;
layui.config({
    base: '/static/public/libs/layuiComponents/'
}).extend({
    notice: 'notice/notice'
})
layui.use(['layer','form','notice','flow','laypage', 'laytpl'], function() {
    layer = layui.layer;
    form = layui.form;
    notice= layui.notice;
    laypage = layui.laypage;
    laytpl = layui.laytpl;
    flow = layui.flow;

    initCommentList();
    notice.options = {
        closeButton: true,
        debug: false,
        positionClass: "toast-top-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "2000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        iconClass: 'toast-info',
        onclick: null,
    };

    form.on('submit(commentForm)', function(data){
        $.ajax({
            type: "POST",
            url: "/comment/submitComment" ,
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (result) {
                if (result.code === 200) {
                    $("#content").val('');
                    if ($("#pid").val() !== '') {
                        $(".p-comment-list-container").before($("#p-comment"));
                        $("#pid").val('');
                        $("#topPid").val('');
                    }
                    initCommentList()
                    notice.success("评论成功");
                } else if (result.code === 201) {
                    notice.success("评论成功,正在等待管理员审核");
                } else if (result.code === -1) {
                    notice.error("该文章已关闭评论功能");
                }else if (result.code === -2) {
                    notice.error("请填写名称");
                }else if (result.code === -3) {
                    notice.error("请填写邮箱");
                }else if (result.code === -4) {
                    notice.error("评论过于频繁,请稍候再试");
                } else {
                    notice.error(result.msg);
                }
            },
            error : function() {
                notice.error("网络异常,评论失败");
            }
        });
        return false;
    });
});

$(".p-comment-list-container").on('click','.p-c-l-reply-btn',function(){
    if ($(this).text() === "取消回复") {
        $(".p-comment-list-container").before($("#p-comment"));
        $("#pid").val('');
        $("#topPid").val('');
        $(this).text("回复");
    } else {
        $(this).parent().parent().parent().append($("#p-comment"));
        $("#pid").val($(this).attr('data-pid'));
        $("#topPid").val($(this).attr('data-topPid'));
        $("#content").focus();
        $(this).text("取消回复");
    }
});

function initCommentList(){
    let loadIndex = layer.load(1);
    $.post("/api/comment/getCommentByArticleId",{
            articleId: $("#articleId").val(),
            pageSize: pageSize,
            pageIndex: pageIndex
    },function(result){
        layer.close(loadIndex);
        laytpl($("#commentTpl").html()).render(result.data, function (html) {
            $("#p-comment-list").html(html);
        });
        if (result.total <= 0) {
            return;
        }
        laypage.render({
            elem: 'commentPager',
            count: result.total,
            curr: pageIndex,
            limit: pageSize,
            prev: '<',
            next: '>',
            jump: function(obj, first){
                pageIndex = obj.curr;
                if(!first){
                    initCommentList();
                }
            }
        });
    });
}