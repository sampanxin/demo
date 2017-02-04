Ext.onReady(function () {
    Ext.create('Ext.data.Store', {
        storeId: 'employeeStore',
        fields: ['firstname', 'lastname', 'seniority', 'dep', 'hired'],
        data: [
            {firstname: "Michael", lastname: "Scott", seniority: 7, dep: "Management", hired: "01/10/2004"},
            {firstname: "Dwight", lastname: "Schrute", seniority: 2, dep: "Sales", hired: "04/01/2004"},
            {firstname: "Jim", lastname: "Halpert", seniority: 3, dep: "Sales", hired: "02/22/2006"},
            {firstname: "Kevin", lastname: "Malone", seniority: 4, dep: "Accounting", hired: "06/10/2007"},
            {firstname: "Angela", lastname: "Martin", seniority: 5, dep: "Accounting", hired: "10/21/2008"}
        ]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Column Demo',
        store: Ext.data.StoreManager.lookup('employeeStore'),
        columns: [
            {text: 'First Name', dataIndex: 'firstname'},
            {text: 'Last Name', dataIndex: 'lastname'},
            {text: 'Hired Month', dataIndex: 'hired', xtype: 'datecolumn', format: 'M'},
            {text: 'Department (Yrs)', xtype: 'templatecolumn', tpl: '{dep} ({seniority})'}
        ],
        width: 400,
        //forceFit: true,
        renderTo: 'gridDiv'
    });


    Ext.create('Ext.data.Store', {
        storeId: 'employeeStore',
        fields: ['firstname', 'lastname', 'seniority', 'dep', 'hired'],
        data: [
            {firstname: "Michael", lastname: "Scott"},
            {firstname: "Dwight", lastname: "Schrute"},
            {firstname: "Jim", lastname: "Halpert"},
            {firstname: "Kevin", lastname: "Malone"},
            {firstname: "Angela", lastname: "Martin"}
        ]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Action Column Demo',
        store: Ext.data.StoreManager.lookup('employeeStore'),
        columns: [
            {text: 'First Name', dataIndex: 'firstname'},
            {text: 'Last Name', dataIndex: 'lastname'},
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
        width: 250,
        renderTo: 'gridDiv2'
    });


    Ext.create('Ext.data.Store', {
        storeId: 'sampleStore',
        fields: [
            {name: 'framework', type: 'string'},
            {name: 'rocks', type: 'boolean'}
        ],
        data: {
            'items': [
                {'framework': "Ext JS 4", 'rocks': true},
                {'framework': "Sencha Touch", 'rocks': true},
                {'framework': "Ext GWT", 'rocks': true},
                {'framework': "Other Guys", 'rocks': false}
            ]
        },
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'items'
            }
        }
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Boolean Column Demo',
        store: Ext.data.StoreManager.lookup('sampleStore'),
        columns: [
            {text: 'Framework', dataIndex: 'framework', flex: 1},
            {
                xtype: 'booleancolumn',
                text: 'Rocks',
                trueText: 'Yes',
                falseText: 'No',
                dataIndex: 'rocks'
            }
        ],
        height: 200,
        width: 400,
        renderTo: 'gridDiv3'
    });


    Ext.create('Ext.data.Store', {
        storeId: 'sampleStore',
        fields: [
            {name: 'symbol', type: 'string'},
            {name: 'date', type: 'date'},
            {name: 'change', type: 'number'},
            {name: 'volume', type: 'number'},
            {name: 'topday', type: 'date'}
        ],
        data: [
            {symbol: "msft", date: '2011/04/22', change: 2.43, volume: 61606325, topday: '04/01/2010'},
            {symbol: "goog", date: '2011/04/22', change: 0.81, volume: 3053782, topday: '04/11/2010'},
            {symbol: "apple", date: '2011/04/22', change: 1.35, volume: 24484858, topday: '04/28/2010'},
            {symbol: "sencha", date: '2011/04/22', change: 8.85, volume: 5556351, topday: '04/22/2010'}
        ]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Date Column Demo',
        store: Ext.data.StoreManager.lookup('sampleStore'),
        columns: [
            {text: 'Symbol', dataIndex: 'symbol', flex: 1},
            {text: 'Date', dataIndex: 'date', xtype: 'datecolumn', format: 'Y-m-d'},
            {text: 'Change', dataIndex: 'change', xtype: 'numbercolumn', format: '0.00'},
            {text: 'Volume', dataIndex: 'volume', xtype: 'numbercolumn', format: '0,000'},
            {text: 'Top Day', dataIndex: 'topday', xtype: 'datecolumn', format: 'l'}
        ],
        height: 200,
        width: 450,
        renderTo: 'gridDiv4'
    });

    Ext.create('Ext.data.Store', {
        storeId: 'sampleStore',
        fields: [
            {name: 'symbol', type: 'string'},
            {name: 'price', type: 'number'},
            {name: 'change', type: 'number'},
            {name: 'volume', type: 'number'}
        ],
        data: [
            {symbol: "msft", price: 25.76, change: 2.43, volume: 61606325},
            {symbol: "goog", price: 525.73, change: 0.81, volume: 3053782},
            {symbol: "apple", price: 342.41, change: 1.35, volume: 24484858},
            {symbol: "sencha", price: 142.08, change: 8.85, volume: 5556351}
        ]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Number Column Demo',
        store: Ext.data.StoreManager.lookup('sampleStore'),
        columns: [
            {text: 'Symbol', dataIndex: 'symbol', flex: 1},
            {text: 'Current Price', dataIndex: 'price', renderer: Ext.util.Format.usMoney},
            {text: 'Change', dataIndex: 'change', xtype: 'numbercolumn', format: '0.00'},
            {text: 'Volume', dataIndex: 'volume', xtype: 'numbercolumn', format: '0,000'}
        ],
        height: 200,
        width: 400,
        renderTo: 'gridDiv5'
    });


    Ext.create('Ext.data.Store', {
        storeId: 'employeeStore',
        fields: ['firstname', 'lastname', 'seniority', 'department'],
        groupField: 'department',
        data: [
            {firstname: "Michael", lastname: "Scott", seniority: 7, department: "Management"},
            {firstname: "Dwight", lastname: "Schrute", seniority: 2, department: "Sales"},
            {firstname: "Jim", lastname: "Halpert", seniority: 3, department: "Sales"},
            {firstname: "Kevin", lastname: "Malone", seniority: 4, department: "Accounting"},
            {firstname: "Angela", lastname: "Martin", seniority: 5, department: "Accounting"}
        ]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Column Template Demo',
        store: Ext.data.StoreManager.lookup('employeeStore'),
        columns: [
            {text: 'Full Name', xtype: 'templatecolumn', tpl: '{firstname} {lastname}', flex: 1},
            {text: 'Department (Yrs)', xtype: 'templatecolumn', tpl: '{department} ({seniority})'}
        ],
        height: 200,
        width: 300,
        renderTo: "gridDiv6"
    });


    Ext.create('Ext.data.Store', {
        storeId: 'employeeStore1',
        fields: ['firstname', 'lastname', 'seniority', 'department', 'hired', 'date', 'price', 'change', 'volume', 'rocks', 'sex', 'mail'],
        groupField: 'department',
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
        //selType: 'cellmodel',//选择模型  默认rowmodel
        store: Ext.data.StoreManager.lookup('employeeStore1'),
        columns: [
            {
                text: 'First Name', dataIndex: 'firstname',
                header: 'First Name',
                sortable: false,//禁止排序
                hideable: false,//不隐藏
                flex: 1//占用全部的剩余宽度
            },
            {text: 'Last Name', dataIndex: 'lastname'},
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
        height: 200,
        //width: 900,
        forceFit: true,
        renderTo: "gridDiv7"
    })


}, this)