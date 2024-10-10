const VideoBackground = () => {
  return (
    <iframe
      className="absolute top-0 left-0 w-full h-full aspect-video -z-50"
      src="https://www.youtube.com/embed/S5qJXYNNINo?start=120&end=180&autoplay=1&mute=0&controls=0"
      title="YouTube video player"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
};

export default VideoBackground;
