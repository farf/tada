// All events for UI
$(document).ready(function() {

    CKEDITOR.on( 'instanceCreated', function( event ) {
        var editor = event.editor,
        element = editor.element;

        if ( element.is('h2')) {
           
            editor.on( 'configLoaded', function() {

                // Remove unnecessary plugins to make the editor simpler.
                editor.config.removePlugins = 'colorbutton,find,flash,font,' +
                'forms,iframe,image,newpage,removeformat,scayt,' +
                'smiley,specialchar,stylescombo,templates,wsc';

                // Remove the toolbar.
                editor.config.toolbarGroups = [];
                editor.config.toolbar = 'Custom'; //makes all editors use this toolbar
                editor.config.toolbar_Custom = []; //define an empty array or whatever buttons you want.
                editor.toolbarStartupExpanded = false;
                editor.toolbarCanCollapse  = false;
                editor.fillEmptyBlocks = false; 
            
            });

        } else if (element.is( 'div' )) {
            editor.on( 'configLoaded', function() {

                // Remove unnecessary plugins to make the editor simpler.
                editor.config.removePlugins = 'colorbutton,find,flash,font,' +
                'forms,iframe,image,newpage,removeformat,scayt,' +
                'smiley,specialchar,stylescombo,templates,wsc';

                // Rearrange the layout of the toolbar.
                editor.config.toolbarGroups = [
                
                { name: 'editing',              groups: [ 'basicstyles', 'links' ] }

                ];

                editor.config.floatSpaceDockedOffsetY = 69; //68
                editor.config.floatSpaceDockedOffsetX = -10;
                //editor.config.skin = 'tada,/skins/tada/';
                //console.log('tada,/skins/tada/');
            });
        }
    });


    CKEDITOR.on('dialogDefinition', function(e) {
        var dd = e.data.definition, // NOTE: this is an instance of CKEDITOR.dialog.definitionObject, not CKEDITOR.dialog.definition
            tabInfo;

        if (e.data.name === 'link') {
            dd.removeContents('advanced');
            dd.removeContents('target');

            tabInfo = dd.getContents('info');
            tabInfo.remove('url');
            tabInfo.remove('linkType');
            tabInfo.remove('browse');
            tabInfo.remove('protocol');

            tabInfo.add({
                type : 'text',
                id : 'urlNew',
                label : 'URL',
                setup : function(data)
                {
                    if (typeof(data.url) !== 'undefined')
                    {
                        this.setValue(data.url.url);
                    }
                },
                commit : function(data)
                {
                    data.url = { url: this.getValue() };
                }
            });

            tabInfo.add({
                type : 'checkbox',
                id : 'newPage',
                label : 'Open link in a new page',
                commit : function(data)
                {
                    if (this.getValue())
                    {
                        data.target = '_blank';
                    }
                    return data;
                }
            });
        }
    });
});