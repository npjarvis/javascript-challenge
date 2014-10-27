/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
var signupForm = document.getElementById("signup");

function onReady () {
    var stateSelect = signupForm.elements["state"];
    var idx;
    var option;

    for (idx=0; idx<usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        stateSelect.appendChild(option);
    }

    document.addEventListener('change', otherOccupation);
    signupForm.addEventListener('submit', onSubmit);
    var noThanks = document.getElementById('cancelButton');
    noThanks.addEventListener('click', function (){
       if(window.confirm('Are you really sure you want to leave my awesome page?')){
           window.location = "http://google.com"
       }
    });
}

function otherOccupation () {
    var occupation = document.getElementById('occupation');
    var other = signupForm.elements['occupationOther'];
    if (occupation.value == "other"){
        other.style.display = "block";
        requiredFields.push('occupationOther');
        console.log(requiredFields);
    }else {
        other.style.display = 'none';
    }
    return occupation;
}

function onSubmit (evt) {
    var valid = true;
    try {
        valid = validateForm(this);
    }
    catch(err) {
        displayError(err, true);
        valid = false; //stop form submission to see error
    }

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid; //for older browsers
    return valid;
}

function validateForm (form) {
    var index;
    var formValid = true;
    for(index = 0; index < requiredFields.length; ++index) {
        formValid &= validateRequiredField(form.elements[requiredFields[index]]);
    }
    var input = form.elements['birthdate'].value;
    console.log(input);
    var age = calculateAge(form.elements['birthdate'].value);
    if (age < 13) {
        throw new Error('You must be 13 to complete application');
    }
    return formValid;
}

function calculateAge (dob) {
    var today = new Date();
    var datebirth = new Date(dob);
    var yearsDiff = today.getFullYear() - datebirth.getUTCFullYear();
    var monthDiff = today.getMonth() - datebirth.getUTCMonth();
    var daysDiff = today.getDay() - datebirth.getUTCDay();

    if (monthDiff < 0 || (0 === monthDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    console.log(yearsDiff);
    return yearsDiff;

}

function validateRequiredField(field) {
    var value = field.value.trim();
    var zipRegExp = new RegExp('^\\d{5}$');
    var validVal = value.length > 0;
    if (field.name === 'zip') {
        validVal = zipRegExp.test(field.value);
    }

    if (validVal) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid';
    }

    return validVal;
}

function displayError(error) {
    displayMessage(error, true);
}

function displayMessage(message, isError) {
    var msgElem = document.getElementById('birthdateMessage');
    msgElem.innerHTML = message;
    // read as a combo of if/then statement and an assignment in one line; assign the following value to classname,
    // if yes alert alert-danger, else alert alert-success
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success';
    msgElem.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', onReady);