const baseUrl = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`API error: ${res.status}`);
};

const normalizeItem = (item) => {
  if (item.imageUrl && !item.link) {
    return { ...item, link: item.imageUrl };
  }
  return item;
};

const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(handleResponse)
    .then((items) => items.map(normalizeItem));
};

const addItem = ({ name, link, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl: link, weather }),
  })
    .then(handleResponse)
    .then(normalizeItem);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
};

export { addItem, deleteItem, getItems };
