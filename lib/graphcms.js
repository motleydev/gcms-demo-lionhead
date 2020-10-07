async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        preview
          ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID);
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

async function mutationAPI(query, { variables, preview } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID);
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewHotelById(id) {
  const data = await fetchAPI(
    `
      query HotelByID($id: ID!, $stage: Stage!) {
        hotel(where: {id: $id}, stage: $stage) {
          id
        }
      }`,
    {
      preview: true,
      variables: {
        stage: "DRAFT",
        id,
      },
    }
  );
  return data.hotel;
}

export async function getAllHotelsWithSlug() {
  const data = await fetchAPI(`
  {
    hotels {
      id
    }
  }
    `);
  return data.hotels;
}

export async function getAllHotelsForHome(preview) {
  const data = await fetchAPI(
    `
    {
        hotels {
          id
          name
          description
          likes
          small: photos(first: 1) {
            url(transformation: {image: {resize: {fit: crop, width: 20}}})
          }
          large: photos(first: 1) {
            url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
          }
        }
      }
    `,
    { preview }
  );
  return data.hotels;
}

export async function getHotelAndMoreHotels(id, preview) {
  const data = await fetchAPI(
    `
    query HotelById($id: ID!, $stage: Stage!) {
        hotel(stage: $stage, where: {id: $id}) {
          name
          id
          description
          likes
          photos {
            url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
          }
        }
        moreHotels: hotels(orderBy: name_DESC, first: 2, where: {id_not_in: [$id]}) {
          name
          description
          likes
          photos(first: 1) {
            url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
          }
        }
      }
      
    `,
    {
      preview,
      variables: {
        stage: preview ? "DRAFT" : "PUBLISHED",
        id,
      },
    }
  );
  return data;
}

export async function updateHotelLikes(ID, count) {
  const data = await mutationAPI(
    `
    mutation updateAndPublish($ID: ID!, $count: Int) {
      updateHotel(where: {
        id: $ID
      }, data: {
        likes: $count
      }) {
        likes
      }
      publishHotel(where: {
        id: $ID
      }, to: PUBLISHED) {
        id
        likes
      }
    }
    `,
    {
      variables: {
        ID,
        count,
      },
    }
  );
  const resp = await data;
  return resp;
}
