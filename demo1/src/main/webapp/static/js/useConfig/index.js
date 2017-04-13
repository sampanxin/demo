$(function () {
    loadDataPlugins();
    loadDataCallbackUrls();
    loadDataIps();
    loadDataPro();

    $("#loadConfig").bind("click", function () {
        loadMap();
    })


    $("#addPluginModal").bind("click", function () {
        $('#pluginForm')[0].reset();
        $("#plugin").val("");
        $("#pluginType").val("");
        $("#path").val("");
        $("#addPlugin").attr("disabled", "disabled");
        $("#myModal .has-error").removeClass("has-error");
        $("#myModal .has-success").removeClass("has-success");
        $("#infoAlert").hide();
        $("#myModal").modal("show");
    })


    //添加插件配置
    $("#addPlugin").bind("click", function () {
        var orgName = $("#orgName").val();
        var formatType = $("#formatType").val();
        var alias = $("#alias").val();

        var orgName_div = $("#orgName").parent();
        var formatType_div = $("#formatType").parent();
        var alias_div = $("#alias").parent();

        if (orgName != '') {
            orgName_div.removeClass("has-error");
            orgName_div.addClass(" has-success");
        } else {
            orgName_div.removeClass("has-success");
            orgName_div.addClass("has-error");
        }

        if (formatType != '') {
            formatType_div.removeClass("has-error");
            formatType_div.addClass(" has-success");
        } else {
            formatType_div.removeClass("has-success");
            formatType_div.addClass("has-error");
        }
        if (alias != '') {
            alias_div.removeClass("has-error");
            alias_div.addClass(" has-success");
        } else {
            alias_div.removeClass("has-success");
            alias_div.addClass("has-error");
        }

        if (formatType != '' && orgName != '' && alias != '') {
            $.ajax({
                type: 'POST',
                url: "rest/config/addPlugin",
                data: $('#pluginForm').serialize(),
                dataType: "json",
                success: function (data) {
                    if (data.code == "200") {
                        $('#myModal').modal('hide');
                        loadDataPlugins();
                        //loadMap();
                    } else {
                        $("#infoError").html(data.errorMsg);
                        $("#infoAlert").show();
                    }
                }
            });
        }
    })
});


function loadDataPlugins() {
    $("#j_table tbody").html("");
    $.ajax({
        type: 'POST',
        url: "rest/config/plugins",
        dataType: "json",
        success: function (data) {
            var pName = $("#pName").val();
            var array = jQuery.parseJSON(data);
            $.each(array, function (i, obj) {
                if (pName != '') {
                    if (obj.orgName.indexOf(pName) == -1) {
                        obj = null;
                    }
                }
                if (obj != null) {
                    var type = "";
                    if (obj.pluginType) {
                        if (obj.pluginType == 1) {
                            type = "插件";
                        } else if (obj.pluginType == 2) {
                            type = "配置";
                        }
                    }
                    var tr = $("<tr/>");
                    $("<td>" + (i + 1) + "</td>").appendTo(tr);
                    $("<td>" + (obj.plugin ? obj.plugin : "") + "</td>").appendTo(tr);
                    $("<td>" + (obj.alias ? obj.alias : "") + "</td>").appendTo(tr);
                    $("<td>" + type + "</td>").appendTo(tr);
                    $("<td>" + (obj.formatType ? obj.formatType : "") + "</td>").appendTo(tr);
                    $("<td>" + (obj.way ? obj.way : "") + "</td>").appendTo(tr);
                    $("<td>" + (obj.orgName ? obj.orgName : "") + "</td>").appendTo(tr);
                    $("<td>" + obj.uploadDate + "</td>").appendTo(tr);
                    $("<td>" + obj.path + "</td>").appendTo(tr);
                    $("<td>" + (obj.updateDate ? obj.updateDate : "") + "</td>").appendTo(tr);
                    if (obj.pluginType == 2) {
                        $("<td><a href='javascript:' onclick=\"cfg_modalShow('" + obj.plugin + "')\">查看配置</a></td>").appendTo(tr);
                    } else {
                        $("<td></td>").appendTo(tr);
                    }
                    $("#j_table tbody").append(tr);
                }
            })
        }
    });
}


function loadDataCallbackUrls() {
    $("#j_table2 tbody").html("");
    $.ajax({
        type: 'POST',
        url: "rest/config/callbackUrls",
        //  data: data,
        dataType: "json",
        success: function (data) {
            var array = jQuery.parseJSON(data);
            $.each(array, function (i, obj) {
                var tr = $("<tr/>");
                var td1 = $("<td>" + (i + 1) + "</td>").appendTo(tr);
                var td2 = $("<td>" + obj.appCode + "</td>").appendTo(tr);
                var td3 = $("<td>" + obj.url + "</td>").appendTo(tr);
                var td3 = $("<td>" + obj.desc + "</td>").appendTo(tr);
                $("#j_table2 tbody").append(tr);
            })
        }
    });

}


function loadDataIps() {
    $("#j_table3 tbody").html("");
    $.ajax({
        type: 'POST',
        url: "rest/config/ipConfigs",
        //  data: data,
        dataType: "json",
        success: function (data) {
            var array = jQuery.parseJSON(data);
            $.each(array, function (i, obj) {
                var tr = $("<tr/>");
                var td1 = $("<td>" + (i + 1) + "</td>").appendTo(tr);
                var td2 = $("<td>" + obj.ip + "</td>").appendTo(tr);
                var td3 = $("<td>" + obj.desc + "</td>").appendTo(tr);
                $("#j_table3 tbody").append(tr);
            })
        }
    });

}


/**
 * 加载 系统配置
 */
function loadMap() {
    $.ajax({
        type: 'POST',
        url: "rest/config",
        // data: {"plugin": plugin, "orgName": orgName, "desc": plugin_desc},
        dataType: "json",
        success: function (data) {
            var ss1 = JSON.stringify(data.plginConfig);
            ss1 = formatJson(ss1)
            var ss2 = JSON.stringify(data.callbackConfig);
            ss2 = formatJson(ss2)
            var ss3 = JSON.stringify(data.ipConfig);
            ss3 = formatJson(ss3)
            $("#pluginInfos").html(ss1);
            $("#backUrlInfos").html(ss2);
            $("#ipInfos").html(ss3);
        }
    });
}


function loadDataPro() {
    $("#j_table4 tbody").html("");
    $.ajax({
        type: 'POST',
        url: "rest/config/properties",
        //  data: data,
        dataType: "json",
        success: function (data) {
            var array = jQuery.parseJSON(data);
            $.each(array, function (i, obj) {
                var tr = $("<tr/>");
                var td1 = $("<td>" + (i + 1) + "</td>").appendTo(tr);
                var td2 = $("<td>" + obj.name + "</td>").appendTo(tr);
                var td3 = $("<td>" + obj.value + "</td>").appendTo(tr);
                var td4 = $("<td>" + obj.desc + "</td>").appendTo(tr);
                $("#j_table4 tbody").append(tr);
            })
        }
    });

}


function cfg_modalShow(plugin) {
    $.ajax({
        type: 'get',
        url: "rest/config/plugin/" + plugin,
        data: {"pluginName": plugin},
        dataType: "text",
        success: function (data) {
            $("#title").html("模版编号【" + plugin + "】配置内容如下")
            $("#cfgInfo").val(data);
            $("#cfg_modal").modal("show");
        }
    })
}


function formatCfgInfo() {
    var data = $("#cfgInfo").val();
    var jsonObj = '';
    try {
        jsonObj = JSON.parse(data);
    } catch (e) {
        // 如果JSON不合法，就抛出异常
        alert("JSON不合法！");
        return false;
    }
    var jsonStr = JSON.stringify(jsonObj, false, 4);
    $("#cfgInfo").val(jsonStr);
}


function formatJson(json) {

    var jsonObj = '';
    try {
        jsonObj = JSON.parse(json);
    } catch (e) {
        // 如果JSON不合法，就抛出异常
        alert("JSON不合法！");
        return false;
    }
    var jsonStr = JSON.stringify(jsonObj, false, 4);
    return jsonStr;
}