// Классы для работы с заказами и связанными сущностями

class Order {
  constructor(id, productId, userId, statusId, amount) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.statusId = statusId;
    this.amount = amount;
  }
}

class Status {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Delivery {
  constructor(id, userId, statusId, orderId, address, additionally, date) {
    this.id = id;
    this.orderId = orderId;
    this.userId = userId;
    this.statusId = statusId;
    this.address = address;
    this.additionally = additionally;
    this.date = date;
  }
}

class Payment {
  constructor(id, orderId, summ, statusId, amount) {
    this.id = id;
    this.orderId = orderId;
    this.summ = summ;
    this.statusId = statusId;
    this.amount = amount;
  }
}

export { Order, Status, Delivery, Payment };
