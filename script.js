function markAsDone() {
    const divId = this.parentNode.id;

    const stepCount = document.querySelectorAll('.done-button').length;

    console.log(divId + " " + stepCount);
    if (parseInt(divId) + 1 < stepCount) {
        localStorage.setItem("current-item", parseInt(divId) + 1);
    } else {
        window.location.href = "done.html";
    }

    styleAll();
}

function markAsNotDone() {
    const divId = this.parentNode.id;

    localStorage.setItem("current-item", parseInt(divId));

    styleAll();
}

function styleAsDone(divId) {
    document.getElementById(divId).classList.remove('unfinished-step');
    document.getElementById(divId).classList.remove('current-step');

    document.getElementById(divId).classList.add('finished-step');

    var allButtons = document.querySelectorAll('.done-button');
    const buttonId = divId;
    allButtons[buttonId].removeEventListener('click', markAsDone);
    allButtons[buttonId].addEventListener('click', markAsNotDone);
    allButtons[buttonId].textContent = "Done";
}

function styleAsCurrent(divId) {
    document.getElementById(divId).classList.remove('unfinished-step');
    document.getElementById(divId).classList.remove('finished-step');

    document.getElementById(divId).classList.add('current-step');

    var allButtons = document.querySelectorAll('.done-button');
    const buttonId = divId;
    allButtons[buttonId].addEventListener('click', markAsDone);
    allButtons[buttonId].removeEventListener('click', markAsNotDone);
    allButtons[buttonId].textContent = "Finish!";
}

function styleAsNotDone(divId) {
    document.getElementById(divId).classList.remove('finished-step');
    document.getElementById(divId).classList.remove('current-step');

    document.getElementById(divId).classList.add('unfinished-step');

    var allButtons = document.querySelectorAll('.done-button');
    const buttonId = divId;
    allButtons[buttonId].addEventListener('click', markAsDone);
    allButtons[buttonId].removeEventListener('click', markAsNotDone);
    allButtons[buttonId].textContent = "Not done";
}

function styleAll() {
    var allButtons = document.querySelectorAll('.done-button');

    const currentItem = localStorage.getItem("current-item");

    for (var i = 0; i < allButtons.length; i++) {
        if (i < currentItem) {
            styleAsDone(i);
        }
        else if (i == currentItem) {
            styleAsCurrent(i);
        }
        else if (i > currentItem) {
            styleAsNotDone(i);
        }
    }
}

function checkboxChanged() {
    const divId = this.parentNode.parentNode.parentNode.id;
    const checkboxes = document.getElementById(divId).querySelectorAll('.subtask-checkbox');

    states = []
    for (var i = 0; i < checkboxes.length; i++) {
        states.push(checkboxes[i].checked);
    }

    localStorage.setItem("step-" + divId + "-checkboxes", states);
}