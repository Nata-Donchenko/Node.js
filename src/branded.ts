type UserId = number & { readonly __brand: 'UserId' };
type OrderId = number & { readonly __brand: 'OrderId' };

function getUser(id: UserId) {
  console.log(`Fetching user with id: ${id}`);
}

// const orderId: OrderId = 42;
// getUser(orderId);

