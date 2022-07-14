// api 
//not needed using state 
// const Api =(() => {

//     // get contacts method 
//     const getContact = () => {
//         // window.localStorage.getItem('contacts');
        
//         //check local storage 
//     if (localStorage['contacts'] === undefined) {
//         localStorage['contacts'] = '';
//         console.log('contacts');
//     } else {
//         const contactList =window.localStorage.getItem('contacts');
//     }
//     }

//     //set contacts method
//     const setContact = (contact) => {
//         window.localStorage.setItem('contacts', JSON.stringify(contact));
//     }
//     return {
//         setContact,
//         getContact,
//     };
// })();



//view - 

const View = (() => {
    const domstr = {
        table: '#summaryTable',
        tableBody: '#tablebody',
        form: '#form',
        addBtn: '#submit',
        inputName: '#name',
        inputMobile: '#mobile',
        inputEmail: '#email',
        error: '#error',
        inputSearch: '#search', 
        noResult: '#noResult'
    };
    
    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };
    
    const createTmp = (arr) => {
        let tmp = '';
        arr.forEach((contact) => {
            tmp += `
            <tr>
              <td>${contact.name}</td>
              <td>${contact.mobile}</td>
              <td>${contact.email}</td>
            </tr>
            `;
        });
        return tmp;
    };

    return {
        domstr, 
        render, 
        createTmp
    };
})();


// Model

const Model = ((view) => {
    class Contact {
        constructor(name, mobile, email) {
            this.name = name; 
            this.mobile = mobile; 
            this.email = email; 
        }
    }
    class State {
       contacts = [];

        getList() {
            return this.contacts;
        }
        setList(newcontactlist) {
            this.contacts = [...newcontactlist];

            const tableContacts = document.querySelector(view.domstr.tableBody);
            const tmp = view.createTmp(this.contacts);
            view.render(tableContacts, tmp);
        }
    }
    function validation() {
        const name
    }
    //valdation 
    // const validation = (name, mobile, email) => {
    //     if (name && name.length <= 20) {
    //         if(/\d/.test(name)){
    //             return false; 
    //         } else {
    //             return true;
    //         }
    //     }

    //     if (!mobile.toString().length === 10) {
    //         if (/\d/.test(mobile)) {
    //             return false;
    //         } else {
    //             return true; 
    //         }
    //     }

    //     if (email || (email.includes("@") || email.length < 40)){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };


    

    return { 
        Contact,
        State,
        // validation,
    };
})(View);




// controller

const Controller = ((model, view) => {
    const state = new model.State();

    //add contact

    const addContact = () => {
        const addBtn = document.querySelector(view.domstr.addBtn);
        const error = document.querySelector(view.domstr.error);
        const name = document.querySelector(view.domstr.inputName);
        const mobile = document.querySelector(view.domstr.inputMobile);
        const email = document.querySelector(view.domstr.inputEmail);
        const form = document.querySelector(view.domstr.form);

        addBtn.addEventListener('click', () => {
            if (model.validation(name.value, mobile.value, email.value)) {
                error.classList.add("dn");
                const newContact = new model.Contact(name.value, mobile.value, email.value);
                const contactsArr = [...state.contacts, newContact]; 
                state.setList(contactsArr);
                ClearInputFields();
            } else {
                error.classList.remove("dn");
            }
        });
        form.addEventListener('submit', (e) => {
        let messages = [];
        if (name.value === '' || name.value == null) {
            messages.push('Name is required');
        }
        if (messages.length > 0) {
            e.preventDefault();
            error.innerText = messages.join(',');
        }
    })

        const ClearInputFields = () => {
            name.value = "",
            mobile.value = "",
            email.value = ""
        }
    };

    
    const bootstrap = () => {
        // init();
        addContact();
    }

    return {
        bootstrap,
    };
})(Model, View);
Controller.bootstrap();