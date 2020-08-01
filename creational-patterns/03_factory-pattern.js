class Repository {
  constructor(url, storage) {
    this.url = url
    this.storage = storage
  }
}

class RepositoryFactory {
  getHost(host) {
    const hosts = { github: 'github.com', bitbucket: 'bitbucket.org' }
    if (hosts[host]) return hosts[host]
    else throw new Error('Unknown host')
  }

  createRepo(type, username, title) {
    const host = this.getHost(type)
    const url = `${host}/${username}/${title}`
    switch (type) {
      case 'github':
        return new Repository(url, '500GB')
      case 'bitbucket':
        return new Repository(url, '400GB')
    }
  }
}

;(function () {
  const factory = new RepositoryFactory()

  const repositories = [
    factory.createRepo('github', 'jonathan.rodriguez', 'js-design'),
    factory.createRepo('bitbucket', 'tony.montana', 'scarface'),
  ]

  console.log(repositories)
})()
