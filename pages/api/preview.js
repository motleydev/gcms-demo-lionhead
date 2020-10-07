import { getPreviewHotelById } from "../../lib/graphcms";

export default async function handler(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.GRAPHCMS_PREVIEW_SECRET ||
    !req.query.id
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const hotel = await getPreviewHotelById(req.query.id);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!hotel) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/hotels/${hotel.id}` });
  res.end();
}
