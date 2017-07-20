


Ext.define('uabmob.view.DocProfile', {
    extend: 'Ext.Container',
    xtype: 'docprofile',

 requires: ['uabmob.store.getAddress'],
    


    config: {
        title: 'Profile',
        //styleHtmlContent: true,
        scrollable: 'vertical',
        

       tpl: [
            '<div style="border-color:grey;border-thickness:1px;border-style:solid;margin:5 0 0 6;height:140px"><span style="float:left;display:inline-block"><img src="/doc.jpg"></img></span> <span style=""><b><br><span style="font-size:25px">&nbsp&nbsp&nbspDr.{first_name} {last_name}</span><br>&nbsp&nbsp&nbsp&nbspSpecializes in {department}</b></span></div>  <div style="border-color:grey;border-thickness:1px;border-style:solid;margin:5 0 0 3;height:100px"><b><span style="float:left;display:inline-block;clear:both;color:grey"><div style="width:40%;color:grey;float:left">&nbsp&nbsp<b><br>Speciality:</div></b></span><br><div style="float:left">&nbsp&nbspSpecializes in <br>&nbsp&nbsp{department} </div></b></div>          <div style="border-color:grey;border-thickness:1px;border-style:solid;margin:5 0 0 3;height:100px"><b><div style="width:30%;color:grey;float:left"><br> Phone </div><br><div style="float:left"><u><a href="tel:{office_phone}">{office_phone} </a></u></div></b></div>              <div style="border-color:grey;border-thickness:1px;border-style:solid;margin:5 0 0 3;height:100px"><b><div style="width:30%;color:grey;float:left"><br> Primary Clinic Location: </div><br><div id="mapdisplay" style="float:left">        {primary_hospital_affiliation}{address} </div></b></div><div style="border-color:grey;border-thickness:1px;border-style:solid;margin:5 0 0 3;height:100px"><b><input type="button" position:"relative"  value="Make an appointment" style="width:80%;margin:15px;height:60%"></input></b></div>',
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
            
            {
                text:'Map',
                xtype:'button',
                iconMask: true,
                name:'mapbtn',
                //align:'right',
                id:'mapbtn',
                //hidden:'true'
                
                

            },
             
            ]
        },

     /*  {
                xtype:'label',
                html:'DATE',
                id:'datelabel',
                height:'190px',
                style:{
                    'position':'absolute',
                    'bottom':0,
                },


        },
*/
        

        ]

        
    },




});
