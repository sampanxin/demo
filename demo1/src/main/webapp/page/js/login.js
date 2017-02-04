Ext.require(['*']);
Ext.onReady(function () {

// var showFrom = function () {
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
        items: [
        //     {
        //     xtype: 'filefield',
        //     name: 'photo-path',
        //     //afterLabelTextTpl:  '<span style="color:red;font-weight:bold" data-qtip="必需填写">*</span>',
        //     fieldLabel: '上传插件',
        //     //   msgTarget: 'title', //  提示 文字的位置 \title\under\none\side\[element id]
        //     allowBlank: false,
        //     anchor: '100%',
        //     buttonText: '选择文件',
        //     emptyText: '选择一个插件或配置'
        //
        // },
        //     {
        //     fieldLabel: '申请方公司',
        //     name: 'orgName',
        //     allowBlank: false
        // },
            {
            fieldLabel: '用户名',
            name: 'loginName',
            allowBlank: false
        }, {
            fieldLabel: '密码',
            name: 'pwd',
                inputType:"password",

                allowBlank: false
        }
        ],

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
                        url: '../rest/demo/login',
                        waitMsg: 'Uploading your photo...',
                        success: function (form, action) {
                            Ext.Msg.alert('提示', "保存成功");
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
        title: '登录',
        height: 150,
        width: 300,
        modal: true,
        layout: 'form',
        items: [form]
    }).show();

// }


    Ext.Ajax.request( {
        url: '../rest/demo/getLogin',
        method : 'get',
        success : function(response, options) {
            var o=Ext.decode(response.responseText)
            // alert(o.status)
        },
        failure : function(response, options) {
            alert(2)
        }
    });



})