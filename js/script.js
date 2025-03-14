new Vue({
    el: '#app',
    data: {
      columns: [
        [], 
        [], 
        []  
      ],
      nextCardId: 1 // Уникальный ID для карточек
    },
    created() {

      this.columns[0].push({
        id: this.nextCardId++,
        title: 'Карточка 1 (пример)',
        items: [
          { text: 'Пункт 1', completed: false },
          { text: 'Пункт 2', completed: false },
          { text: 'Пункт 3', completed: false }
        ],
        completedDate: null
      });
    }
  });