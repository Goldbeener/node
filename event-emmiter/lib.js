const EventEmitter = require('events').EventEmitter;

class Bus extends EventEmitter {
  constructor(){
    super()
    setInterval(() => {
      this.emit('newlessons', {
        price: Math.random() * 100
      })
    }, 3000)
  }
}

module.exports = Bus