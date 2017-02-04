Ext.onReady(function () {

    var form = Ext.create('Ext.form.Panel', {
        title: '编辑学生信息',
        renderTo: 'formDiv',
        frame: true,
        width: 500,
        autoHeight: true,
        labelAlign: 'right',
        labelWidth: 20,
        defaultType: 'textfield',
        defaults: {
            width: 250,
            allowBlank: false
        },
        items: [{
            xtype: 'hidden',
            name: 'id'
        }, {
            fieldLabel: '学号',
            name: 'code'
        }, {
            fieldLabel: '姓名',
            name: 'name'
        }, {
            fieldLabel: '年龄',
            name: 'age',
            xtype: 'numberfield',
            allowNegative: false
        }, {
            xtype: 'datefield',
            //anchor: '100%',
            fieldLabel: '出生日期',
            name: 'from_date',
            maxValue: new Date(),
            width: 250,
            format: 'Y-m-d',
            altFormats: 'Y.m.d'
            //,value: '2.4.1978'
        },{
            xtype: 'timefield',
            //anchor: '100%',
            name: 'in',
            fieldLabel: 'Time In',
            minValue: '6:00 AM',
            maxValue: '8:00 PM',
            increment: 30

        }, {
            fieldLabel: '性别',
            name: 'sexText',
            hiddenName: 'sex',
            xtype: 'combo',
            store: new Ext.data.SimpleStore({
                fields: ['value', 'text'],
                data: [['1', '男'], ['0', '女']]
            }),
            emptyText: '请选择',
            mode: 'local',
            triggerAction: 'all',
            valueField: 'value',
            displayField: 'text'//,
            //readOnly: true
        }, {
            fieldLabel: '政治面貌',
            name: 'political',
            xtype: 'combo',
            store: new Ext.data.SimpleStore({
                fields: ['text'],
                data: [['群众'], ['党员'], ['团员']]
            }),
            emptyText: '请选择',
            mode: 'local',
            triggerAction: 'all',
            valueField: 'text',
            displayField: 'text'//,
            // readOnly: true
        }, {
            fieldLabel: '籍贯',
            name: 'origin'
        }, {
            fieldLabel: '所属系',
            name: 'professional'
        }, {
            xtype      : 'fieldcontainer',
            fieldLabel : '衣服Size',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'M',
                    name      : 'size',
                    inputValue: 'm',
                    id        : 'radio1'
                }, {
                    boxLabel  : 'L',
                    name      : 'size',
                    inputValue: 'l',
                    id        : 'radio2'
                }, {
                    boxLabel  : 'XL',
                    name      : 'size',
                    inputValue: 'xl',
                    id        : 'radio3'
                }
            ]
        },{
            xtype: 'fieldcontainer',
            fieldLabel: '爱好',
            defaultType: 'checkboxfield',
            items: [
                {
                    boxLabel: 'Anchovies',
                    name: 'topping',
                    inputValue: '1',
                    id: 'checkbox1'
                }, {
                    boxLabel: 'Artichoke Hearts',
                    name: 'topping',
                    inputValue: '2',
                    checked: true,
                    id: 'checkbox2'
                }, {
                    boxLabel: 'Bacon',
                    name: 'topping',
                    inputValue: '3',
                    id: 'checkbox3'
                }
            ]
        }, {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: '联系信息',
            collapsible: true,
            defaultType: 'textfield',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items:[{
                fieldLabel: '备注',
                name: 'node',
                xtype: 'textareafield',
                grow: true,
                growMax: 10,
                anchor: '100%'
            }]

        }],
        buttons: [{
            text: '添加',
            handler: function () {
                if (!form.getForm().isValid()) {
                    //调用form.getForm().isValid()进行数据校验。如果返回false，
                    //说明表单中某些输入组件中的数据还无法通过校验，不应该提交这些错误格式的数据，
                    //这时我们应该直接跳出函数，中止提交操作
                    return;
                }
                if (form.getForm().findField("id").getValue() == "") {
                    // 添加
                    form.getForm().submit({
                        //这里的form表示我们前面创建的Ext.form.FormPanel，
                        //它的getForm()函数返回Form- Panel内部对应的Ext.form.BasicForm。
                        //现在我们调用BasicForm的submit()函数，将内部items中输入组件的值提交给后台的jsp/save.jsp
                        url: 'save.jsp',
                        success: function (f, action) {
                            //果后台没有出现异常，而且返回的JSON信息中包含{success:true}，那么就会执行success参数对应的处理函数
                            if (action.result.success) {
                                ////创建一个Ext.Msg.alert()显示响应的JSON信息中的msg部分的内容。在用户关闭alert提示框之后,执行方法
                                Ext.Msg.alert('消息', action.result.msg, function () {
                                    grid.getStore().reload();//调用grid.getStore().reload()刷新Grid中的数据
                                    form.getForm().reset();//form.getForm().reset()清空上次提交的数据
                                    form.buttons[0].setText('添加');
                                });
                            }
                        },
                        failure: function () {
                            //如果后台出现400或500错误，就会触发failure参数对应的处理函数。
                            //这里只是弹出一个alert提示框告诉用户“添加失败”，等待用户对刚才提交失败的信息进行修改或做其他处理
                            Ext.Msg.alert('错误', "添加失败");
                        }
                    });
                } else {
                    // 修改
                    form.getForm().submit({
                        url: 'save.jsp',
                        success: function (f, action) {
                            if (action.result.success) {
                                Ext.Msg.alert('消息', action.result.msg, function () {
                                    grid.getStore().reload();
                                    form.getForm().reset();
                                    form.buttons[0].setText('添加');
                                });
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('错误', "修改失败");
                        }
                    });
                }
            }
        }, {
            text: '清空',
            handler: function () {
                form.getForm().reset();
                form.buttons[0].setText("添加");
            }
        }, {
            text: '删除',
            handler: function () {
                var id = form.getForm().findField("id").getValue();
                if (id == '') {
                    Ext.Msg.alert('提示', '请选择需要删除的学生记录信息');
                } else {
                    Ext.Ajax.request({
                        url: 'remove.jsp',
                        params: "id=" + id,
                        success: function () {
                            var json = Ext.decode(response.responseText);
                            if (json.success) {
                                Ext.Msg.alert('消息', json.msg, function () {
                                        grid.getStore().reload();
                                        form.getForm().reset();
                                        form.buttons[0].setText("添加");
                                    }
                                );
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('错误', '删除失败');
                        }
                    });
                }
            }
        }]
    });


}, this)