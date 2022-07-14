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
        noResult: '#noResult',
        names: '#nameColumn'
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
    const sortArr = (arr, order) => {
        if (order === "ascending") {
          arr.sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            }
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            }
            return 0;
          });
        } else if (order === "desending") {
          arr.sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return -1;
            }
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return 1;
            }
            return 0;
          });
        }
        return arr;
      };
    
  

    return { 
        Contact,
        State,
        sortArr
        // validation,
    };
})(View);




// controller

const Controller = ((model, view) => {
    const state = new model.State();

    const sortedArr = [];
   
    //add contact

    const addContact = () => {
        const addBtn = document.querySelector(view.domstr.addBtn);
        const error = document.querySelector(view.domstr.error);
        const name = document.querySelector(view.domstr.inputName);
        const mobile = document.querySelector(view.domstr.inputMobile);
        const email = document.querySelector(view.domstr.inputEmail);
        // const form = document.querySelector(view.domstr.form);

        const isValid = (name, mobile, email) => {
            const nameCheck = (name) => (nameReg.test(name)) ;
            const mobileCheck = (mobile) => (mobileReg.test(mobile)) ;
            const emailCheck = (email) => (emailReg.test(email)) ;
            
            const nameReg = /^[a-zA-Z ]*$/ ;
            const mobileReg = /^[0-9]*$/ ;
            const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ ;

            return nameCheck(name) && mobileCheck(mobile) && emailCheck(email);
            
        }

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isValid(name.value, mobile.value, email.value)) {
                error.classList.add('dn');
                const newContact = new model.Contact(name.value, mobile.value, email.value);
                const contactsArr = [...state.contacts, newContact]; 
                // contactsArr.push(newContact)
                state.setList(contactsArr);
               

                ClearInputFields();
            } else {
                error.classList.remove('dn');
            }
            
        });
        
      
        const ClearInputFields = () => {
            name.value = "",
            mobile.value = "",
            email.value = ""
        }
    }
    const sortName = () => {
        const names = document.querySelector(view.domstr.names)

        names.addEventListener("click", (e) => {
            console.log(e);
        let order = "ascending"
        if (order === "ascending") {
            state.contacts = state.contacts.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            });
            order = "desending";
        } else if (order === "desending") {
            state.contacts = state.contacts.sort((a, b) => {
            if (a.name < b.name) {
                return 1;
            }
            });
            order = "ascending";
        }
        });
};
    const bootstrap = () => {
        sortName();
        addContact();
    }
    return {
        bootstrap,
    };
})(Model, View);
Controller.bootstrap();