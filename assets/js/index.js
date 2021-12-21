let layer, laytpl,flow;
let pageIndex = 1;
let pageSize = 6;
layui.use([ 'layer', 'laytpl','flow'], function () {
    layer = layui.layer;
    laytpl = layui.laytpl;
    flow = layui.flow;
    initThemeList();
    initPluginList();
});

function initThemeList() {
    let loadIndex = layer.load(1);
    let param = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        form: {
            type: 'theme'
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
                laytpl($("#themeTpl").html()).render(d.data, function (html) {
                    $("#themeList").html(html);
                });
                flow.lazyimg({
                    elem: '.p-c3 img'
                });
            } else {
                layer.msg("加载最新主题失败", {icon: 2});
            }
        },
        error: function (data) {
            layer.close(loadIndex);
            layer.msg("加载最新主题失败", {icon: 2});
        }
    });
}

function initPluginList() {
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
                    elem: '.p-c4 img'
                });
            } else {
                layer.msg("加载最新插件失败", {icon: 2});
            }
        },
        error: function (data) {
            layer.close(loadIndex);
            layer.msg("加载最新插件失败", {icon: 2});
        }
    });
}