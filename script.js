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
	res = JSON.parse(httpGet($("#searchData").val()));
	$("#resultRow").empty()
	$("#resultRow").append("<td>" + res.name + "</td>");
	$("#resultRow").append("<td>" + res.number + "</td>");
	$("#resultRow").append("<td>" + res.ip + "</td>");
	$("#resultRow").append("<td>" + res.waze + "</td>");
	$("#resultRow").append("<td>" + res.lineNum + "</td>");
	$("#resultRow").append("<td>" + res.simNum + "</td>");
	$("#resultRow").append("<td>" + res.modemNum + "</td>");
	$("#resultRow").append("<td>" + res.bandwidth + "</td>");
	$("#resultRow").append("<td id='actions'><button onclick=myDelete(" + res.id + ")>מחק</button><button onclick=update(" + res.id + ")>עדכן</button></td>");
}
function myDelete(id) {
	$.ajax({
		type: "DELETE",
		url: 'http://localhost:3000/deleteSite',
		data: $("#addPlaceForm").serialize(), // serializes the form's elements.
		success: function (data) {
			// alert(data); // show response from the php script.
		}
	});
}
function myUpdate(id) {
	// $("#formTitle").text("ערוך אתר בנייה");
	$.ajax({
		type: "POST",
		url: 'http://localhost:3000/updateSite',
		data: $("#addPlaceForm").serialize(), // serializes the form's elements.
		success: function (data) {
			// alert(data); // show response from the php script.
		}
	});
}
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
			// alert(data); // show response from the php script.
		}
	});
	return false
});