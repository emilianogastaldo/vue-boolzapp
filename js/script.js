console.log(Vue);

const { user, contacts } = data;
// Trovo l'id più piccolo

// let currentId = Infinity;
// contacts.forEach(({ id }) => {
//     if (currentId > id) currentId = id
// });


const { createApp } = Vue;

const app = createApp({
    name: 'Boolzapp',
    data: () => ({
        prova: 'Prova collegamento Vue',
        user,
        contacts,
        currentId: null,
        searchBar: '',
        textMessage: '',
    }),
    computed: {
        filteredContact() {
            const search = this.searchBar.toLowerCase()
            const filtered = this.contacts.filter(contact => contact.name.toLowerCase().includes(search));
            return filtered;
        },
        currentContact() {
            return this.contacts.find(({ id }) => id === this.currentId);
        },
        currentMessages() {
            return this.currentContact.messages;
        }

    },
    methods: {
        setCurrentId(id) {
            this.currentId = id;
        },
        createNewMessage(status, text) {
            const newMessage = {
                id: new Date().getTime(),
                date: new Date().toLocaleString(),
                text,
                status
            }
            this.currentMessages.push(newMessage);
        },
        getTime(chat) {
            // date che ritorno
            let date = '';
            console.log(chat);
            console.log(chat.length);
            // trovo l'ultimo messaggio inviato
            for (let i = 0; i < chat.length; i++) {
                // estrapolo l'ultimo messaggio inviato
                if (chat[i].status === 'received') date = chat[i].date
                console.log(chat[i].status, chat[i].date)
            };
            // ritorno la stringa
            console.log('ultima data ricevuta', date);

        },
        // responseMessage() {
        //     const newMessage = {
        //         id: 4,
        //         date: '10/01/2020 15:31:55',
        //         text: 'ok',
        //         status: 'received'
        //     }
        //     this.currentMessages.push(newMessage);
        // },
        sendNewMessage() {
            if (!this.textMessage) return;
            // const newMessage = {
            //     id: new Date().getTime(),
            //     date: new Date().toLocaleDateString(),
            //     text: this.textMessage,
            //     status: 'sent'
            // }
            // this.currentMessages.push(newMessage);
            this.createNewMessage('sent', this.textMessage);

            setTimeout(() => {
                this.createNewMessage('received', 'ok');
            }, 1000);
            this.textMessage = '';
        },
        deleteMessage(id) {
            // A quanto se uso il metodo leggo solo, invece se metto direttamente l'oggetto in questione
            // posso modificarlo?!
            this.currentContact.messages = this.currentMessages.filter(message => message.id !== id);
        }
    },
    created() {
        this.currentId = this.contacts[0].id;
    }
});

app.mount('#root')