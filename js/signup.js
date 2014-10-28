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

	var occupation = document.getElementById('occupation');
	occupation.addEventListener('change', validateOccupation);

	var cancel = document.getElementById('cancelButton');
	cancel.addEventListener('click', confirmCancel);

	var personForm = document.getElementById('signup');
	personForm.addEventListener('submit', onSubmit);
}


function onSubmit(evt){
	var valid = validateForm(this);

	if (!valid && evt.preventDefault){
		evt.preventDefault();
	}


	evt.returnValue = valid;
	return valid;
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate']
	var index;
	var valid = true;

	for (index = 0; index < requiredFields.length; index++) {
		valid &= validateRequiredFields(requiredFields[index], form);
	}

	valid &= validateBirthday(form);
	valid &= validateZip(form);

	return valid;
}


function validateRequiredFields(field, form) {

	if (0 == form[field].value.trim().length){
		form[field].className = 'invalid-field form-control';
		if (form['birthdate']){
			document.getElementById("birthdateMessage").innerHTML = "Please put a valid birthdate.";
		}
		return false;
	} else {
		form[field].className = 'form-control';
		return true;
	}
}


function validateBirthday(form){

	var age = calculateAge();

	if (age < 13){
		form['birthdate'].className = 'invalid-field form-control';
		document.getElementById("birthdateMessage").innerHTML = "You must be 13 years or older to sign up.";
		return false;
	} else {
		form['birthdate'].className = 'form-control';
		return true;
	}
}

function calculateAge() {
	var birthday = document.getElementById('birthdate').value;
	birthday = Date.parse(birthday);

	var todaysDate = new Date();
	todaysDate = Date.parse(todaysDate);

	var minutes = 1000 * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var years = days * 365;

	var age = Math.round(todaysDate/years) - Math.round(birthday/years);

	return age;
}


function validateZip(form){
	var zipcode = document.getElementById('zip').value;
	var zipRegExp = new RegExp('^\\d{5}$');
	var result = zipRegExp.test(zipcode);

	if (!result){
		form['zip'].className = 'invalid-field form-control';
		return false;
	} else {
		form['zip'].className = 'form-control';
		return true;
	}

}

function validateOccupation(){
	var occupation = document.getElementById('occupation').value;

	if (occupation == 'other'){
		document.getElementById('occupationOther').style.display = "block";
	}

}

function confirmCancel() {
	var cancel = document.getElementById('cancelButton');
	cancel.addEventListener('click');

	var con = confirm("Are you sure?");

	if (con == true){
		location.replace("http://www.google.com");
	}
}


document.addEventListener('DOMContentLoaded', onReady);
