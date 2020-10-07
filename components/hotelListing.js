import { useState, useEffect } from "react";
import Link from "next/link";
import localforage from "localforage";
import Image from "components/image";
import Heart from "components/heart";
import Container from "components/container";

function HotelListing({ hotel }) {
  const [hotelLikeStatus, setHotelLikedStatus] = useState(false);
  const [likes, setLikes] = useState(hotel.likes);

  useEffect(() => {
    localforage.getItem(hotel.id, (err, value) => {
      if (value) setHotelLikedStatus(value);
    });
  }, [localforage, setHotelLikedStatus]);

  const likeThis = async (e, { id, likes }) => {
    e.preventDefault();

    if (hotelLikeStatus) {
      const req = await fetch(`/api/unlike`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          likes,
        }),
      });
      const res = await req.json();
      localforage.removeItem(id, setHotelLikedStatus(false));
      setLikes(res.likes);
    } else {
      const req = await fetch(`/api/like`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          likes,
        }),
      });

      const res = await req.json();
      localforage.setItem(id, true, setHotelLikedStatus(true));
      setLikes(res.likes);
    }
  };

  return (
    <div className="w-full py-5 border-b border-yellow-400">
      <Container>
        <div className="flex flex-wrap gap-10 md:flex-no-wrap">
          <div className="full md:w-2/3">
            <Link href={`/hotels/${hotel.id}`}>
              <a>
                <Image
                  className="object-cover w-full text-left bg-gray-100"
                  tiny={hotel.small[0].url}
                  large={hotel.large[0].url}
                />
              </a>
            </Link>
          </div>
          <div className="full md:w-1/3 prose-md">
            <Link href={`/hotels/${hotel.id}`}>
              <a>
                <h1 className="mb-4 font-serif text-2xl font-bold">
                  {hotel.name}
                </h1>
                <p className="font-sans text-gray-700 text-md">
                  {hotel.description}
                </p>
              </a>
            </Link>
            <div className="text-right">
              <p>
                <button
                  className="text-gray-600"
                  onClick={(e) => likeThis(e, hotel)}
                >
                  <Heart active={hotelLikeStatus} />
                  {likes}
                </button>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HotelListing;
