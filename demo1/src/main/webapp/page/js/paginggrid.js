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
        title: 'Simpsons',
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
        }],
        //bbar: [ { xtype: 'button', text: 'Button 1' } ]
        //tbar: [ { xtype: 'button', text: 'Button 1' } ]
        //rbar: [ { xtype: 'button', text: 'Button 1' } ]
        //lbar: [ { xtype: 'button', text: 'Button 1' }]
        renderTo: 'pagingDiv'
    });
})