import { ProductType } from '../pages/Products/ProductCard';

export default (product: ProductType) => {
  const productToAdd = { cont: 1, ...product };
  try {
    if (localStorage && localStorage.checkout) {
      const storage = JSON.parse(localStorage.checkout);
      const exists = storage.find(
        (item: ProductType) => item._id === product._id
      );

      if (exists) {
        exists.cont += 1;
        localStorage.setItem(
          'checkout',
          JSON.stringify([
            ...storage.slice(0, storage.indexOf(exists)),
            exists,
            ...storage.slice(storage.indexOf(exists) + 1)
          ])
        );
      } else {
        localStorage.setItem(
          'checkout',
          JSON.stringify([...storage, productToAdd])
        );
      }
    } else {
      localStorage.setItem('checkout', JSON.stringify([productToAdd]));
    }
  } catch (err) {
    console.error(err);
  }
};
