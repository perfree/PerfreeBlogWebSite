let layer, laytpl,flow,laypage;
let pageIndex = 1;
let pageSize = 12;
layui.use([ 'layer', 'laytpl','flow','laypage'], function () {
    layer = layui.layer;
    laytpl = layui.laytpl;
    flow = layui.flow;
    laypage = layui.laypage;
    initThemeList();
});

function initThemeList() {
    let loadIndex = layer.load(1);
    let param = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        form: {
            type: 'plugin'
        }
    };
    $.ajax({
        type: "POST",
        url: "/website/article/list",
        contentType: 'application/json',
        data: JSON.stringify(param),
        success: function (d) {
            layer.close(loadIndex);
            if (d.code === 200) {
                laytpl($("#pluginTpl").html()).render(d.data, function (html) {
                    $("#pluginList").html(html);
                });
                flow.lazyimg({
                    elem: '#pluginList img'
                });
                if (d.total <= 0) {
                    return;
                }
                laypage.render({
                    elem: 'pager',
                    count: d.total,
                    curr: pageIndex,
                    limit: pageSize,
                    prev: '<',
                    next: '>',
                    jump: function(obj, first){
                        pageIndex = obj.curr;
                        if(!first){
                            initThemeList();
                        }
                    }
                });
            } else {
                layer.msg("加载插件列表失败", {icon: 2});
            }
        },
        error: function (data) {
            layer.close(loadIndex);
            layer.msg("加载插件列表失败", {icon: 2});
        }
    });
}