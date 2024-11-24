const { createApp } = Vue;

createApp({

  data() {

    return {
      count: +localStorage.getItem('counter') || 0,
      notification: '',
      keyPressed: false,
    };

  },

  computed: {

    isResetVisible() {
      return this.count !== 0;
    },

  },

  methods: {

    saveCount() {
      localStorage.setItem('counter', this.count);
    },

    notify(message) {
      this.notification = message;
      setTimeout(() => (this.notification = ''), 2000);
    },

    increment() {
      this.count++;
      this.saveCount();
      this.notify('Counter increased!');
    },

    decrement() {
      if (this.count > 0) {
        this.count--;
        this.saveCount();
        this.notify('Counter decreased!');
      }
    },

    reset() {
      this.count = 0;
      this.saveCount();
      this.notify('Counter reset!');
    },

    handleKeydown(event) {
      if (this.keyPressed) return;
      this.keyPressed = true;

      const key = event.key.toLowerCase();
      if (key === 'arrowup' || key === ' ' || key === 's') this.increment();
      else if (key === 'arrowdown' || key === 'backspace' || key === 'a') this.decrement();
      else if (key === 'enter' && this.isResetVisible) this.reset();
    },

    handleKeyup() {
      this.keyPressed = false;
    },

  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  },

}).mount('#app');