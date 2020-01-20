const Bus = require('./lib')

const bus = new Bus()
bus.addListener('newlessons', (res) => {
  console.log('yeah', res)
})