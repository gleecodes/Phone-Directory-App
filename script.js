

const addBtn = document.getElementById('submit');
const contactSummary = document.getElementById('.contactSummary');


const name = document.getElementById('name');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');

let ContactArray = [];
let id = 0;

function Contact(id, name, mobile, email) {
    this.id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
}



addBtn.addEventListener('click', function() {
    const contact = new Contact(id, name.value, mobile.value, email.value);
    ContactArray.push(contact);
    // console.log(contact)
    localStorage.setItem('contact', JSON.stringify(ContactArray));
    ClearInputFields();

    
    console.log(contact);
var table = document.getElementById("summaryTable");
var row = table.insertRow(1);
var cellName = row.insertCell(0);
var cellMobile = row.insertCell(1);
var cellEmail = row.insertCell(2);

cellName.innerHTML = `${contact.name}`;
cellMobile.innerHTML = `${contact.mobile}`;
cellEmail.innerHTML = `${contact.email}`;
});

const ClearInputFields = () => {
    name.value = "",
    mobile.value = "",
    email.value = ""
}

//  get element by phone number






