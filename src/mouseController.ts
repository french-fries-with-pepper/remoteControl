import robot from "robotjs";

export const mouse_up = (distance: string): string => {
  const mouse = robot.getMousePos();
  const newY =
    mouse.y - parseInt(distance, 10) >= 0
      ? mouse.y - parseInt(distance, 10)
      : 0;
  robot.moveMouseSmooth(mouse.x, newY);
  return `mouse_up ${distance} px\0`;
};
export const mouse_down = (distance: string): string => {
  const mouse = robot.getMousePos();
  robot.moveMouseSmooth(mouse.x, mouse.y + parseInt(distance, 10));
  return `mouse_down ${distance} px\0`;
};
export const mouse_left = (distance: string): string => {
  const mouse = robot.getMousePos();
  const newX =
    mouse.x - parseInt(distance, 10) >= 0
      ? mouse.x - parseInt(distance, 10)
      : 0;
  robot.moveMouseSmooth(newX, mouse.y);
  return `mouse_left ${distance} px\0`;
};
export const mouse_right = (distance: string): string => {
  const mouse = robot.getMousePos();
  robot.moveMouseSmooth(mouse.x + parseInt(distance, 10), mouse.y);
  return `mouse_right ${distance} px\0`;
};
export const mouse_position = (): string => {
  const mouse = robot.getMousePos();
  return `mouse_position ${mouse.x},${mouse.y}\0`;
};
