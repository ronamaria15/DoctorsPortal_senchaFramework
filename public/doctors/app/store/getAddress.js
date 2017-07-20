//This is overiding the function in the sencha touch to avoid the error"uncaught typeerror cannot read property 'readystate' of undefined ""

Ext.define('OverrideConnection', {
        override: 'Ext.data.Connection',
        onStateChange : function(request) {
        if (request && request.xhr && request.xhr.readyState == 4) {
        this.clearTimeout(request);
        this.onComplete(request);
        this.cleanup(request);
        }
        }
});
//abv not alwz necessary



Ext.define('uabmob.store.getAddress', {
    extend: 'Ext.data.Store',
    requires: [
        'uabmob.model.contentType'
    ],

    config: {
        autoLoad: true,
        model: 'uabmob.model.contentType',
        storeId: 'getaddress',
        
        

        proxy: {
            type: 'rest',
            url: '/contentType/get_address',
            format: 'json',



        }
    }


});