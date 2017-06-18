var keyevents = true, pending = false;

function openModal(response) {
	pending = !pending;
	$('#url').val("");
	$('#url').blur();
	$('#urlmin input').val(response.minurl);
	$('#original-url').attr('href', response.url);
	$('#original-url').text(response.url);
	$('#url-modal').modal();
}

$(document).ready(function() {
	$('#url').focus();
	$('form').on('submit', function(e) {
		e.preventDefault();
		$('#loader').show();
		if(keyevents && !pending)
		{
			pending = !pending;
			keyevents = !keyevents;
			$.ajax({
				url: '/',
				method: 'POST',
				data: {'url': $('#url').val() },
				success: function(response) {
					$('#loader').hide();
					openModal(response);
				},
				error: function(response) {
					$('#loader').hide();
					pending = !pending;
					alert('Internal Server Error');
				}
			});
		}
	});

	$('#copy').on('click', function() {
		$('#urlmin input').select();
		document.execCommand("copy");
	});

	$('.modal-close, .close').on('click', function() {
		$('#url').focus();
		keyevents = !keyevents;
	});
});