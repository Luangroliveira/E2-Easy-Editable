// Easy Editable - E2

(function () {
    'use strict'
    var editable = function (myclass = 'e2') {
        if (!(this instanceof editable)) {
            return new editable(myclass);
        }
        this.class = myclass;
    }
    var contentItem = null;
    editable.fn = editable.prototype = {
        e2: function (params) {
            var input = [] = document.getElementsByClassName(this.class);
            for (let i = 0; i < input.length; i++) {
                enableEdit(input[i]);
                input[i].addEventListener("focusin", editOn);
                input[i].addEventListener("focusout", editOff);
                // var label = getlabel(input[i].id)
                // input[i].setAttribute('style', 'color: ' + params.icolor);
                // label.setAttribute('style', 'color: ' + params.lcolor);
                // var x = input[i].parentElement;
                // var btn = document.createElement("div");
                // btn.appendChild(label);
                // btn.appendChild(input[i]);
                // x.appendChild(btn);
            }

        }
    }
    window.editable = editable, window.$ = editable;
})();

function enableEdit(item) {
    if (!item.classList.contains("e2-editable")) {
        item.className += " e2-editable";
    }
    let parent = item.parentElement;
    let divAction = document.createElement("span");
    divAction.className = "e2-action";
    let editIcon = document.createElement("i");
    editIcon.className = "far fa-edit e2-icon e2-edit";
    divAction.appendChild(editIcon);
    parent.insertBefore(divAction, item.nextSibling);
    editIcon.addEventListener("mousedown", (event) => {
        event.preventDefault();
        item.focus();
    });
    item.addEventListener("focusin", editOn);
    item.addEventListener("focusout", editOff);
}

function editOn() {
    contentItem = this.value;
    this.className += " e2-editable-on";
    let parent = this.parentElement;
    parent.getElementsByClassName("e2-action")[0].remove();
    let divAction = document.createElement("span");
    divAction.className = "e2-action";
    divAction.appendChild(saveIcon(this));
    divAction.appendChild(calcelIcon(this));
    parent.insertBefore(divAction, this.nextSibling);
}

function editOff() {
    this.value = contentItem;
    contentItem = null;
    this.classList.remove("e2-editable-on");
    let parent = this.parentElement;
    parent.getElementsByClassName("e2-action")[0].remove();
    enableEdit(this);
}

function getlabel(input) {
    let labels = document.getElementsByTagName("label"),
        lookup = {},
        i, label;
    for (i = 0; i < labels.length; i++) {
        label = labels[i];
        if (document.getElementById(label.htmlFor)) {
            lookup[label.htmlFor] = label;
        }
    }
    return lookup[input];
}

function saveIcon(item) {
    let editOnIconSave = document.createElement("i");
    editOnIconSave.className = "far fa-save e2-icon e2-save";
    editOnIconSave.addEventListener("mousedown", (event) => {
        event.preventDefault();
        saveEdit(item);
    });
    return editOnIconSave;
}

function calcelIcon(item) {
    let editOnIconCancel = document.createElement("i");
    editOnIconCancel.className = "fas fa-times e2-icon e2-cancel";
    editOnIconCancel.addEventListener("mousedown", (event) => {
        event.preventDefault();
        cancelEdit(item);
    });
    return editOnIconCancel;
}

function lodingIcon() {
    let icon = document.createElement("i");
    icon.className = "fas fa-spinner e2-icon e2-loading";
    return icon;
}

function saveEdit(item) {
    contentItem = item.value;
    item.classList.remove("e2-editable-on");
    let parent = item.parentElement;
    parent.getElementsByClassName("e2-action")[0].remove();
    let divAction = document.createElement("span");
    divAction.className = "e2-action";
    divAction.appendChild(lodingIcon());
    parent.insertBefore(divAction, item.nextSibling);
    item.removeEventListener("focusin", editOn);
    item.removeEventListener("focusout", editOff);
    setTimeout(function () {
        finishedEdit(item, divAction);
    }, 3000);

}

function finishedEdit(item, div) {
    div.remove();
    item.classList.remove("e2-editable-on");
    enableEdit(item);
    item.blur();
}

function cancelEdit(item) {
    item.blur();
}