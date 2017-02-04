
Ext.onReady(function () {

    //顶部
    var component = Ext.create('Ext.Component', {
        region: 'north',
        height: 52,
        collapsible: false,
        autoEl: {
            tag: 'div',
            html: '<p>north - generally for menus, toolbars and/or advertisements</p>'
        }
    })

    //左边控件 tree
    var westTree1 = Ext.create('Ext.tree.Panel', {
        iconCls: 'nav', // see the HEAD section for style used
        title: '插件管理',
        expanded: true,
        animate: true,
        enableDD: false,
        border: false, //边框
        rootVisible: false,  //隐藏根节点
        useArrows: true, //树节点使用箭头
        containerScroll: true,
        collapsible: false,
        autoScroll: false,
        //singleExpand:true,   //展示单个子节点，其它的子节点合并。
        root: {
            //text : '..',
            id: 'root',
            children: [{
                text: '点我',
                leaf: true
            }]
        }
    })
    var westTree2 = Ext.create('Ext.tree.Panel', {
        title: 'settings',
        iconCls: 'settings',
        //xtype: 'treepanel',
        expanded: true,//展开
        animate: true, //展开,收缩动画
        autoHeight: true,//自动高度,默认为false
        enableDrag: false,//树的节点可以拖动Drag(效果上是),注意不是Draggable
        enableDD: false,////不仅可以拖动,还可以通过Drag改变节点的层次结构(drap和drop)
        border: false, //边框
        lines: false,//节点间的虚线条
        rootVisible: true,  //隐藏根节点
        useArrows: true, //树节点使用箭头
        trackMouseOver: true,//false则mouseover无效果
        containerScroll: true,
        collapsible: true,
        autoScroll: true,
        root: {
            //text : '..',
            id: 'root',
            expanded: true,//展开
            children: [{
                text: '测试',
                expanded: true,//展开
                children: [
                    {
                        text: '节点1',
                        leaf: true //表示无子节点
                    }
                ]
            }]
        }
    })
    //左边控件 tree  end

    //中间控件
    var tab = Ext.create('Ext.tab.Panel', {
        region: 'center', // a center region is ALWAYS required for border layout
        deferredRender: false,
        activeTab: 1,     // first tab initially active
        items: [{
            // contentEl: 'center2',
            title: '首页',
            autoScroll: true
        }, {
            //  contentEl: 'center1',
            title: 'Close Me',
            closable: true,
            autoScroll: true
        }]
    })
    //中间控件 end

    //右边控件  PropertyGrid
    var propertyGrid = Ext.create('Ext.grid.PropertyGrid', {
        title: 'Property Grid',
        closable: true,
        source: {
            "(name)": "Properties Grid",
            "grouping": false,
            "autoFitColumns": true,
            "productionQuality": false,
            "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
            "tested": false,
            "version": 0.01,
            "borderWidth": 1
        }
    })

    var eastTab = Ext.create('Ext.tab.Panel', {
        region: 'east',
        title: 'East Side',
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: ['->', {
                xtype: 'button',
                text: 'test',
                tooltip: 'Test Button'
            }]
        }],
        animCollapse: true,
        collapsible: true,
        split: true,
        width: 225, // give east and west regions a width
        minSize: 175,
        maxSize: 400,
        margins: '0 5 0 0',
        activeTab: 1,
        tabPosition: 'bottom',
        items: [{
            html: '<p>A TabPanel component can be a region.</p>',
            title: 'A Tab',
            autoScroll: true
        }, propertyGrid]
    })
    //右边控件 end


    var borderPanel =Ext.create('Ext.panel.Panel', {
        renderTo: 'borderDiv',
        layout: 'border',
        tltle: 'Border Layout',
        //width: 1000,
        height: 600,
        //defaults: {
        //    collapsible: true, // 支持该区域的展开和折叠
        //    split: true, // 支持用户拖放改变该区域的大小
        //    bodyStyle: 'padding:15px'
        //},
        items: [{
            //title: 'Footer-s',
            region: 'south',
            height: 100,
            minSize: 75,
            //collapsible: true,
            split: true,
            collapsible: true,
            animCollapse: true,
            maxSize: 250,
            html: '这是底边区域 south'

        }, tab, {
            region: 'west',
            stateId: 'navigation-panel',
            title: 'West',
            split: true,
            width: 200,
            minWidth: 175,
            maxWidth: 400,
            collapsible: true,
            animCollapse: true,
            margins: '0 0 0 5',
            layout: 'accordion',
            items: [westTree1, westTree2]
        }, component, eastTab]
    });
},this)