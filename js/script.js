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
        }
    }
});

app.mount('#root')