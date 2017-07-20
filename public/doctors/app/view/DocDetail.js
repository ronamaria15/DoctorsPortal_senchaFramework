Ext.define('uabmob.view.DocDetail', {
    extend: 'Ext.Container',
    xtype: 'docdetail',

    config: {
        title: 'Details',
        scrollable: 'vertical',
        tpl: [
            '<b><div style="color:white;background-color:grey;width:100%;height:35px">Education And Training</div><br><p style="color:grey">{training}</p><br><br><br><div style="background-color:grey;width:100%;height:35px;color:white">Certifications</div><br><p style="color:grey">{certification}</p></b>             <div style="border-color:grey;border-thickness:1px;border-style:solid;margin:5 0 0 3;height:100px"><b><input type="button" position:"relative"  value="Make an appointment" style="width:80%;margin:15px;height:60%"></input></b></div>',
        ],
        items:[
        {
            xtype:'toolbar',
            items:[
            {
                xtype:'spacer',
                width:'30%',
            },
            
            {
                text:'Profile',
                name:'profilebtn',

            },
            
            {
                text:'Details',
                name:'detailbtn',
            },
            {
                xtype:'spacer',
            },
            
            ]
        },

     /*   {
                xtype:'label',
                id:'datelabel',
                html:'date',
                style:{
                    'position':'absolute',
                    'bottom':0,
                }
        },*/
        ]



    }
});