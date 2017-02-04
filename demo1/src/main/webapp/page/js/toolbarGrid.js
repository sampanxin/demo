Ext.onReady(function () {

    var itemsPerPage = 2;   // 设置您希望看到的每页的条目数量

    var store = Ext.create('Ext.data.Store', {
        id: 'simpsonsStore',
        autoLoad: false,
        fields: ['name', 'email', 'phone'],
        pageSize: itemsPerPage, // 每页的条目数量
        proxy: {
            type: 'ajax',
            url: 'js/pagingstore.js',  // 一个url，将加载start和limit参数并返回期望的数据
            reader: {
                type: 'json',
                root: 'items',
                totalProperty: 'total'
            }
        }
    });

// 指定要加载的页
    store.loadPage(1);


    Ext.create('Ext.grid.Panel', {
        title: 'toolbar 下',
        store: store,
        columns: [
            {header: 'Name', dataIndex: 'name'},
            {header: 'Email', dataIndex: 'email', flex: 1},
            {header: 'Phone', dataIndex: 'phone'}
        ],
        width: 400,
        height: 425,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store,   // GridPanel使用相同的数据源
            dock: 'bottom',
            displayInfo: true
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {xtype: 'button', text: '下'}
            ]
        }],
        //bbar: [ { xtype: 'button', text: 'Button 1' } ]
        renderTo: 'div1'
    });


    Ext.create('Ext.grid.Panel', {
        title: 'toolbar 上',
        store: store,
        columns: [
            {header: 'Name', dataIndex: 'name'},
            {header: 'Email', dataIndex: 'email', flex: 1},
            {header: 'Phone', dataIndex: 'phone'}
        ],
        width: 400,
        height: 425,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store,   // GridPanel使用相同的数据源
            dock: 'bottom',
            displayInfo: true
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {xtype: 'button', text: '上'}
            ]
        }],
        //tbar: [ { xtype: 'button', text: 'Button 1' } ]
        renderTo: 'div2'
    });


    Ext.create('Ext.grid.Panel', {
        title: 'toolbar 右',
        store: store,
        columns: [
            {header: 'Name', dataIndex: 'name'},
            {header: 'Email', dataIndex: 'email', flex: 1},
            {header: 'Phone', dataIndex: 'phone'}
        ],
        width: 400,
        height: 425,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store,   // GridPanel使用相同的数据源
            dock: 'bottom',
            displayInfo: true
        }, {
            xtype: 'toolbar',
            dock: 'right',
            items: [
                {xtype: 'button', text: '右'}
            ]
        }],

        //rbar: [ { xtype: 'button', text: 'Button 1' } ]

        renderTo: 'div3'
    });


    Ext.create('Ext.grid.Panel', {
        title: 'toolbar 左',
        store: store,
        columns: [
            {header: 'Name', dataIndex: 'name'},
            {header: 'Email', dataIndex: 'email', flex: 1},
            {header: 'Phone', dataIndex: 'phone'}
        ],
        width: 400,
        height: 425,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store,   // GridPanel使用相同的数据源
            dock: 'bottom',
            displayInfo: true
        }, {
            xtype: 'toolbar',
            dock: 'left',
            items: [
                {xtype: 'button', text: 'Button 1'}
            ]
        }],

        //lbar: [ { xtype: 'button', text: 'Button 1' }]
        renderTo: 'div4'
    });


    Ext.create('Ext.grid.Panel', {
        title: 'toolbar tools',
        store: store,
        columns: [
            {header: 'Name', dataIndex: 'name'},
            {header: 'Email', dataIndex: 'email', flex: 1},
            {header: 'Phone', dataIndex: 'phone'}
        ],
        width: 400,
        height: 425,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store,   // GridPanel使用相同的数据源
            dock: 'bottom',
            displayInfo: true
        }
            //    , {
            //    xtype: 'toolbar',
            //    dock: 'bottom',
            //    ui: 'footer',
            //    // defaults: {minWidth: minButtonWidth},
            //    items: [
            //        { xtype: 'component', flex: 1 },
            //        { xtype: 'button', text: 'Button 1' }
            //    ]
            //}
        ],
        buttons: [
            {text: 'Button 1'} //等价上面注释的代码
        ],
        closable: true, //为true这个窗体的'close
        tools: [{
            type: 'refresh',
            tooltip: 'Refresh form Data',
            // hidden:true,
            handler: function (event, toolEl, panel) {
                // 实现逻辑
            }
        },
            {
                type: 'help',
                tooltip: 'Get Help',
                handler: function (event, toolEl, panel) {
                    // 在此显示帮助信息
                }
            }],
        renderTo: 'div5'
    });


})