console.log(Vue);

const { user, contacts } = data;
// Trovo l'id più piccolo

let currentId = Infinity;
contacts.forEach(({ id }) => {
    if (currentId > id) currentId = id
});



const { createApp } = Vue;

const app = createApp({
    name: 'Boolzapp',
    data: () => ({
        prova: 'Prova collegamento Vue',
        user,
        contacts,
        currentId
    }),
    computed: {
        currentContact() {
            return contacts.find(({ id }) => id === this.currentId);
        },
        currentMessages() {
            return this.currentContact.messages;
        }
    },
    methods: {
        setCurrentId(id) {
            this.currentId = id;
        }
    }
});

app.mount('#root')