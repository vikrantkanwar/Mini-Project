function validate() {
	let x = document.forms["myForm"]["name"].value;
	let y = document.forms["myForm"]["mob"].value;
	let z = document.forms["myForm"]["email"].value;

	if (x == "") {
		alert("Please provide your name!");
		return false;
	}
	if (y == "") {
		alert("Please provide your Mobile Number!");
		return false;
	}

	if (z == "") {
		alert("Please provide your Email!");
		return false;
	}

	let a = validateEmailDomain(z);

	if (a === false) {
		alert("Please provide a valid email");
		return false;
	}

	return true;
}

function validateEmailDomain(str) {

	var legalDomains = {
		"-gmail.com": true,
		"-hotmail.com": true,
	};

	var matches = str.match(/@(.*)$/);
	if (matches) {
		// matches[1] is the part after the @ sign in the email address
		if ("-" + matches[1] in legalDomains) {
			// found the domain in the permitted list
			return true;
		}
	}
	return false;
}

let selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["mob"] = document.getElementById("mob").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("tablelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.mob;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onDelete(this)" class="link" >Delete</a>`;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.mob;
    selectedRow.cells[2].innerHTML = formData.email;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("mob").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("mob").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

function onDelete(td) {
    row = td.parentElement.parentElement;
    document.getElementById("tablelist").deleteRow(row.rowIndex);
    resetForm();
}

