Ext.define('uabmob.view.mapDisplay', {
    extend: 'Ext.Map',
    xtype: 'mapDisplay',

    config: {
        title: 'Address',
        mapOptions : {

                //center : new google.maps.LatLng(3.381592, -122.135672),  
                zoom : 40,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                zoomControl:true,

                zoomControlOptions: {
                      style:google.maps.ZoomControlStyle.DEFAULT
                    },
                
                },


                
        
       /* items:[
        {
            xtype:'map',
            useCurrentLocation: true,   

        },
        ]*/



    }
});