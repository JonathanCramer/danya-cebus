function httpGet(site) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'http://localhost:3000/getSite/' + site, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
$('#resultTable').hide();
$("#searchData").on('keypress', function (e) {
	if (e.which == 13) {
		showResult();
	}
});

function showResult() {
	$('#resultTable').css('display', 'flex');
	response = JSON.parse(httpGet($("#searchData").val()));
	$(".data").empty()
	$(function () {
		$.each(response, function (i, item) {
			var $tr = $('<tr class="data">').append(
				$('<td>').text(item.name),
				$('<td>').text(item.projectNum),
				$('<td>').text(item.ip),
				$('<td>').text(item.waze),
				$('<td>').text(item.lineNum),
				$('<td>').text(item.simNum),
				$('<td>').text(item.modemNum),
				$('<td>').text(item.bandwidth),
				$("<td id='actions'><button onclick=myDelete(" + item.id + ")>מחק</button>"), //<button onclick=myUpdate(" + item.id + ")>עדכן</button></td>
			).appendTo('#resultData');
		});
	});
}
function myDelete(id) {
	$.ajax({
		type: "DELETE",
		url: 'http://localhost:3000/deleteSite/' + id,
		data: $("#addPlaceForm").serialize(), // serializes the form's elements.
		success: function (data) {
			// alert(data); // show response from the php script.
		}
	});
}
// function myUpdate(id) {
// 	// $("#formTitle").text("ערוך אתר בנייה");
// 	$.ajax({
// 		type: "POST",
// 		url: 'http://localhost:3000/updateSite',
// 		data: $("#addPlaceForm").serialize(), // serializes the form's elements.
// 		success: function (data) {
// 			// alert(data); // show response from the php script.
// 		}
// 	});
// }
$("#showForm").click(function (e) {
	e.preventDefault();
	$("#formParent").show();
});

$("#addPlaceForm").submit(function (e) {

	console.log($("#addPlaceForm").serialize());
	$.ajax({
		type: "POST",
		url: 'http://localhost:3000/createSite',
		data: $("#addPlaceForm").serialize(), // serializes the form's elements.
		success: function (data) {
			$('#addPlaceForm').trigger("reset");
			// alert(data); // show response from the php script.
		}
	});
	return false
});