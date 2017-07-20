var latlong,loc_title;
var search_val,search_type="name";
var docfullname,docdata,address_data;
Ext.define('uabmob.controller.Doctors', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            docnavigation:'docnavigation',
            datelabel:'#datelabel',
            backbtn:'#backbtn', 
            mapbtn:'#mapbtn',
            searchfield:'searchfield',
            searchfield2:'#searchfield2',
            mapDisplay:'mapDisplay',


            
        },
    control: {

            mapDisplay:{
                initialize:'mapShow'
            },

           searchbtn:{
           	tap:'search1'
           },

           mapdisplay:{
            tap:'gg'
           },


          'button[name=namesearch]':{
              tap:'namsearch'

           },
            
         'button[name=locationsearch]':{
               tap:'locsearch'
           },
            
        'button[name=specsearch]':{
                tap:'specsearch'
           },
           
        'button[name=mapbtn]':{
                tap:'mapdisplay'
           },
            
        'doclistview': {
                
                itemtap: 'showDetail',
                activate:'paintlist',

          },
        datelabel:{
                initialize: 'showDate'
            },
            
       'button[go=docnavigation]': {
              tap: 'showList',
            
            },
         
      'button[go=mainPanel]': {
              tap: 'homepage',
            
            },
       'button[name=profilebtn]': {
              tap: 'swaptoprofile',
            
            },

      'button[name=detailbtn]': {
              tap: 'swaptodetail',
            
            },

            searchfield2:{
                scope:this,
                keyup:'onSearchKeyUp',
            },
       'mainPanel':{
           //     show:'mainPage',
            },
       'docnavigation':{
                activate:'navigPage',
            },

    }

    
},

            mapShow:function()
            {
                    map1=this.getMapDisplay()
                    map1.setMapCenter(new google.maps.LatLng(latlong.lat(), latlong.lng()));
                    new google.maps.Marker({
                          map:map1.getMap(),
                          position:new google.maps.LatLng(latlong.lat(), latlong.lng()),
                          title:loc_title,
        });


            },

            mapdisplay:function()
            {
                        current=this
                        address=document.getElementById('mapdisplay').innerHTML
                        //alert(address)

                        if(address.trim()=="null")
                        {
                            Ext.Msg.alert("Address Unavailable")
                        }
                        else
                        {
                        address=address.replace(/(<([^>]+)>)/ig,"");
                        loc_title=address;
                        var geo = new google.maps.Geocoder;
                        geo.geocode({'address':address},function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {              
                            var myLatLng = results[0].geometry.location;
                            
                            latlong=myLatLng
                           
                           
                        // Add some code to work with myLatLng              
                        current.getDocnavigation().push({
                        xtype: 'mapDisplay',
                        data:myLatLng,

                                 
                         });
                        var backbtn=current.getBackbtn()
                        backbtn.hide();

                        }

                         else
                             {
                            alert("Geocode was not successful for the following reason: " + status);
                             }  
                        });
                    }
                
            },

            navigPage:function()
            {
                    a= Ext.Viewport.getActiveItem().items.get(0).items.get(0);
                    a.on({
                   scope:this,
                   keyup: 'onSearchKeyUp',
                   });
                  
                   
            },




            mainPage:function()
            {
                alert("main");
                
            },

            onSearchKeyUp:function()
            {

            var value = Ext.getCmp('searchfield2').getValue(),
            store = Ext.getStore('DocByName');
            store.clearFilter();       
            if (value) {
                    var searches = value.split(' '),
                regexps = [],
                i;       
               for (i = 0; i < searches.length; i++) {
                         if (!searches[i]) continue;       
                regexps.push(new RegExp(searches[i], 'i'));
               }

             store.filter(function(record) {
                var matched = [];       
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('first_name').match(search) || record.get('last_name').match(search);

        
                    matched.push(didMatch);
                }       
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    return matched[0];
                }
            });
        
        }


            },


            swaptoprofile:function(sub)
            {
                    this.getDocnavigation().pop();
                    this.getDocnavigation().push({
                    xtype: 'docprofile',
                    title:docfullname,
                    data:docdata,


                

                
                    });
                    var backbtn=this.getBackbtn()
                    backbtn.hide();
                    var mapbtn=this.getMapbtn()
                    mapbtn.show();


            },



            swaptodetail:function()
            {

                    this.getDocnavigation().pop();
                    this.getDocnavigation().push({
                    xtype: 'docdetail',
                    title:docfullname,
                    data:docdata,

                

                
                    });
                    var backbtn=this.getBackbtn()
                    backbtn.hide();
                    var mapbtn=this.getMapbtn()
                    mapbtn.show();


            },

            homepage:function(btn)
            {
                  Ext.Viewport.getActiveItem().destroy()
                  Ext.Viewport.setActiveItem({xtype:'mainPanel'});
                  Ext.getCmp('searchfield').setValue(search_val);
            },
            paintlist:function(sub)
            {

                var backbtn=this.getBackbtn()
                if(backbtn)
                backbtn.show();
                var mapbtn=this.getMapbtn()
                if(mapbtn)
                mapbtn.hide();
                


            },

            showList:function(arg1)
            {
                        store = Ext.getStore('DocByName');
                        store.clearFilter();
                        var name=Ext.getCmp('searchfield').getValue();
                        var spec=Ext.getCmp('spec_select').getValue();
                        var subspec=Ext.getCmp('subspec_select').getValue();
                        var loc=Ext.getCmp('loc_select').getValue();
                        if(name=="" && spec=="" && subspec=="" && loc=="")
                            Ext.Msg.alert("Please select atleast one field")
                        else
                        {
                        
                        search_val=name
                        Ext.getCmp('searchfield').destroy();
                        Ext.getCmp('spec_select').destroy();
                        Ext.getCmp('subspec_select').destroy();
                        Ext.getCmp('loc_select').destroy();


                        Ext.Ajax.request({

                            url: '/doctors/get_form_values',
                            method: 'POST',
                            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},


                            params: {
                                name: name,
                                location:loc,
                                specialty:spec,
                                subspecialty:subspec,
                                search_type:search_type,
                            },

                            callback: function(response) {
                                console.log(response.responseText);
                            }

                            });
                           
                        Ext.Viewport.setActiveItem({
                              xtype:'docnavigation'
                        });
                      Ext.getCmp('searchfield2').setValue(search_val);
                      st=Ext.getStore('DocByName');
                      st.load();

                }

            },
            
            showDate: function(sam)
            {
                    var d = new Date();
                    sam.setHtml(Ext.Date.format(d, 'l,  jS  F Y'));

            },

            

            showDetail: function(list,arg2,arg3,record)
            {

                    console.log("disclosed");
                    this.getDocnavigation().push({
                        xtype: 'docprofile',


                        title: record.fullname(),
                        data:record.getData(),
                        
                    
                    });
                    docfullname=record.fullname();
                    docdata=record.getData();
                    var backbtn=this.getBackbtn()
                    backbtn.hide();
                    var mapbtn=this.getMapbtn()
                    mapbtn.show();

            },



            namsearch: function(){

                search_type="name"
                    
            },

            locsearch: function(){

                search_type="location";

            
            },

            specsearch: function(){

                search_type="specialty"


            },








});
