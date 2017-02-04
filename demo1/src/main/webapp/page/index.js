Ext.require(['*']);

Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    var tab = Ext.create('Ext.tab.Panel', {
        region: 'center', // a center region is ALWAYS required for border layout
        deferredRender: false,
        activeTab: 1,     // first tab initially active
        //autoScroll:true,
        items: [{
            contentEl: 'center1',
            title: 'Close Me',
            closable: true,
            autoScroll: true
        }, {
            contentEl: 'center2',
            title: 'Center Panel',
            autoScroll: true
        }]
    })

    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        //autoScroll:true,
        items: [
            // create instance immediately
            Ext.create('Ext.Component', {
                region: 'north',
                height: 52, // give north and south regions a height  顶部
                autoEl: {
                    tag: 'div',
                    html: '<p>north - generally for menus, toolbars and/or advertisements</p>'
                }
            }), {
                // lazily created panel (xtype:'panel' is default)
                //底部
                region: 'south',
                contentEl: 'south',
                split: true,
                height: 100,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                collapsed: true,
                title: 'South',
                margins: '0 0 0 0'
            }, {
                //    xtype: 'tabpanel',
                //    region: 'east',
                //    title: 'East Side',
                //    dockedItems: [{
                //        dock: 'top',
                //        xtype: 'toolbar',
                //        items: ['->', {
                //            xtype: 'button',
                //            text: 'test',
                //            tooltip: 'Test Button'
                //        }]
                //    }],
                //    animCollapse: true,
                //    collapsible: true,
                //    split: true,
                //    width: 225, // give east and west regions a width
                //    minSize: 175,
                //    maxSize: 400,
                //    margins: '0 5 0 0',
                //    activeTab: 1,
                //    tabPosition: 'bottom',
                //    items: [{
                //        html: '<p>A TabPanel component can be a region.</p>',
                //        title: 'A Tab',
                //        autoScroll: true
                //    }, Ext.create('Ext.grid.PropertyGrid', {
                //        title: 'Property Grid',
                //        closable: true,
                //        source: {
                //            "(name)": "Properties Grid",
                //            "grouping": false,
                //            "autoFitColumns": true,
                //            "productionQuality": false,
                //            "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                //            "tested": false,
                //            "version": 0.01,
                //            "borderWidth": 1
                //        }
                //    })]
                //}, {
                region: 'west',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'West',
                split: true,
                width: 200,
                minWidth: 175,
                maxWidth: 400,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
                layout: 'accordion',
                items: [{
                    //contentEl: 'west',
                    //title: 'Navigation',
                    //iconCls: 'nav' // see the HEAD section for style used

                    title: '插件管理',
                    xtype: 'treepanel',
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
                            text: '插件列表',
                            leaf: true,
                            id: 'xmlList.html',
                        }]
                    }, listeners: {
                        itemclick: function (v, r, item) {
                            var n = tab.getComponent(r.raw.id);
                            if (r.raw.id == 'root') {
                                return;
                            }
                            if (!n) { // 判断是否已经打开该面板
                                n = tab.add({
                                    'id': r.raw.id,
                                    'title': r.raw.text,
                                    closable: true, // 通过html载入目标页
                                    //html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+r.raw.id+'"></iframe>'
                                    autoLoad: {url: r.raw.id, scripts: true}
                                });
                            }
                            tab.setActiveTab(n);
                        }

                    }

                }, {
                    title: '系统配置',
                    //html: '<p>Some settings in here.</p>',
                    iconCls: 'settings',
                    xtype: 'treepanel',
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
                            text: 'properties配置',
                            leaf: true,
                            id: 'xmlList.html4',
                        }, {
                            text: '回推解析URL配置',
                            leaf: true,
                            id: 'xmlList.html3',
                        }, {
                            text: 'ip白名单配置',
                            leaf: true,
                            id: 'xmlList.html2',
                        }, {
                            text: '测试',
                            leaf: true,
                            id: 'xmlList.html1',
                        }]
                    }, listeners: {
                        itemclick: function (v, r, item) {
                            var n = tab.getComponent(r.raw.id);
                            if (r.raw.id == 'root') {
                                return;
                            }
                            if (!n) { // 判断是否已经打开该面板
                                n = tab.add({
                                    'id': r.raw.id,
                                    'title': r.raw.text,
                                    closable: true, // 通过html载入目标页
                                    //html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+r.raw.id+'"></iframe>'
                                    autoLoad: {url: r.raw.id, scripts: true}
                                });
                            }
                            tab.setActiveTab(n);
                        }

                    }
                }, {
                    title: '系统配置',
                    iconCls: 'settings',
                    xtype: 'treepanel',
                    expanded: true,//展开
                    animate: true, //展开,收缩动画
                    autoHeight: true,//自动高度,默认为false
                    enableDrag: false,//树的节点可以拖动Drag(效果上是),注意不是Draggable
                    enableDD: false,////不仅可以拖动,还可以通过Drag改变节点的层次结构(drap和drop)
                    border: false, //边框
                    lines: false,//节点间的虚线条
                    rootVisible: false,  //隐藏根节点
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
                            text: '布局',
                            expanded: true,//展开
                            children: [
                                {
                                    id: "border.html",
                                    text: 'border',
                                    leaf: true //表示无子节点
                                },
                                {
                                    id: "card.html",
                                    text: 'card',
                                    leaf: true
                                }, {
                                    id: "form.html",
                                    text: 'form',
                                    leaf: true
                                },
                                {
                                    id: "hbox.html",
                                    text: '其他',
                                    leaf: true
                                }

                            ]
                        }, {
                            text: 'Grid',
                            expanded: true,//展开
                            children: [
                                {
                                    id: "grid.html",
                                    text: 'grid',
                                    leaf: true
                                }, {
                                    id: "editgrid.html",
                                    text: 'editGrid',
                                    leaf: true
                                }, {
                                    id: "PagingGrid.html",
                                    text: 'PagingGrid',
                                    leaf: true
                                }, {
                                    id: "toolbarGrid.html",
                                    text: 'toolbarGrid',
                                    leaf: true
                                }, {
                                    id: "gridDemo.html",
                                    text: 'gridDemo',
                                    leaf: true
                                }, {
                                    id: "gridDemo2.html",
                                    text: 'gridDemo2',
                                    leaf: true
                                }
                            ]
                        }, {
                            text: 'Form',
                            expanded: true,//展开
                            children: [
                                {
                                    id: "formPanel.html",
                                    text: 'formPanel',
                                    leaf: true
                                }
                            ]
                        }
                        ]
                    }, listeners: {
                        itemclick: function (v, r, item) {
                            var n = tab.getComponent(r.raw.id);
                            if (r.raw.id == 'root') {
                                return;
                            }
                            if (!n) { // 判断是否已经打开该面板
                                n = tab.add({
                                    'id': r.raw.id,
                                    'title': r.raw.text,
                                    closable: true, // 通过html载入目标页
                                    autoScroll: true,
                                    //html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+r.raw.id+'"></iframe>'
                                    autoLoad: {url: r.raw.id, scripts: true}
                                });
                            }
                            tab.setActiveTab(n);
                        }

                    }

                }]
            },
            // in this instance the TabPanel is not wrapped by another panel
            // since no title is needed, this Panel is added directly
            // as a Container
            tab]
    });


    // get a reference to the HTML element with id "hideit" and add a click listener to it
    Ext.get("hideit").on('click', function () {
        // get a reference to the Panel that was created with id = 'west-panel'
        var w = Ext.getCmp('west-panel');
        // expand or collapse that Panel based on its collapsed property state
        w.collapsed ? w.expand() : w.collapse();
    });
});