/**
 * jQuery Textbox Hint Validation Plugin 1.0
 *
 * http://tim.tdaley.net
 *
 * Copyright (c) 2012 - 2012 Tim Daley
 * 
 * Requires the Validation plugin to use the Validation portion.
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function( $ ) {
    
    // Adding validator method.        
    jQuery.validator.addMethod(
        "hashint",
        function(value, element) 
        {
            return $(element).textboxhint('validate');
        },
        "Value cannot be the same as the hint."
    );
        
	var methods = {
	    init : function(options) {

            var defaults = {
	            text: '..Hint..',
	            cssclass: ''
            };
        	
	        var options = $.extend(defaults, options);

	        return this.each(function(){
	        
	            var $this = $(this),
	                data = $this.data('hint'),
	                hint = options.text;
        	
        	    // Set hint text for validation.
        	    if(!data) {
        	        $(this).data('hint',{
        	            text: options.text
        	        });
        	    }
        	    
        	    // Clear the hint when focused.
		        $(this).focus(function(){
			        if($(this).val() == options.text){
				        $(this).val('');
				        $(this).removeClass(options.cssclass);
			        }
		        });
        		
        		// If blank, repost the hint when focus is lost.
		        $(this).blur(function(){
			        if($(this).val() == ''){
				        $(this).val(options.text);
				        $(this).addClass(options.cssclass);
			        }
		        });
        		
        		// Set hint when initialized.
		        $(this).blur();
	        });
	    },
	    // Validates against the stored data hint.
	    validate : function()
	    {
	        if($(this).val() == $(this).data('hint').text)
	            return false;
	        else
	            return true;
	    },
	    // Cleanup.
        destroy : function() {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('hint');

                $(window).unbind('.hint');
                data.hint.remove();
                $this.removeData('hint');
            })
        }
	};
	
	// Method Manager
    $.fn.textboxhint = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jquery.textboxhint.validate' );
        }   
  };
})( jQuery );