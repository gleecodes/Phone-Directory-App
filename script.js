// views 

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
        names: '#nameColumn',
        rows: '#rows'
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
       contactList = [];
      

       //geting list
        getList() {
            return this.contactList;
        }

        //setting list
        setList(newcontactlist) {
            this.contactList = [...newcontactlist];

            const tableContacts = document.querySelector(view.domstr.tableBody);
            const tmp = view.createTmp(this.contactList);
            view.render(tableContacts, tmp);
        }
    }
    const sortContacts = (arr, Ascending) => {
        console.log(arr)
        if (Ascending) { 
          arr.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
        } else { 
       
          arr.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
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
        sortContacts,
        
    };
})(View);


//controller 

const Controller = ((model, view) => {

    const state = new model.State();
    let clicked = false;
    let sortedContacts = [];
    const addBtn = document.querySelector(view.domstr.addBtn);
    const error = document.querySelector(view.domstr.error);
    const name = document.querySelector(view.domstr.inputName);
    const mobile = document.querySelector(view.domstr.inputMobile);
    const email = document.querySelector(view.domstr.inputEmail);
    const names = document.querySelector(view.domstr.names);
    const input = document.querySelector(view.domstr.inputSearch);
    const noResult = document.querySelector(view.domstr.noResult);
    const table = document.querySelector(view.domstr.table);
    const tableContacts = document.querySelector(view.domstr.tableBody);
    const row = document.querySelector(view.domstr.rows);
    // let newList = state.contactList;


    function myFunction() {
        // Declare variables
        var  filter, a, i, txtValue;
        filter = input.value.toUpperCase();
       
       
        input.addEventListener('keyup', () => {
       
      
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < row.length; i++) {
          a = row[i];
          txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
      })
        }
       
    
   



      const sortName = () => {
        names.addEventListener('click', () => {
            clicked = !clicked;
           let sorted;

        if (!sortedContacts.length) {
            sorted = model.sortContacts(state.getList(), clicked);
        } else {
            sorted = model.sortContacts(sortedContacts, clicked);
        }
        view.render(tableContacts, view.createTmp(sorted));
        })
      }

        

   
    //ADDING CONTACT
    const addContact = () => {
    
        //validation 
        const isValid = (name, mobile, email) => {
            const nameCheck = (name) => (nameReg.test(name) || name <= 20);
            const mobileCheck = (mobile) => (mobileReg.test(mobile));
            const emailCheck = (email) => (emailReg.test(email) || email <= 40);
            
            //string vaildation codes
            const nameReg = /^[a-zA-Z ]*$/ ;
            const mobileReg = /^[0-9]*$/ ;
            const emailReg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ ;

            return nameCheck(name) && mobileCheck(mobile) && emailCheck(email);
        }

        //when click button
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            //check for validation
            if (isValid(name.value, mobile.value, email.value)) {
                error.classList.add('dn');
                const newContact = new model.Contact(name.value, mobile.value, email.value);
                const contactsArr = [...state.contactList, newContact]; 
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

    
    


    const bootstrap = () => {
       addContact();
       sortName();
      
       myFunction();
    //    init();
    }
    return {
        bootstrap
    }


})(Model, View);
Controller.bootstrap();
