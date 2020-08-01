class Computer {
  constructor(brand, cpu, ram) {
    this.brand = brand
    this.cpu = cpu
    this.ram = ram
  }
}

class Laptop extends Computer {
  constructor(brand, cpu, ram, weigth) {
    super(brand, cpu, ram)
    this.weigth = weigth
  }
}

function setUpLab() {
  const equipments = [
    new Computer('HP', 'Core i5', 32),
    new Laptop('Alienware', 'Pentium Gold', 16, '20KG'),
  ]

  return { equipments }
}

;(function () {
  const laboratory = setUpLab()
  console.log(laboratory)
})()
