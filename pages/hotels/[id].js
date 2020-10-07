import { useState } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "components/container";
import Layout from "components/layout";
import { getAllHotelsWithSlug, getHotelAndMoreHotels } from "lib/graphcms";

export default function Post({ hotel, moreHotels, preview }) {
  const router = useRouter();

  if (!router.isFallback && !hotel?.id) {
    return <ErrorPage statusCode={404} />;
  }

  const firstPhoto = hotel?.photos.length ? hotel.photos[0].url : "";
  const [currentUrl, setCurrentUrl] = useState(firstPhoto);

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <div className="w-full py-5">
            <Container>
              <div className="">
                <div className="w-full mb-10">
                  <img
                    className="object-cover w-full text-left"
                    src={currentUrl}
                  />
                  <ul className="flex">
                    {hotel.photos.map((photo, index) => {
                      return (
                        <li
                          className="w-20 h-20 cursor-pointer"
                          onClick={() => setCurrentUrl(photo.url)}
                        >
                          <img
                            className="object-cover h-full"
                            src={photo.url}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="max-w-2xl prose-md">
                  <h1 className="mb-4 font-serif text-2xl font-bold">
                    {hotel.name}
                  </h1>
                  <p className="font-sans text-gray-700 text-md">
                    {hotel.description}
                  </p>
                </div>
              </div>
            </Container>
          </div>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getHotelAndMoreHotels(params.id, preview);
  return {
    props: {
      preview,
      hotel: data.hotel,
      moreHotels: data.moreHotels || [],
    },
  };
}

export async function getStaticPaths() {
  const hotels = await getAllHotelsWithSlug();
  return {
    paths: hotels.map(({ id }) => ({
      params: { id },
    })),
    fallback: true,
  };
}
