import { ProductType } from '../pages/Products/ProductCard';

export default (product: ProductType) => {
  const productToAdd = { cont: 1, ...product };
  try {
    if (localStorage && localStorage.checkout) {
      const storage = JSON.parse(localStorage.checkout);
      const { products } = storage;
      const exists = products.find(
        (item: ProductType) => item._id === product._id
      );

      if (exists) {
        exists.cont += 1;
        localStorage.setItem(
          'checkout',
          JSON.stringify({
            total: storage.total + productToAdd.price,
            products: [
              ...products.slice(0, products.indexOf(exists)),
              exists,
              ...products.slice(products.indexOf(exists) + 1)
            ]
          })
        );
      } else {
        localStorage.setItem(
          'checkout',
          JSON.stringify({
            total: storage.total + productToAdd.price,
            products: [...products, productToAdd]
          })
        );
      }
    } else {
      localStorage.setItem(
        'checkout',
        JSON.stringify({ total: productToAdd.price, products: [productToAdd] })
      );
    }
  } catch (err) {
    console.error(err);
  }
};
