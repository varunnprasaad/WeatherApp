var APPID = "f5993c4375ec66fc5db402c625fc999a";
	

$(document).ready(function($) {
	refresh("dallas");
});


function results(){
	var key = $("#query").val();
	if(key == ""){}
		else{
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?q="+key+"&type=accurate&mode=json&units=metrics&appid="+APPID,
				type: 'GET',
				dataType: 'json',
			})
			.done(function(data) {
				console.log(data['name']);
				console.log(data.sys.country);
				console.log();

			})
			.fail(function() {
				console.log("error");
			});
		}
	return false;
	
}


$("#send").click(function(event) {
	var q = $("#query").val();

	if(q == ""){
		alert("Please input the city name")
	}
	refresh(q);

	return false;
});


function ktoc(t){
return (t-273.15).toPrecision(2);;
}
function windtomph(wind){
	return (2.236936*wind).toPrecision(2);
}

function refresh(q){
	var country = $("#country").val();
var path = "http://api.openweathermap.org/data/2.5/weather?q="+q+"&type=accurate&mode=json&units=metrics&appid="+APPID;
	$.get(path, function(data) {
		var temp = ktoc(data.main.temp);
		var icon = data.weather[0].icon;
		

		$("#temp").text(temp);
		$("#tempunit").html("&deg;C");
		$("#city").text(data['name']+", "+data.sys.country);
		$("img").attr("src", "http://openweathermap.org/img/w/"+icon+".png"); 
		$(".icon-desc").text(data.weather[0].description);
		$("#humidity").text("Humidity: "+data.main.humidity+"%");
		$("#wind").text("Wind: "+data.wind.speed.toPrecision(2)+"mph");
		

		// console.log("Temparature: "+temp+"C");
		// console.log(data['name']);
		// console.log(data.sys.country);	
		// console.log("Humidity: "+data.main.humidity)+"%";
		// console.log("Wind: "+windtomph(data.wind.speed)+"kmph");
		// console.log(data);

	});
}