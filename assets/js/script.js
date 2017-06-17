var keyevents = true;

function openModal(response) {
	$('#url').blur();
	$('#url').val("");
	$('#urlmin input').val(response.minurl);
	$('#original-url').attr('href', response.url);
	$('#original-url').text(response.url);
	$('#url-modal').modal();
}

$(document).ready(function() {
	$('#url').focus();
	$('form').on('submit', function(e) {
		e.preventDefault();
		if(keyevents)
		{
			keyevents = !keyevents;
			$.ajax({
				url: '/',
				method: 'POST',
				data: {'url': $('#url').val() },
				success: function(response) {
					openModal(response);
				},
				error: function(response) {
					alert(response);
				}
			});
		}
	});

	$('#copy').on('click', function() {
		$('#urlmin input').select();
		document.execCommand("copy");
		$('#copy').text('Copied!');
		$("#copy").css("pointer-events", "none");
	});

	$('.modal-close, .close').on('click', function() {
		$('#url').focus();
		keyevents = !keyevents;
		$('#copy').text('Copy');
		$("#copy").css("pointer-events", "auto");
		$('#url').focus();
	});
});