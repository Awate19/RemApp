export const getProductsByCategory = (category) => {
  return fetch(`../../api/product/${category}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
