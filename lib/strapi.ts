const Authorization =
  "Bearer aca96df0edde38619c59907c36dd9d6c06e76eddbf323957fdf4f11d4fe41c01ed015471cdf141d6d4177d8ea4434822c658ea57954e5ca7cca2f736355a75c5dcbcdd92edb698b08bdb8fee23ee1d1889fc8954a0125674f7d50cfa387a98525ca48b151ee94319071d352f0718e23cb76f4918ce7de7458a2f22e44ba98dcc";

export async function getAllNotes() {
  const response = await fetch("http://localhost:1337/api/notes");
  const data = await response.json();

  const list = data.data.map(
    ({
      attributes: { title, content, updatedAt, slug },
    }: Record<string, any>) => {
      return [
        slug,
        JSON.stringify({
          title,
          content,
          updateTime: updatedAt,
        }),
      ];
    }
  );

  return Object.fromEntries(list);
}

export async function getNote(uuid: string) {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

export async function addNote(data: Record<string, string>) {
  try {
    const response = await fetch("http://localhost:1337/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization },
      body: JSON.stringify({ data }),
    });
    const res = await response.json();
    return res.data.attributes.slug;
  } catch (error) {
    // console.log(error);
  }
}

export async function updateNote(uuid: string, data: Record<string, string>) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json", Authorization },
    body: JSON.stringify({ data }),
  });
  return response.json();
}

export async function delNote(uuid: string) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json", Authorization },
  });
  return response.json();
}
