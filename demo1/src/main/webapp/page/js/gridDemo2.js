Ext.onReady(function () {

    var itemsPerPage = 10;   // 设置您希望看到的每页的条目数量

    //1.定义Model
    Ext.define("MyApp.model.User", {
        extend: "Ext.data.Model",
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'phone', type: 'string'}
        ]
    });


    var store = Ext.create('Ext.data.Store', {
        storeId: 'simpsonsStore',
        model: "MyApp.model.User",
        autoLoad: false,
        //fields: ['id', 'name', 'email', 'phone'],
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
        if (Ext.getCmp('search')) {
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


    var columns = [{xtype: 'rownumberer'}, {
        header: 'id',
        dataIndex: 'id',
        hideable: false,
        hidden: true
    }, {
        header: 'Name',
        dataIndex: 'name',
        menuDisabled:true,//禁用排序菜单只有排序
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
            id: "search",
            xtype: 'textfield',
            name: 'search',
            emptyText: '输入搜索词'
        }, {
            xtype: 'splitbutton',
            text: 'button',
            handler: function () {
            }
        }]
    })


    var grid = Ext.create('Ext.grid.Panel', {
        renderTo: 'gridDemoDiv2',
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        width: 600,
        height: 325,
        //frame:true,//圆角边框
        selModel: {
            injectCheckbox: 0,
            mode: "SINGLE"     //"SINGLE"/"SIMPLE"/"MULTI"
            //,checkOnly: true     //只能通过checkbox选择
        },
        selType: "checkboxmodel",
        columns: columns,
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
                //grid.down('#removeEmployee').setDisabled(!records.length);
                //if (records.length > 0) {
                //    var temp = records[0].data;
                //    console.log("选择行更改事件 name=" + temp.name)
                //}
                console.log("选择行更改事件 ");
            }
        }
    });
})


