import robot from "robotjs";
import * as mouseController from "./mouseController";

export const draw_square = (size: string): string => {
  robot.mouseToggle("down");
  mouseController.mouse_up(size);
  mouseController.mouse_right(size);
  mouseController.mouse_down(size);
  mouseController.mouse_left(size);
  robot.mouseToggle("up");
  return "draw_square\0";
};

export const draw_rectangle = (h: string, w: string): string => {
  robot.mouseToggle("down");
  mouseController.mouse_up(h);
  mouseController.mouse_right(w);
  mouseController.mouse_down(h);
  mouseController.mouse_left(w);
  robot.mouseToggle("up");
  return "draw_rectangle\0";
};
export const draw_circle = (size: string): string => {
  const mouse = robot.getMousePos();
  const radius = parseInt(size, 10);
  robot.mouseToggle("down");

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mouse.x + radius * Math.cos(i) - radius;
    const y = mouse.y + radius * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
  return "draw_circle\0";
};
