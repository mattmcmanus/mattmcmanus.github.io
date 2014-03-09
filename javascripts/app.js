// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var parallax = document.getElementsByClassName('background-image')[0];
var foreground = $('#header .row')

window.onscroll = function(e) {
  if (window.scrollY < 500) {
    // note: most browsers presently use prefixes: webkitTransform, mozTransform etc.
    var translate3d = 'translate3d(0px,' + (window.scrollY/2) + 'px, 0px)';
    parallax.style.webkitTransform = translate3d;
    parallax.style.transform = translate3d;
    foreground.each(function(x,f){
      f.style.opacity = 1-(window.scrollY*.005);
    })
  }
}
