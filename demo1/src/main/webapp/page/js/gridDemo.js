Ext.onReady(function () {

    var itemsPerPage = 10;   // 设置您希望看到的每页的条目数量

    var store = Ext.create('Ext.data.Store', {
        storeId: 'simpsonsStore',
        autoLoad: false,
        fields: ['id', 'name', 'email', 'phone'],
        pageSize: itemsPerPage, // 每页的条目数量
        proxy: {
            type: 'ajax',
            getMethod: function () {
                return 'POST'; //默认'GET'
            },
            url: '../rest/test/users',  // 一个url，将加载start和limit参数并返回期望的数据
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            }
        }
    });

    store.on('beforeload', function (store, options) {
        if(Ext.getCmp('search')){
            var new_params = {name: Ext.getCmp('search').value};
            Ext.apply(store.proxy.extraParams, new_params);
        }
        console.log("加载数据之前触发");
    });
    // 指定要加载的页
    store.loadPage(1);
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });


    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
            'name',
            'email',
            'phone'
            //,
            //{ name: 'start', type: 'date', dateFormat: 'n/j/Y' },
            //{ name: 'salary', type: 'float' },
            //{ name: 'active', type: 'bool' }
        ]
    });


    var columns = [{
        header: 'id',
        dataIndex: 'id',
        hideable: false,
        hidden: true
    }, {
        header: 'Name',
        dataIndex: 'name',
        field: {
            xtype: 'textfield',
            allowBlank: false//非空
        }
    }, {
        header: 'Email',
        dataIndex: 'email',
        flex: 1,
        field: {
            xtype: 'textfield',
            allowBlank: false//非空
        }
    }, {
        header: 'Phone',
        dataIndex: 'phone',
        field: {
            xtype: 'textfield',
            allowBlank: false//非空
        }
    }];

    //分页toolbar
    var gridPaging = Ext.create('Ext.toolbar.Paging', {
        store: store,   // GridPanel使用相同的数据源
        dock: 'bottom',
        displayInfo: true
    })

    var gridToolbar = Ext.create('Ext.toolbar.Toolbar', {
        items: [{
            id:"search",
            xtype: 'textfield',
            name: 'search',
            emptyText: '输入搜索词'
        }, {
            xtype: 'splitbutton',
            text: 'Add',
            handler: function () {
                rowEditing.cancelEdit();
                var r = Ext.create('Employee', {
                    name: 'New Guy',
                    email: 'new@sencha-test.com',
                    phone: '15098766789'
                });
                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            xtype: 'splitbutton',
            text: 'delete',
            itemId: 'removeEmployee',
            handler: function () {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
                disabled: true
            }
        }]
    })


    var grid = Ext.create('Ext.grid.Panel', {
        renderTo: 'gridDemoDiv1',
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        width: 600,
        height: 325,
        //frame:true,//圆角边框
        columns: columns,
        selType: 'rowmodel',
        plugins: [rowEditing],
        dockedItems: [gridPaging],
        tbar: gridToolbar,
        tools: [{
            type: 'help',
            handler: function () {
                // 此处显示帮助的逻辑
            }
        }, {
            itemId: 'refresh',
            type: 'refresh',
            hidden: true,
            handler: function () {
                // 实现刷新的逻辑
            }
        }, {
            type: 'search',
            handler: function (event, target, owner, tool) {
                // 实现查询的逻辑
                owner.child('#refresh').show();
            }
        }],
        listeners: {
            'selectionchange': function (view, records) {
                grid.down('#removeEmployee').setDisabled(!records.length);
                if (records.length > 0) {
                    var temp = records[0].data;
                    console.log("选择行更改事件 name=" + temp.name)
                }
            },
            'edit': function (editor, e) {
                var temp = e.newValues;
                temp.id = e.record.data.id;
                console.log("编辑完成后，提交更改，" + Ext.encode(temp));
                Ext.Ajax.request({
                    url: '../rest/test/updateUser',
                    method: 'post',
                    params: temp,
                    success: function (response, options) {
                        var o = Ext.decode(response.responseText)
                        console.log("编辑完成后，提交更改，返回 " + o.success);
                    },
                    failure: function () {
                        console.log("编辑完成后，提交更改，错误 ");
                    }
                });
            }
        }

    });
})


