Ext.define('uabmob.view.DocListView', {
    extend: 'Ext.List',
    alias: 'widget.doclistwidget',

    xtype: 'doclistview',

    stores: [
        'DocByName'
    ],
        requires: ['uabmob.store.DocByName'],

    
    config: {
        items:[
        {
            xtype:'searchfield',
            name: 'search2',
            id:'searchfield2',
            height:'0.2em',
            usePicker:'true',
            style: {
                'border': '2px solid grey',
                'margin':'10px',
                'border-radius':'25px',

            },   
                 
        },

        ],
        
        title: 'Results.....',
        itemTpl: '<span style="float:left;clear:both;display:inline-block"><img src="/doc.jpg" ></img></span><span style="display:block;"><b>&nbsp&nbsp&nbspDr.{first_name} {last_name}</b><br>&nbsp&nbsp&nbsp{department}<br>&nbsp&nbsp&nbsp{office_phone}<br>&nbsp&nbsp&nbsp{primary_hospital_affiliation}</span><br>',
        store: 'DocByName',
        onItemDisclosure: true,

       

    }
});