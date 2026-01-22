jQuery(document).ready(function ($) {
	$('#sfp-feedback-form').on('submit', function (e) {
		e.preventDefault();

		var formData = {
			action: 'sfp_submit_feedback',
			nonce: sfp_ajax.nonce,
			name: $('input[name="name"]').val(),
			email: $('input[name="email"]').val(),
			message: $('textarea[name="message"]').val(),
		};

		$.ajax({
			url: sfp_ajax.ajax_url,
			type: 'POST',
			data: formData,
			beforeSend: function () {
				$('#sfp-response').html('Sending...');
			},
			success: function (response) {
				if (response.success) {
					$('#sfp-response').html(
						'<p style="color:green;">' + response.data.message + '</p>'
					);
					$('#sfp-feedback-form')[0].reset();
				}
			},
			error: function () {
				$('#sfp-response').html(
					'<p style="color:red;">Something went wrong.</p>'
				);
			}
		});
	});
});
