

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



Ext.define('uabmob.store.subSpecialty', {
    extend: 'Ext.data.Store',
    requires: [
        'uabmob.model.Doctor'
    ],

    config: {
        autoLoad: true,
        model: 'uabmob.model.Doctor',
        storeId: 'subspecialty',
        sorters: ['related_subspecialty'],
        

        proxy: {
            type: 'rest',
            url: '/doctors/subspecialty',

            format: 'json'

        }
    }


});