import { getAllHotelsForHome } from "../lib/graphcms";
import Container from "components/container";
import Layout from "components/layout";

import HotelListing from "components/hotelListing";

export default function IndexPage({ hotels, preview }) {
  return (
    <Layout preview={preview}>
      <div className="py-4">
        <Container>
          <h1 className="font-serif text-5xl">Wanderlust</h1>
        </Container>
        {hotels.map((hotel, index) => (
          <HotelListing key={index} hotel={hotel} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const hotels = (await getAllHotelsForHome(preview)) || [];
  return {
    props: { hotels, preview },
  };
}
