/**
 * jQuery Truncate Width Plugin 1.0
 * Copyright(c) 2013 Tim Daley
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

/*jslint plusplus: true */
/*global $, jQuery*/
/*properties
    after, class, css, display, each, extend, find, fn, html, length, substr, 
    text, trim, whiteSpace, width, widthTruncate, wrapInner
*/

(function($) {
	"use strict";

	$.fn.truncateWidth = function(options) {

		var settings = {
			width : 'auto',
			after : '...'
		};
		
		options = $.extend(settings, options);

		return this.each(function() {
			var truncate_width, i, $wrapper;

			if (options.width === 'auto') {
				truncate_width = $(this).width() - 8;
			} else {
				truncate_width = options.width;
			}
			
			$wrapper = $(this).wrapInner('<span/>', {
				'class' : 'truncate-wrapper'
			}).find('span');

			if ($wrapper.width() > truncate_width) {
				var current_text = $(this).text();
				$wrapper.text(options.after);
				i = 1;

				while ($wrapper.width() < truncate_width && i < current_text.length) {
					$wrapper.text(current_text.substr(0, i).trim() + options.after);
					i++;
				}
				$(this).html($wrapper.html());
			}
		});

	};
}(jQuery));