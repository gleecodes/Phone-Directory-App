console.log("script.js")

const addBtn = document.getElementById('submit');
const contactSummary = document.getElementById('.contactSummary');
const name = document.getElementById('name');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');
const error = document.getElementById('error')

let ContactArray = [];


function Contact( name, mobile, email ) {
  
    this.name = name;
    this.mobile = mobile;
    this.email = email;
}

addBtn.addEventListener('click', () => {
    if ()
    const contact = new Contact(name.value, mobile.value, email.value);
    ContactArray.push(contact);
   
    localStorage.setItem('contact', JSON.stringify(ContactArray));
    console.log(ContactArray);
    ClearInputFields();
    

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

// search 

const search = () => {

}




































































// const getNumbers = (table, col) => {
//     var n = table.rows.length;
//     var i, s = null, tr, td;

//     if (col < 0) {
//         return null; 
//     }
//     for (i = 0; i < n; i++) {
//         tr = table.rows[i]; 
//         if (tr.cells.length > col) {
//             td = tr.cells[col];
//             s += '' + td;
//         }
//     }return s;
// }
// var mobielList = getNumbers('partTable', 1);
// console.log(mobileList);
 

//  get element by phone number


// function myFunction() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }


// const Search = () => {
//     var input, a, cellMobile, mobileVal, contact;  
//     input = document.getElementById("mobile");
//     for (i = 0; i< contact.mobile.length; i++) {
//         a = cellMobile.getElementByTagName("0")[0];
//         mobileVal = a.textContent  
//     }
// }

// const searchNumber = () => {
//     var mobile, table, cellMobile, i, mobileVal;
//     for (i = 0; i < table.column.length)
// }