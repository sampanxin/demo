Ext.onReady(function () {

    Ext.create('Ext.Panel', {
        width: 500,
        height: 300,
        title: "HBoxLayout Panel",
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        renderTo: "hboxDiv",
        items: [{
            xtype: 'panel',
            title: 'Inner Panel One',
            flex: 2
        },{
            xtype: 'panel',
            title: 'Inner Panel Two',
            flex: 1
        },{
            xtype: 'panel',
            title: 'Inner Panel Three',
            flex: 1
        }]
    });


    Ext.create('Ext.Panel', {
        width: 500,
        height: 400,
        title: "VBoxLayout Panel",
        layout: {
            type: 'vbox',
            align: 'center'
        },
        renderTo:"vboxDiv",
        items: [{
            xtype: 'panel',
            title: 'Inner Panel One',
            width: 250,
            flex: 2
        },
            {
                xtype: 'panel',
                title: 'Inner Panel Two',
                width: 250,
                flex: 4
            },
            {
                xtype: 'panel',
                title: 'Inner Panel Three',
                width: '50%',
                flex: 4
            }]
    });




    Ext.create('Ext.panel.Panel', {
        title: 'Table Layout',
        width: 300,
        height: 150,
        layout: {
            type: 'table',
            // The total column count must be specified here
            columns: 3
        },
        defaults: {
            // applied to each contained panel
            bodyStyle: 'padding:20px'
        },
        items: [{
            html: 'Cell A content',
            rowspan: 2
        },{
            html: 'Cell B content',
            colspan: 2
        },{
            html: 'Cell C content',
            cellCls: 'highlight'
        },{
            html: 'Cell D content'
        }],
        renderTo: "tableDiv"
    });



    Ext.create('Ext.panel.Panel', {
        title: 'Fit Layout',
        width: 300,
        height: 150,
        layout:'fit',
        items: {
            title: 'Inner Panel',
            html: 'This is the inner panel content',
            bodyPadding: 20,
            border: false
        },
        renderTo: "fitDiv"
    });

}, this)