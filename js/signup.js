/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

function onReady () {
    var states = usStates;
    var signupForm = document.getElementById("signup");
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
    var signupForm = document.getElementById("signup");
    var other = signupForm.elements['occupationOther'];
    if (occupation.value == "other"){
        other.style.display = "block";
    }else {
        other.style.display = 'none';
    }
    return occupation;
}

function onSubmit (evt) {
    //var valid = true;
    //try {
    //    valid = validateForm(this);
    //}
    //catch(exception) {
    //    console.log(exception);
    //    valid = false;
    //}
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm (form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    if (occupation.value == 'other') {
        requiredFields.add(other);
    } else {

    }
    var idx;
    var formValid = true;
    for(idx = 0; idx < requiredFields.length; ++idx) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    var occupation = document.getElementById('occupation');
    var signupForm = document.getElementById("signup");
    var other = signupForm.elements['occupationOther'];

    if (!formValid) {
        var errMsg = document.getElementById('error-message');
        errMsg.innerHTML = 'YOU MUST FILL OUT REQUIRED FIELDS';
        errMsg.style.display = 'block';
    }
    return formValid;
}

function validateRequiredField(field) {
    var value = field.value.trim();
    var validVal = value.length > 0;
    if (validVal) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid'
    }
    return validVal;
}


document.addEventListener('DOMContentLoaded', onReady);