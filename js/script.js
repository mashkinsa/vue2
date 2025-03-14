new Vue({
    el: '#app',
    data: {
      columns: [
        [], 
        [], 
        []  
      ],
      nextCardId: 1, // Уникальный ID для карточек
      newCardTitle: '', 
      newCardItems: [{ text: '' }, { text: '' }, { text: '' }] 
    },
    computed: {
      isCardValid() {
        return (
          this.newCardTitle.trim() !== '' &&
          this.newCardItems.length >= 3 &&
          this.newCardItems.length <= 5 &&
          this.newCardItems.every(item => item.text.trim() !== '')
        );
      }
    },
    methods: {
      addItem() {
        if (this.newCardItems.length < 5) {
          this.newCardItems.push({ text: '' });
        }
      },

      removeItem(index) {
        if (this.newCardItems.length > 3) {
          this.newCardItems.splice(index, 1);
        }
      },

      addCard() {
        if (this.isCardValid) {
          this.columns[0].push({
            id: this.nextCardId++,
            title: this.newCardTitle,
            items: this.newCardItems.map(item => ({ text: item.text, completed: false })),
            completedDate: null
          });

          this.newCardTitle = '';
          this.newCardItems = [{ text: '' }, { text: '' }, { text: '' }];
        }
      }
    }
  });