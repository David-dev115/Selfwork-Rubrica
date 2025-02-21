
// wrapper contatti
let contactsWrapper = document.querySelector(`#contactsWrapper`);


// bottoni
let showContactsBtn = document.querySelector(`#showContactsBtn`);
let addContactsBtn = document.querySelector(`#addContactsBtn`);
let removeContactsBtn = document.querySelector(`#removeContactsBtn`);
let editContactsBtn = document.querySelector(`#editContactsBtn`);

// input
let input_nome = document.querySelector(`#input_nome`);
let input_cognome = document.querySelector(`#input_cognome`);
let input_tel = document.querySelector(`#input_tel`);





// varie
let tit_1 = document.querySelector(`#tit_1`);

let check = false;


let rubrica = {

    lista_contatti : [
        {contact_name : `David`, contact_cognome : `Paparo`, contact_number : 3401213145},
        {contact_name : `Mario`, contact_cognome : `Rossi`, contact_number : 3401213146},
        {contact_name : `Luigi`, contact_cognome : `Rizzo`, contact_number : 3401213147},

    ],


    showContacts : function () {
        contactsWrapper.innerHTML = ``;
        this.lista_contatti.forEach(  (contatto)=> {
            let div = document.createElement(`div`);
            div.classList.add(`card-custom`);
            div.classList.add(`rounded`);
            div.innerHTML = `
                <p>${contatto.contact_name}</p>
                <p>${contatto.contact_cognome}</p>
                <p>${contatto.contact_number}</p>
                <i class="fa-solid fa-trash-can cestino icon"></i>
            `;
            
            contactsWrapper.appendChild(div);

        }  );

        // Icone
        let icons = document.querySelectorAll(`.icon`);

        icons.forEach( (icona, i)=> {
            icona.addEventListener(`click`, ()=> {
            this.lista_contatti.splice(i, 1);
            this.showContacts();
                
            });
        } );
            

    },

    addContact : function (newName, newCognome, newNumero) {

        // applico condizione per farsì che l'inserimento avvenga solo se i campi sono valorizzati
        if (newName && newCognome && newNumero){
            this.lista_contatti.push( {contact_name : newName, contact_cognome : newCognome, contact_number : newNumero} );
            this.showContacts();
            check = false;
        } else {
            alert(`Inserire tutti i parametri`);
            check = true;
        }
        

    },

    removeContact : function (removedName) {
        // creo un clone che mi retituisca un Array con i soli nomi, in modo da poter ottenere l'indice del nome da eliminare
        let names = this.lista_contatti.map( (contatto)=> contatto.contact_name  );

        let index = names.indexOf(removedName);

        if ( index >= 0) {
            this.lista_contatti.splice(index, 1);
            this.showContacts();
            if (check === false) {
                check = true;
                showContactsBtn.innerHTML = `nascondi contatti`
                tit_1.innerHTML = `lista contatti`
                tit_1.style.color = `red`;
                input_nome.value = ``;
            }

        }

    },


    editContact : function (namex, cognomex, numerox) {

        this.lista_contatti.forEach(  (contatto)=> {
            if (contatto.contact_name == namex) {
                contatto.contact_cognome = cognomex;
                contatto.contact_number = numerox;
            }
        }  )

        this.showContacts();

    }


};


showContactsBtn.addEventListener(`click`, ()=> {

    if (check === false) {
        rubrica.showContacts();
        check = true;
        showContactsBtn.innerHTML = `nascondi contatti`
        tit_1.innerHTML = `lista contatti`
        tit_1.style.color = `red`;
    } else {
        contactsWrapper.innerHTML = ``;
        check = false;
        showContactsBtn.innerHTML = `visualizza`;
        tit_1.innerHTML = `rubrica`;
        tit_1.style.color = `black`;
    }

});




addContactsBtn.addEventListener(`click`, ()=> {

    rubrica.addContact(input_nome.value, input_cognome.value, input_tel.value);
    // rubrica.showContacts();   -- inserito direttamente nella funzione all'interno dell'oggetto

    if (check === false) {
        check = true;
        showContactsBtn.innerHTML = `nascondi contatti`
        tit_1.innerHTML = `lista contatti`
        tit_1.style.color = `red`;
        input_nome.value = ``;
        input_cognome.value = ``;
        input_tel.value = ``;


    } else {
        input_nome.value = ``;
        input_cognome.value = ``;
        input_tel.value = ``;
    }

});


removeContactsBtn.addEventListener(`click`, ()=> {
    rubrica.removeContact(input_nome.value);
})



editContactsBtn.addEventListener( `click`, ()=> {
    if(input_nome != ``) {
        rubrica.editContact( input_nome.value, input_cognome.value, input_tel.value )
        input_nome.value = ``;
        input_cognome.value = ``;
        input_tel.value = ``;
    }


} )



