export function getUniqueCategories(products) {
  const categoriesMap = new Map();

  products.forEach((product) => {
    if (!categoriesMap.has(product.Category)) {
      categoriesMap.set(product.Category, product.CategoryImage);
    }
  });

  return Array.from(categoriesMap, ([name, image]) => ({ name, image }));
}
