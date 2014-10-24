/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

function onReady() {
	var element = document.getElementById("state");
	var name = document.createElement("name");

	for (var i = 0; i < usStates.length; i++) {
		var option = document.createElement("option");
		name = usStates[i].name;
		option.value = usStates[i].code;
		var text = document.createTextNode(name);
		option.appendChild(text);
		element.appendChild(option);
	}
}



document.addEventListener('DOMContentLoaded', onReady);
