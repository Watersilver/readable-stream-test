// if I need to read about res.body:
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams

async function loadImage() {
  const img = document.getElementById("image-1");

  const res = await fetch('./test-image', {
    headers: {
      "test": "ermis"
    }
  });

  const blob = await res.blob();

  const src = URL.createObjectURL(blob);

  img.src = src;
}

async function loadVideo() {
  const video = document.getElementById("video-1");

  const res = await fetch('./test-video', {
    headers: {
      "test": "ermis"
    }
  });

  const blob = await res.blob();

  const src = URL.createObjectURL(blob);

  video.src = src;
}

onload = () => {
  loadImage();
  loadVideo();
};