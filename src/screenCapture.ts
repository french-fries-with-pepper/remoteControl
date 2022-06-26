import robot from "robotjs";
import Jimp from "jimp";

export const prnt_scrn = (): Jimp => {
  const mouse = robot.getMousePos();
  const SIZE = 200;
  let X = mouse.x - 100 < 0 ? 0 : mouse.x - 100;
  let Y = mouse.y - 100 < 0 ? 0 : mouse.y - 100;
  const img = robot.screen.capture(X, Y, SIZE, SIZE);
  const jimg = new Jimp(SIZE, SIZE);
  for (var x = 0; x < SIZE; x++) {
    for (var y = 0; y < SIZE; y++) {
      var hex = img.colorAt(x, y);
      var num = parseInt(hex + "ff", 16);
      jimg.setPixelColor(num, x, y);
    }
  }
  return jimg;
};
