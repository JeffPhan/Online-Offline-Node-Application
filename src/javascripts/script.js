var getGeoLocation = function(elementToUpdate, button) {
	var locationInfo = function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var altitude = position.coords.altitude;

		var data = "Latitude: " + latitude + " Longitude: " + longitude + " Altitude: " + altitude;
		elementToUpdate.value = data;
	}

	var locationInfoError = function(error) {
	    var errorMessage = ['',
	    'Permission denied',
	    'Position unavailable',
	    'Timeout'];
	    elementToUpdate.value = errorMessage[error.code];
  	}

  	button.onclick = function() {
  		elementToUpdate.value = "Gathering data...please wait.";
		navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError);
	}
}

var checkWordCount = function(text, remaining) {
	var checkWords = function() {
		if(text.value.match(/\S+/g) == undefined) {
			words = 0;
		} else
	  		var words = text.value.match(/\S+/g).length;

	 	if(words > 300) {
	 		text.value = text.value.split(/\s+/, 300).join(" ") + " ";
	 		words--;
	 	}
	 	remaining.innerHTML = "Words left: " + (300 - words);
	}

 	text.onkeyup = function() {
 		checkWords();
 	}
}

var saveLocally = function(description, location, name, urgency, date) {
	var formCount = parseInt(localStorage.formCount) + 1 || 0;

	localStorage['description' + formCount] = description.value;
	localStorage['location' + formCount] = location.value;
	localStorage['name' + formCount] = name.value;
	localStorage['urgency' + formCount] = urgency.value;
	localStorage['date' + formCount] = date.value;
	localStorage.formCount = formCount;
	checkConnection();
}

var checkConnection = function() {
	var xhr = new XMLHttpRequest();
	var handler = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				if(localStorage.formCount != null) {
					console.log("Connected");
					xhr.open("POST", localStorage, true);
					xhr.send(JSON.stringify(localStorage));
					localStorage.clear();
					document.getElementById("job").reset();
				}
			} else
				console.log("Not Connected");
		}
		document.getElementById('location').disabled = "disabled";
		document.getElementById('date').valueAsDate = new Date();
	}
	xhr.onreadystatechange = handler;
	xhr.open("GET", "/project.txt");
	xhr.send();
}


function save() {
	saveLocally(document.getElementById('jobDescription'), document.getElementById('location'), document.getElementById('fullName'), document.getElementById('urgency'),document.getElementById('date'));
	return false;
}