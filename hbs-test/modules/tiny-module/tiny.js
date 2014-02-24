define(['jquery', 'hbs!./random-list-item.partial'], function($, randomListItemTemplate) {
	$(document).ready(function() {
		$('#add-to-list').on('click', function() {
			$('#random-list').append(randomListItemTemplate("Lorem Ipsum"));
		});
	});
});