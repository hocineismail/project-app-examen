
 new Vue({
  el: '#app',
  data: {

   input1: false,
   input2: false,
  },

methods: {
  
  add1:  function () { console.log("add")
    if (this.input1 === false ) { 
      this.input1 = true
    } else {

      this.input1 = false
    }
   
  },
  add2:  function () {
  if (this.input2 === false ) { 
    this.input2 = true
  } else {

    this.input2 = false
  }

}
  
},



})

