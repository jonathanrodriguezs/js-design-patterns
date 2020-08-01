let instance = null

class DBConnection {
  constructor(url, buffer) {
    if (instance === null) {
      this.url = url
      this.buffer = buffer
      instance = this
    } else {
      return instance
    }
  }
}

;(function () {
  const conn1 = new DBConnection('mongodb://xyz:27017', 128)
  const conn2 = new DBConnection('mongodb://abc:27017', 256)

  console.log(conn1 === conn2)
})()
