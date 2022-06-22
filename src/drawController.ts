import robot from "robotjs";
import * as mouseController from "./mouseController";

export const draw_square = (size:string):string=>{
    robot.mouseToggle("down");
    mouseController.mouse_up(size);
    mouseController.mouse_right(size);
    mouseController.mouse_down(size);
    mouseController.mouse_left(size);
    robot.mouseToggle("up");
    return "draw_square"
}