/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
var signupForm = document.getElementById("signup");

function onReady () {
    var states = usStates;
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
        console.log(err);
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

    return formValid;
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


document.addEventListener('DOMContentLoaded', onReady);