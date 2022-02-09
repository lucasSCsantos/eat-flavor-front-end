import { ProductType } from '../pages/Products/ProductCard';

export default (product: ProductType) => {
  try {
    const productToAdd = { cont: 1, ...product };
    const { email } = JSON.parse(localStorage.user);
    if (localStorage && localStorage[`checkout_${email}`]) {
      const storage = JSON.parse(localStorage[`checkout_${email}`]);
      const { products } = storage;
      const exists = products.find(
        (item: ProductType) => item._id === product._id
      );

      if (exists) {
        exists.cont += 1;
        localStorage.setItem(
          `checkout_${email}`,
          JSON.stringify({
            ...storage,
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
          `checkout_${email}`,
          JSON.stringify({
            ...storage,
            total: storage.total + productToAdd.price,
            products: [...products, productToAdd]
          })
        );
      }
    } else {
      localStorage.setItem(
        `checkout_${email}`,
        JSON.stringify({
          total: productToAdd.price,
          products: [productToAdd],
          user: email
        })
      );
    }
  } catch (err) {
    console.error(err);
  }
};
