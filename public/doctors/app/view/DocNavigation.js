Ext.define('uabmob.view.DocNavigation', {
    extend: 'Ext.navigation.View',
    xtype: 'docnavigation',
    alias: 'widget.docnavigation',

    requires: [
        'uabmob.view.DocListView',
        'uabmob.view.DocDetail',
        'uabmob.view.DocProfile',


        //'Sencha.view.PresidentDetail'
    ],

    config: {

        navigationBar:{
            items:[
            {
                xtype:'button',
                ui:'back',
                text:'Back',
                id:'backbtn',
                go:'mainPanel',
            },
            
            ],


        },

        items: [

        {
            xtype: 'doclistview'
        },

        
        
        ]
    }
});