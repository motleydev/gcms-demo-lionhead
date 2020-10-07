import { updateHotelLikes } from "lib/graphcms";

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const { body } = req;
  const { id, likes } = body;
  const data = await updateHotelLikes(id, likes + 1);
  const payload = await data.publishHotel;
  res.end(JSON.stringify(payload));
};
