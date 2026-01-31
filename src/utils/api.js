const baseUrl =
  import.meta.env.MODE === "production"
    ? "http://api.finalsprint.jumpingcrab.com"
    : "http://localhost:3001";

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

const addItem = ({ name, link, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl: link, weather }),
  })
    .then(handleResponse)
    .then(normalizeItem);
};

const deleteItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .then(normalizeItem);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .then(normalizeItem);
};

const updateProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
};

export { addItem, deleteItem, getItems, addCardLike, removeCardLike, updateProfile };
