Ext.onReady(function () {
    Ext.create('Ext.data.Store', {
        storeId: 'employeeStore1',
        fields: ['firstname', 'lastname', 'seniority', 'department', 'hired', 'date', 'price', 'change', 'volume', 'rocks', 'sex', 'mail'],
        groupField: 'department', //分组字段
        data: [
            {
                firstname: "Michael",
                lastname: "Scott",
                seniority: 7,
                department: "Management",
                date: '2011/04/22',
                price: 142.08,
                change: 8.85,
                volume: 5556351,
                'rocks': false,
                sex: 1,
                mail: '343698277@qq.com'
            },
            {
                firstname: "Dwight",
                lastname: "Schrute",
                seniority: 2,
                department: "Sales",
                date: '2011/04/22',
                price: 142.08,
                change: 8.85,
                volume: 5556351,
                'rocks': false,
                sex: 1,
                mail: '343698277@qq.com'
            },
            {
                firstname: "Jim",
                lastname: "Halpert",
                seniority: 3,
                department: "Sales",
                date: '2011/04/22',
                price: 142.08,
                change: 8.85,
                volume: 5556351,
                'rocks': true,
                sex: 1,
                mail: '343698277@qq.com'
            },
            {
                firstname: "Kevin",
                lastname: "Malone",
                seniority: 4,
                department: "Accounting",
                date: '2011/04/22',
                price: 142.08,
                change: 8.85,
                volume: 5556351,
                'rocks': false,
                sex: 2,
                mail: '343698277@qq.com'
            },
            {
                firstname: "Angela",
                lastname: "Martin",
                seniority: 5,
                department: "Accounting",
                date: '2011/04/22',
                price: 142.08,
                change: 8.85,
                volume: 5556351,
                'rocks': true,
                sex: 3,
                mail: '343698277@qq.com'
            }
        ]
    });
    Ext.create('Ext.grid.Panel', {
        title:"单元格编辑",
        store: Ext.data.StoreManager.lookup('employeeStore1'),
        selType: 'cellmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ],
        columns: [
            {
                text: 'First Name', dataIndex: 'firstname',
                header: 'First Name',
                sortable: false,//禁止排序
                hideable: false,//不隐藏
                flex: 1,//占用全部的剩余宽度
                field: 'textfield'
            },
            {text: 'Last Name', dataIndex: 'lastname', field: {
                xtype: 'textfield',
                allowBlank: false//非空
            }},
            {text: 'Hired Month', dataIndex: 'date', xtype: 'datecolumn', format: 'M'},
            {text: 'Date', dataIndex: 'date', xtype: 'datecolumn', format: 'Y-m-d'},
            {text: 'Top Day', dataIndex: 'date', xtype: 'datecolumn', format: 'l'},
            {text: 'Full Name', xtype: 'templatecolumn', tpl: '{firstname} {lastname}', flex: 1},
            {text: 'Department (Yrs)', xtype: 'templatecolumn', tpl: '{department} ({seniority})'},
            {text: 'Current Price', dataIndex: 'price', renderer: Ext.util.Format.usMoney},
            {text: 'Change', dataIndex: 'change', xtype: 'numbercolumn', format: '0.00'},
            {text: 'Volume', dataIndex: 'volume', xtype: 'numbercolumn', format: '0,000'},
            {
                text: 'First Name', dataIndex: 'sex', renderer: function (value) {
                if (value === 1) {
                    return '女（1）';
                } else if (value === 2) {
                    return '男（2）';
                }
                return value;
            }
            },
            {
                xtype: 'booleancolumn',
                text: 'Rocks',
                trueText: 'Yes',
                falseText: 'No',
                dataIndex: 'rocks'
            },
            {
                text: 'Email', dataIndex: 'mail',
                renderer: function (value) {
                    return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
                }
            },
            {
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    icon: '../static/js/ext/icons/fam/cog_edit.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Edit " + rec.get('firstname'));
                    }
                }, {
                    icon: '../static/js/ext/icons/fam/delete.gif',
                    tooltip: 'Delete',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Terminate " + rec.get('firstname'));
                    }
                }]
            }
        ],
        //height: 200,
        //width: 900,
        forceFit: true,
        renderTo: "editDiv7"
    })

    Ext.create('Ext.grid.Panel', {
        title:"行编辑",
        store: Ext.data.StoreManager.lookup('employeeStore1'),
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1
            })
        ],
        columns: [
            {
                text: 'First Name', dataIndex: 'firstname',
                header: 'First Name',
                sortable: false,//禁止排序
                hideable: false,//不隐藏
                flex: 1,//占用全部的剩余宽度
                field: 'textfield'
            },
            {text: 'Last Name', dataIndex: 'lastname', field: {
                xtype: 'textfield',
                allowBlank: false//非空
            }},
            {text: 'Hired Month', dataIndex: 'date', xtype: 'datecolumn', format: 'M'},
            {text: 'Date', dataIndex: 'date', xtype: 'datecolumn', format: 'Y-m-d'},
            {text: 'Top Day', dataIndex: 'date', xtype: 'datecolumn', format: 'l'},
            {text: 'Full Name', xtype: 'templatecolumn', tpl: '{firstname} {lastname}', flex: 1},
            {text: 'Department (Yrs)', xtype: 'templatecolumn', tpl: '{department} ({seniority})'},
            {text: 'Current Price', dataIndex: 'price', renderer: Ext.util.Format.usMoney},
            {text: 'Change', dataIndex: 'change', xtype: 'numbercolumn', format: '0.00'},
            {text: 'Volume', dataIndex: 'volume', xtype: 'numbercolumn', format: '0,000'},
            {
                text: 'First Name', dataIndex: 'sex', renderer: function (value) {
                if (value === 1) {
                    return '女（1）';
                } else if (value === 2) {
                    return '男（2）';
                }
                return value;
            }
            },
            {
                xtype: 'booleancolumn',
                text: 'Rocks',
                trueText: 'Yes',
                falseText: 'No',
                dataIndex: 'rocks'
            },
            {
                text: 'Email', dataIndex: 'mail',
                renderer: function (value) {
                    return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
                }
            },
            {
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    icon: '../static/js/ext/icons/fam/cog_edit.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Edit " + rec.get('firstname'));
                    }
                }, {
                    icon: '../static/js/ext/icons/fam/delete.gif',
                    tooltip: 'Delete',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Terminate " + rec.get('firstname'));
                    }
                }]
            }
        ],
        //height: 200,
        //width: 900,
        forceFit: true,
        renderTo: "editDiv6"
    })




    var store = Ext.create('Ext.data.Store', {
        storeId:'employeeStore',
        fields:['name', 'seniority', 'department'],
        groupField: 'department',
        data: {'employees':[
            { "name": "Michael Scott",  "seniority": 7, "department": "Management" },
            { "name": "Dwight Schrute", "seniority": 2, "department": "Sales" },
            { "name": "Jim Halpert",    "seniority": 3, "department": "Sales" },
            { "name": "Kevin Malone",   "seniority": 4, "department": "Accounting" },
            { "name": "Angela Martin",  "seniority": 5, "department": "Accounting" }
        ]},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'employees'
            }
        }
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Grouping分组',
        store: Ext.data.StoreManager.lookup('employeeStore'),
        columns: [
            { header: 'Name',     dataIndex: 'name' },
            { header: 'Seniority', dataIndex: 'seniority' }
        ],
        features: [{ftype:'grouping'}],
        width: 200,
        height: 275,
        renderTo: "editDiv5"
    });



    Ext.create('Ext.grid.Panel', {
        title:"行编辑 分组",
        store: Ext.data.StoreManager.lookup('employeeStore1'),
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1
            })
        ],
        columns: [
            {
                text: 'First Name', dataIndex: 'firstname',
                header: 'First Name',
                sortable: false,//禁止排序
                hideable: false,//不隐藏
                flex: 1,//占用全部的剩余宽度
                field: 'textfield'
            },
            {text: 'Last Name', dataIndex: 'lastname', field: {
                xtype: 'textfield',
                allowBlank: false//非空
            }},
            {text: 'Hired Month', dataIndex: 'date', xtype: 'datecolumn', format: 'M'},
            {text: 'Date', dataIndex: 'date', xtype: 'datecolumn', format: 'Y-m-d'},
            {text: 'Top Day', dataIndex: 'date', xtype: 'datecolumn', format: 'l'},
            {text: 'Full Name', xtype: 'templatecolumn', tpl: '{firstname} {lastname}', flex: 1},
            {text: 'Department (Yrs)', xtype: 'templatecolumn', tpl: '{department} ({seniority})'},
            {text: 'Current Price', dataIndex: 'price', renderer: Ext.util.Format.usMoney},
            {text: 'Change', dataIndex: 'change', xtype: 'numbercolumn', format: '0.00'},
            {text: 'Volume', dataIndex: 'volume', xtype: 'numbercolumn', format: '0,000'},
            {
                text: 'First Name', dataIndex: 'sex', renderer: function (value) {
                if (value === 1) {
                    return '女（1）';
                } else if (value === 2) {
                    return '男（2）';
                }
                return value;
            }
            },
            {
                xtype: 'booleancolumn',
                text: 'Rocks',
                trueText: 'Yes',
                falseText: 'No',
                dataIndex: 'rocks'
            },
            {
                text: 'Email', dataIndex: 'mail',
                renderer: function (value) {
                    return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
                }
            },
            {
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    icon: '../static/js/ext/icons/fam/cog_edit.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Edit " + rec.get('firstname'));
                    }
                }, {
                    icon: '../static/js/ext/icons/fam/delete.gif',
                    tooltip: 'Delete',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        alert("Terminate " + rec.get('firstname'));
                    }
                }]
            }
        ],
        //height: 200,
        //width: 900,
        features: [{ftype:'grouping'}], //分组 要添加到该表格的一个关于表格特征的数组。关于其用法参见Ext.grid.feature.Feature。
        forceFit: true,
        renderTo: "editDiv4"
    })



}, this)