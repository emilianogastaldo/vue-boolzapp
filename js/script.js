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
            return contacts.find(({ id }) => id === this.currentId);
        },
        currentMessages() {
            return this.currentContact.messages;
        },
        lastAccessTime() {
            let flag = false;
            let i = this.currentMessages.length - 1;
            let date;
            while (!flag || i < 0) {
                if (this.currentMessages[i].status === 'received') {
                    date = this.currentMessages[i].date;
                    flag = true;
                }
                i--;
            }
            const lastTime = date.split(' ');

            return lastTime[1].slice(0, 5);
        }

    },
    methods: {
        setCurrentId(id) {
            this.currentId = id;
        },
        responseMessage(currentMessages) {
            const newMessage = {
                id: 4,
                date: '10/01/2020 15:31:55',
                text: 'ok',
                status: 'received'
            }
            currentMessages.push(newMessage);
        },
        sentNewMessage(currentMessages) {
            if (!this.textMessage) return;
            const newMessage = {
                id: 3,
                date: '10/01/2020 15:30:55',
                text: this.textMessage,
                status: 'sent'
            }
            currentMessages.push(newMessage);
            // this.textMessage = '';

            setTimeout(() => {
                this.responseMessage(currentMessages);
            }, 1000);
        },
        deleteMessage(currentMessages, id) {
            console.log('ciao')
            currentMessages = currentMessages.filter(message => message.id !== id);
        }
    },
    created() {
        this.currentId = this.contacts[0].id;
    }
});

app.mount('#root')