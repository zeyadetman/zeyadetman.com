import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";

const fetchPhotos = async () => {
  const res = await fetch("https://api.unsplash.com/users/zeyadetman/photos", {
    headers: {
      authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });
  const photos = await res.json();
  const result = photos.map((photo: any) => ({
    url: photo.urls.regular,
    description: photo.description,
    width: photo.width,
    height: photo.height,
  }));

  return result;
};

const getPhotos = async () => {
  const redis = new Redis({
    url: process.env.REDIS_URL || "",
    token: process.env.REDIS_TOKEN || "",
  });
  const photos = await fetchPhotos();
  if (photos.length > 0) {
    await redis.set("photos", JSON.stringify(photos));
    return photos;
  } else {
    const data = (await redis.get("photos")) as any;
    const cachedPhotos = JSON.parse(data);
    return cachedPhotos;
  }
};

export default async function Gallery() {
  return redirect("/");
  // const photos = await getPhotos();

  // return (
  //   <div className="page-container">
  //     <div className="page-header">
  //       <h1>Gallery</h1>
  //       <h2>Photos.</h2>
  //     </div>

  //     <ShowPhotos photos={photos} />
  //   </div>
  // );
}
