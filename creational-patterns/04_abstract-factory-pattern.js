let config = null

class Configuration {
  constructor(mongoURI, mysqlURI, token, connections) {
    if (config === null) {
      this.mongo = { URI: mongoURI, token }
      this.mysql = { URI: mysqlURI }
      this.connections = connections
      config = this
    } else {
      return config
    }
  }

  setConnections(connections) {
    this.connections = connections
  }
}

class MongoConnection {
  constructor(url, buffer, token) {
    this.url = url
    this.buffer = buffer
    this.token = token
  }
}

class MySQLConnection {
  constructor(url, username, password) {
    this.url = url
    this.username = username
    this.password = password
  }
}

class MongoFactory {
  createMongoConnection(type) {
    const { mongo } = new Configuration()
    switch (type) {
      case 'protected':
        return new MongoConnection(mongo.URI, 256, mongo.token)
      default:
        return new MongoConnection(mongo.URI, 128)
    }
  }
}

class MySQLFactory {
  createMySQLConnection(type) {
    const { mysql } = new Configuration()
    switch (type) {
      case 'protected':
        return new MySQLConnection(mysql.URI, mysql.username, mysql.password)
      default:
        return new MySQLConnection(mysql.URI, 'root', 'root')
    }
  }
}

;(function () {
  new Configuration(
    'mongodb://webscriptero.com:27017/sagas',
    'jdbc:mysql://webscriptero:33060/sagas',
    'secret-mongodb-token'
  )
  const mongoFactory = new MongoFactory()
  const mysqlFactory = new MySQLFactory()

  const createDBConnection = (type, secure) => {
    switch (type) {
      case 'mongo':
        return mongoFactory.createMongoConnection(secure)
      case 'mysql':
        return mysqlFactory.createMySQLConnection(secure)
    }
  }

  const mysql = createDBConnection('mysql')
  const mongo = createDBConnection('mongo', 'protected')

  config.setConnections({ mysql, mongo })
  console.log(config.connections)
})()
