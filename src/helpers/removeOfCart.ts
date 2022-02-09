import { ProductType } from '../pages/Products/ProductCard';

const removeOfCart = (product: ProductType) => {
  try {
    const { email } = JSON.parse(localStorage.user);
    const storage = JSON.parse(localStorage[`checkout_${email}`]);
    const { products } = storage;
    let index = 0;
    let cont: number | undefined = 0;
    const condition = products.some((item: typeof product) => {
      if (item._id === product._id && item.cont === product.cont) {
        index = products.indexOf(item);
        cont = item.cont;
        return true;
      }
      return false;
    });
    if (condition) {
      if (cont > 1) {
        const newProduct = { ...product, cont: cont - 1 };
        localStorage[`checkout_${email}`] = JSON.stringify({
          ...storage,
          total: storage.total - product.price,
          products: [
            ...products.slice(0, index),
            newProduct,
            ...products.slice(index + 1)
          ]
        });
      } else {
        localStorage[`checkout_${email}`] = JSON.stringify({
          ...storage,
          total: storage.total - product.price,
          products: [...products.slice(0, index), ...products.slice(index + 1)]
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default removeOfCart;
