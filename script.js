let video = null;
let canvas = null;
let context = null;
const scaler = .8;
const size = { x: 0, y: 0, width: 0, height: 0 };

async function main() {
  try {
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');

    const signal = await navigator.mediaDevices.getUserMedia({ video: true });
    video = document.createElement('video');
    video.srcObject = signal;
    video.play();

    video.onloadeddata = function () {
      handleResize();
      window.addEventListener('resize', handleResize);
      updateCanvas();
    }
  } catch (error) {
    alert('Camera error: ' + error);
  }
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const resizer = scaler * (Math.min(
    window.innerWidth / video.videoWidth,
    window.innerHeight / video.videoHeight
  ));

  size.width = resizer * video.videoWidth;
  size.height = resizer * video.videoHeight;
  size.x = window.innerWidth / 2 - size.width / 2;
  size.y = window.innerHeight / 2 - size.height / 2;
}

function updateCanvas() {
  context.drawImage(video, size.x, size.y, size.width, size.height);
  window.requestAnimationFrame(updateCanvas);
}
