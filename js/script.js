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
      // Проверка валидности карточки
      isCardValid() {
        return (
          this.newCardTitle.trim() !== '' &&
          this.newCardItems.length >= 3 &&
          this.newCardItems.length <= 5 &&
          this.newCardItems.every(item => item.text.trim() !== '')
        );
      },
      // Проверка, заполнен ли первый столбец
      isFirstColumnFull() {
        return this.columns[0].length >= 3;
      }
    },
    methods: {
      // Добавить пункт в новую карточку
      addItem() {
        if (this.newCardItems.length < 5) {
          this.newCardItems.push({ text: '' });
        }
      },
      // Удалить пункт из новой карточки
      removeItem(index) {
        if (this.newCardItems.length > 3) {
          this.newCardItems.splice(index, 1);
        }
      },
      // Добавить новую карточку в первый столбец
      addCard() {
        if (this.isCardValid && !this.isFirstColumnFull) {
          this.columns[0].push({
            id: this.nextCardId++,
            title: this.newCardTitle,
            items: this.newCardItems.map(item => ({ text: item.text, completed: false })),
            completedDate: null
          });
          // Сбросить форму
          this.newCardTitle = '';
          this.newCardItems = [{ text: '' }, { text: '' }, { text: '' }];
        }
      },
      // Обновить статус карточки (перемещение между столбцами)
      updateCardStatus(card) {
        const completedItems = card.items.filter(item => item.completed).length;
        const totalItems = card.items.length;
        const completionPercentage = (completedItems / totalItems) * 100;
  
        // Перемещение карточки в зависимости от процента выполнения
        if (completionPercentage > 50 && completionPercentage < 100) {
          this.moveCard(card, 0, 1); // Из первого столбца во второй
        } else if (completionPercentage === 100) {
          this.moveCard(card, 1, 2); // Из второго столбца в третий
          card.completedDate = new Date().toLocaleString(); // Добавляем дату завершения
        }
      },
      // Перемещение карточки между столбцами
      moveCard(card, fromColumnIndex, toColumnIndex) {
        const cardIndex = this.columns[fromColumnIndex].findIndex(c => c.id === card.id);
        if (cardIndex !== -1) {
          const [movedCard] = this.columns[fromColumnIndex].splice(cardIndex, 1);
          this.columns[toColumnIndex].push(movedCard);
        }
      }
    }
  });