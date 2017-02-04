Ext.onReady(function () {
    var navigate = function (panel, direction) {
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('card-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('card-next').setDisabled(!layout.getNext());
    };


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


    var formPanel = Ext.create('Ext.form.Panel', {
        labelWidth: 30,
        defaultType: "textfield",
        frame: true,
        items: [
            {
                fieldLabel: "姓名",
                name: "username",
                allowBlank: false
            },
            {
                fieldLabel: "呢称",
                name: "nickname"
            },
            {
                fieldLabel: "生日",
                xtype: 'datefield',
                name: "birthday"
            }
        ]
    })


    var borderPanel = Ext.create('Ext.panel.Panel', {
        renderTo: 'borderDiv1',
        layout: 'card',
        //tltle: 'Border Layout',
        //width: 1000,
        height: 600,
        activeItem: 0,
        bbar: ['->', {
            id: 'card-prev',
            text: '&laquo; Previous',
            disabled: true,
            handler: function (btn) {
                navigate(btn.up("panel"), "prev");
            },
        }, {
            id: 'card-next',
            text: 'Next &raquo;',
            handler: function (btn) {
                navigate(btn.up("panel"), "next");
            }
        }],
        items: [westTree1, westTree2, formPanel]
    });
}, this)