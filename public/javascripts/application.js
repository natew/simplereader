$(function() {
	cur = 0;
	activePost = $('#posts .post:first');
	skip = 0;
	modalOpen = false;
	
	// Get browser size
	set_skip();
	
	// Set active post
	set_active_post(activePost);
	
	// Flash
	$('object').hide().after('<a class="show_flash" href="#">Watch flash video &oplus;</a>');
	$('a.show_flash').click(function(){
		$('#overlay').show();
		$('#post_modal').html( $(this).prev('object').show() ).show();
		return false;
	});
	
	// Zoom posts
	$('a.zoom').click(function(){
	  set_active_post($(this).parent().parent().parent());
		open_modal();
		return false;
	});
	
	// Select post
	$('.post').click(function() {
	  set_active_post($(this));
	}).dblclick(function() {
	  open_modal();
	});
	
	// Close modal
	$('#overlay').click(function(){ close_modal() });
	
});

// Detect browser changed
$(window).resize(function() {
  set_skip();
});

// Key-bindings
$(document).keydown(function(e) {
  switch(e.keyCode) {
    // Enter
    case 13:
      if (openModal) close_modal();
      else open_modal();
      break;
    // Escape
    case 27:
      close_modal();
      break;
    // K, Left arrow
    case 75: case 37:
      prev_post();
      break;
    // J, Right arrow, spacebar
    case 74: case 39: case 32: case 91:
      next_post();
      return false;
      break;
    // Down
    case 40:
      down_post();
      return false;
      break;
    // Up
    case 38:
      up_post();
      return false;
      break;
  }
  console.log(e.keyCode);
});

function active_index() {
  return parseInt(activePost.attr('id').substr(5,6),10);
}

function set_skip() {
  var width = $(window).width();
  if (width > 1280) skip = 4
  else if (width > 980) skip = 3;
  else if (width > 768) skip = 2;
  else skip = 1;
}

function down_post() {
  set_active_post($('#post-'+(active_index()+skip)));
}

function up_post() {
  set_active_post($('#post-'+(active_index()-skip)));
}

function prev_post() {
  if (activePost.prev().length > 0) set_active_post(activePost.prev());
}

function next_post() {
  if (activePost.next().length > 0) set_active_post(activePost.next());
}

function set_active_post(post) {
  if (post.length > 0) {
    activePost.removeClass('active')
    post.addClass('active');
    activePost = post;
    if (activePost.offset().top+288 > $(window).height()+$(window).scrollTop() ||
      (activePost.offset().top+188) < $(window).scrollTop() ) {
        $(window).scrollTop(activePost.offset().top-100);
    }
    set_modal_contents();
  }
}

function open_modal() {
  $('#overlay').show();
  set_modal_contents();
	$('#post_modal').show();
	$('#post_modal').find('.toggle_full,.zoom').remove();
	$('#post_modal img').each(function(){ $(this).removeAttr('style'); resizeImage( this, 780 ); });
	modalOpen = true;
}

function set_modal_contents() {
  $('#post_modal').html( activePost.html() )
}

function close_modal() {
  $('#overlay,#post_modal').hide();
  modalOpen = false;
}

function resize_image( image, maxWidth ) {
	var $this = $(image);
	if ( $this.width() > maxWidth ) {
		newHeight = $this.height() / ( $this.width() / maxWidth ); 
		$this.height(newHeight).width(maxWidth);
	}
}

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}