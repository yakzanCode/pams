export function getUniqueCategories(products) {
  const categoriesMap = new Map();

  products.forEach((product) => {
    if (!categoriesMap.has(product.Category)) {
      categoriesMap.set(product.Category, {
        image: product.CategoryImage,
        gif: product.CategoryGif,
      });
    }
  });

  return Array.from(categoriesMap, ([name, value]) => ({
    name,
    image: value.image,
    gif: value.gif,
  }));
}
