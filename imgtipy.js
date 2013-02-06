/************************************/
/***** Image ToolTips Plugin ********/
/*
author: Marijo Mačinković
version: 0.0.1
*/
/************************************/

// Utility for older browsers
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {

	var Tipy = {
		init: function( options, elem ) {
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.parent = self.$elem.parent();
			self.$parent = $( self.$elem.parent() );

			self.coords = ( typeof options === 'string' )
				? options
				: options.coords;

			self.options = $.extend( {}, $.fn.imgTipy.options, options );

			self.$parent.css('position', 'relative');

			tips = self.getCoords( self.options.coords );
			self.$parent.append(tips);

			$('.tip').bind({
				mouseenter: function(){
			    	tipId = $(this).attr('id');
			    	$('.'+tipId).fadeIn();
			  	},
			  	mouseleave: function(){
			  		if($('.'+tipId).css('display')=='block'){
			  			$('.container-'+tipId).bind({
						  	mouseleave: function(){
						  		$('.'+tipId).fadeOut();
						  	}
			  			});
			  		}
			  	}
			});
/*
			$('.tip').hover(
			    function(){
			    	tipId = $(this).attr('id');
			    	$('.'+tipId).show();
			    },
			    function () {
			    	$('.'+tipId).hide();
			    }
			);
*/
		},
/***** TO DO: make display function and option to take an array of coordinates with content ***********/
		getCoords: function ( elem ) {
			self = this;
			self.elem = elem;
			self.$elem = $( elem );
			self.$elem.css('display', 'none');
			self.tips = self.$elem.find('li');
			tips = '';
			for (var i = 0; i <= self.tips.length - 1; i++) {
				var tip = $(self.tips[i]);
				var bottom = tip.attr('xAxis');
				var left = tip.attr('yAxis');
				var content = self.tips[i].innerHTML;
				tips+='<div class="container-tip-'+i+'">';
				tips+='<div id="tip-'+i+'" class="tip" style="left: '+left+'px; bottom: '+bottom+'px;"></div>';
				tips+='<div class="tip-content tip-'+i+'" style="left: '+(parseInt(left)+10)+'px; bottom: '+(parseInt(bottom)+10)+'px;">'+content+'</div>';
				tips+='</div>';
				console.log(top+' - '+bottom+' - '+content);
			};
			return tips;
		}
	};

	$.fn.imgTipy = function( options ) {

	  	return this.each(function() {
	  		var tipy = Object.create( Tipy );
	  		tipy.init( options, this);
	  	});

  	};

  	$.fn.imgTipy.options = {
  		coords: '#imgTipyCoords'
  	};

})( jQuery, window, document );