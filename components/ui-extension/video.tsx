"use client";
import Image from "next/image";
import React from "react";
type Props = {
  url: string;
};

export default function Video({ url }: Props) {
  const snapImage = (video: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    const image = canvas.toDataURL();
    const success = image.length > 100000;
    return success;
  };

  const generateThumbnail = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous"; // Set crossOrigin attribute

      const timeupdate = function () {
        if (snapImage(video)) {
          video.removeEventListener("timeupdate", timeupdate);
          video.pause();
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          const thumbnail = canvas.toDataURL();
          resolve(thumbnail);
        }
      };

      video.addEventListener("loadeddata", function () {
        if (snapImage(video)) {
          video.removeEventListener("timeupdate", timeupdate);
        }
      });

      video.addEventListener("timeupdate", timeupdate);
      video.preload = "metadata";
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      video.play();
    });
  };

  const [thumbnail, setThumbnail] = React.useState<string>("");

  React.useEffect(() => {
    generateThumbnail()
      .then((thumb) => setThumbnail(thumb))
      .catch((error) => console.error(error));
  }, [url]);

  return thumbnail ? (
    <Image src={thumbnail} alt="Video Thumbnail" width={200} height={200} />
  ) : (
    <p>Loading...</p>
  );
}
