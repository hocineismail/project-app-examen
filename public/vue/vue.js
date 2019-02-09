
new Vue({
    el: '#app',
    data: {
     input: false,
    },
  
  methods: {
    
    add:  function () {
      if (this.input === false ) { 
        this.input = true
      } else {

        this.input = false
      }
     
    },
   
    
  }
  
  
  })