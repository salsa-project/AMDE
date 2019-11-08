enableEditMode();

//setting the body inside the iframe direction to rtl
const iframe = document.getElementById('myframe1');
iframe.contentWindow.document.body.style.direction = "rtl";

var showingSourceCode = false;
var isInEditMode = true;

function enableEditMode() {
  richTextField.document.designMode = 'On';
}

function execCmd(command) {
  richTextField.document.execCommand(command, false, null)
}

function execCommandWithArg(command, arg) {
  richTextField.document.execCommand(command, false, arg)
}

function toggleSource() {
  if (showingSourceCode) {
    richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document.getElementsByTagName('body')[0].textContent;
    showingSourceCode = false;
  } else {
    richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document.getElementsByTagName('body')[0].innerHTML;
    showingSourceCode = true;
  }
}

function toggleEdit() {
  if (isInEditMode) {
    richTextField.document.designMode = 'Off';
    isInEditMode = false;
  } else {
    richTextField.document.designMode = 'On';
    isInEditMode = true;
  }
}

//link css file to the iframe
window.onload = function() {
  let link = document.createElement("link");
  link.href = "/resources/css/style-iframe.css";
  link.rel = "stylesheet";
  link.type = "text/css";
  iframe.contentWindow.document.head.appendChild(link);
}

const btns = document.getElementsByTagName('button');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    iframe.contentWindow.document.body.focus();
  })
}

const editView = document.getElementById('edit-view');
let toggle = false;
editView.addEventListener('click', function() {
  if (toggle) {
    toggle = false;
    editView.style = `background: white; color: black;`;
    editView.textContent = "تعديل";
  } else {
    toggle = true;
    editView.style = `background: black; color: white;`;
    editView.textContent = "معاينة";
  }
})
