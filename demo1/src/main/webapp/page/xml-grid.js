//1.定义Model
Ext.define("MyApp.model.User", {
    extend: "Ext.data.Model",
    fields: [
        {name: 'plugin', type: 'string'},
        {name: 'alias', type: 'string'},
        {name: 'pluginType', type: 'string'},
        {name: 'formatType', type: 'string'},
        {name: 'way', type: 'string'},
        {name: 'orgName', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'updateDate', type: 'string'},
        {name: 'uploadDate', type: 'string'}
    ]
});


Ext.define("MyApp.model.configInfo", {
    extend: "Ext.data.Model",
    fields: [
        {name: 'pluginid', type: 'string'},
        {name: 'filetype', type: 'string'},
        {name: 'filefilter', type: 'string'},
        {name: 'method', type: 'string'},
        {name: 'config', type: 'string'}
    ]
});



//2.创建store
var store = Ext.create("Ext.data.Store", {
    model: "MyApp.model.User",
    autoLoad: true,
    pageSize: 5,
    proxy: {
        type: "ajax",
        url: "../rest/config/plugins",
        reader: {
            root: "rows"
        }
    }
});

var propertyStore = Ext.create("Ext.data.Store", {
    model: "MyApp.model.configInfo",
    //autoLoad: true,
    //pageSize: 5,
    proxy: {
        type: "ajax",
        url: '../rest/config/plugin/nbhj_e111129',
        reader: {
            type: 'json',
            root: 'Data'
        }
    }
});




var toolbar = Ext.create('Ext.toolbar.Toolbar', {
    renderTo: "example-Toolbar",
    items: [
        {
            xtype: 'textfield',
            name: 'field1',
            emptyText: '输入搜索词'
        },
        {
            xtype: 'splitbutton',
            text: '搜索',
            handler: function () {
                var text = prompt('请为你的按钮输入文字:');
            }
        },
        {
            xtype: 'splitbutton',
            text: '上传插件',
            handler: function () {
                showFrom();
            }
        }, '->',

    ]
});


//3.创建grid
var grid = Ext.create("Ext.grid.Panel", {
    xtype: "grid",
    store: store,
    //width: 500,
    //height: 200,
    //margin: 5,

    loadMask: true,
    columnLines: true,
    renderTo: 'example-grid',
    selModel: {
        injectCheckbox: 0,
        mode: "SINGLE"//,     //"SINGLE"/"SIMPLE"/"MULTI"
        //checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    columns: [
        {xtype: "rownumberer", text: "序号", width: 30},
        {text: '模板编号', dataIndex: 'plugin'},
        {text: '模板别名', dataIndex: 'alias'},
        {text: '类型', dataIndex: 'pluginType'},
        {text: '托书格式', dataIndex: 'formatType'},
        {text: '解析方式', dataIndex: 'way'},
        {text: '申请公司', dataIndex: 'orgName'},
        {text: '上传时间', dataIndex: 'uploadDate'},
        {text: '路径', dataIndex: 'path'},
        {text: '更新时间', dataIndex: 'updateDate'}
    ],
    listeners: {
        itemdblclick: function (me, record, item, index, e, eOpts) {
            //双击事件的操作
            //alert(2)
            //propertyStore.load();
            //propertyGrid.setSource(propertyStore.getAt(0).data);
            var pluginName=record.data.plugin;
            var pluginType=record.data.pluginType;
            if(pluginType==2){
                Ext.Ajax.request( {
                    url: '../rest/config/plugin/'+pluginName,
                    method : 'get',
                    success : function(response, options) {
                        var o=Ext.decode(response.responseText)
                        //var o = Ext.util.JSON.decode(response.responseText);
                        //alert(o.msg);
                        o.config=Ext.encode(o.config);
                        propertyGrid.setSource(o);
                    },
                    failure : function() {
                    }
                });
            }else{
                propertyGrid.setSource({});
            }



        }
    },
    bbar: {xtype: "pagingtoolbar", store: store, displayInfo: true}
});


var showFrom = function () {
    var form = Ext.create('Ext.form.Panel', {
        bodyPadding: 5,
        // 将会通过 AJAX 请求提交到此URL
        // 表单域 Fields 将被竖直排列, 占满整个宽度
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        // The fields
        defaultType: 'textfield',
        items: [{
            xtype: 'filefield',
            name: 'photo-path',
            //afterLabelTextTpl:  '<span style="color:red;font-weight:bold" data-qtip="必需填写">*</span>',
            fieldLabel: '上传插件',
            //   msgTarget: 'title', //  提示 文字的位置 \title\under\none\side\[element id]
            allowBlank: false,
            anchor: '100%',
            buttonText: '选择文件',
            emptyText: '选择一个插件或配置'

        }, {
            fieldLabel: '申请方公司',
            name: 'orgName',
            allowBlank: false
        }, {
            fieldLabel: '托书格式',
            name: 'formatType',
            allowBlank: false
        }, {
            fieldLabel: '模版别名',
            name: 'alias',
            allowBlank: false
        }],

        // 重置 和 保存 按钮.
        buttons: [{
            text: '重置',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }, {
            text: '保存',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        url: '../rest/config/addPluginConfig',
                        waitMsg: 'Uploading your photo...',
                        success: function (form, action) {
                            if (action.result.code == "200") {
                                Ext.Msg.alert('保存成功', "保存成功");
                            } else {
                                Ext.Msg.alert('操作失败', action.result.errorMsg);
                            }
                        },
                        failure: function (form, action) {
                            //Ext.Msg.alert('操作失败', action.result.msg);
                        }
                    });
                }
            }
        }]
    });


    Ext.create('Ext.window.Window', {
        title: '上传插件',
        height: 200,
        width: 400,
        modal: true,
        layout: 'form',
        items: [form]
    }).show();

}


var propertyGrid=Ext.create('Ext.grid.PropertyGrid', {
    title: 'Property Grid',
    //closable: true,
    source:{},
    listeners: { beforeedit: function () { return false } }
});





Ext.create('Ext.Panel', {
    border: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        flex: 3, border: false,

        items: [grid]
    }, {
        flex: 1,
        xtype: 'tabpanel',
        border: false,
        //animCollapse: true,
        //collapsible: true,
        //split: true,
        width: 225, // give east and west regions a width
        minSize: 175,
        maxSize: 400,
        activeTab: 1,
        tabPosition: 'bottom',
        items: [{
            html: '<p>A TabPanel component can be a region.</p>',
            title: 'A Tab',
            autoScroll: true
        }, propertyGrid]
    }],
    renderTo: "example-grid2"
});