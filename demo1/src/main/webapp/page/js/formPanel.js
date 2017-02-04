Ext.create('Ext.form.Panel', {
    title: 'Simple Form',
    bodyPadding: 5,
    width: 350,

    // 将会通过 AJAX 请求提交到此URL
    url: '../rest/test/updateUser',

    // 表单域 Fields 将被竖直排列, 占满整个宽度
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        fieldLabel: 'name',
        name: 'name',
        allowBlank: false
    }, {
        fieldLabel: 'email',
        name: 'email',
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
                    success: function (form, action) {
                        Ext.Msg.alert('保存成功', action.result.msg);
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert('操作失败', action.result.msg);
                    }
                });
            }
        }
    }],
    renderTo: 'formPanel1'
});



Ext.create('Ext.form.Panel', {
    title: 'Simple Form',
    bodyPadding: 5,
    //width: 350,

    // 将会通过 AJAX 请求提交到此URL
    url: '../rest/test/updateUser',

    // 表单域 Fields 将被竖直排列, 占满整个宽度
    layout: 'hbox',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',

    items: [{
        labelAlign:'right',
        fieldLabel: 'name',
        //labelAlign:'right',
        name: 'name',
        allowBlank: false
    }, {
        labelAlign:'right',
        fieldLabel: 'email',
        name: 'email',
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
                    success: function (form, action) {
                        Ext.Msg.alert('保存成功', action.result.msg);
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert('操作失败', action.result.msg);
                    }
                });
            }
        }
    }],
    renderTo: 'formPanel2'
});