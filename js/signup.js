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

    var noThanks = document.getElementById('cancelButton');

    document.addEventListener('change', otherOccupation);
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

function validateForm () {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
}




document.addEventListener('DOMContentLoaded', onReady);