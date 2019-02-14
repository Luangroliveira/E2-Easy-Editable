// Easy Editable - E2

(function () {
    'use strict'
    var editable = function (myclass = 'e2') {
        if (!(this instanceof editable)) {
            return new editable(myclass);
        }
        this.class = myclass;
    }
    editable.fn = editable.prototype = {
        e2: function (params) {
            var input = [] = document.getElementsByClassName(this.class);
            for (var i = 0; i < input.length; i++) {
                input[i].addEventListener("focusin", onEdit);
                input[i].addEventListener("focusout", offEdit);
                enableEdit(input[i]);
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

function saveIcon() {
    var onEditIconSave = document.createElement("i");
    onEditIconSave.className = "far fa-save e2-icon";
    return onEditIconSave;
}

function calcelIcon() {
    var onEditIconCancel = document.createElement("i");
    onEditIconCancel.className = "fas fa-times e2-icon";
    return onEditIconCancel;
}

function enableEdit(item) {
    item.className += " e2-editable";
    var parent = item.parentElement;
    var divAction = document.createElement("span");
    divAction.className = "e2-action";
    var editIcon = document.createElement("i");
    editIcon.className = "far fa-edit e2-icon";
    divAction.appendChild(editIcon);
    parent.insertBefore(divAction, item);
}

function onEdit() {
    this.className += " e2-editable-on";
    var parent = this.parentElement;
    parent.getElementsByClassName("e2-action")[0].remove();
    var divAction = document.createElement("span");
    divAction.className = "e2-action";
    divAction.appendChild(saveIcon());
    divAction.appendChild(calcelIcon());
    parent.insertBefore(divAction, this);
}

function offEdit() {
    this.classList.remove("e2-editable-on");
    var parent = this.parentElement;
    parent.getElementsByClassName("e2-action")[0].remove();
    enableEdit(this);
}

function getlabel(input) {
    var labels = document.getElementsByTagName("LABEL"),
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