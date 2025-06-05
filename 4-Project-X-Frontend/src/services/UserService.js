export const fetchUser = async () => {
  return await fetch("http://localhost:8080/users")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addUser = async (user) => {
  const res = await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const resJson = await res.json();

    throw new Error(resJson.message);
  }

  return await res.json();
};

export const removeUser = async (id) => {
  await fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateUser = async (id, user) => {
  const res = await fetch(`http://localhost:8080/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const resJson = await res.json();

    throw new Error(resJson.message);
  }

  return await res.json();
};
