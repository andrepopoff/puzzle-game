let video = null;
let canvas = null;
let context = null;

async function main() {
  try {
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const signal = await navigator.mediaDevices.getUserMedia({video: true});
    video = document.createElement('video');
    video.srcObject = signal;
    video.play();

    video.onloadeddata = function () {
      updateCanvas();
    }
  } catch (error) {
    alert('Camera error: ' + error);
  }
}

function updateCanvas() {
  context.drawImage(video, 0, 0);
  window.requestAnimationFrame(updateCanvas);
}
