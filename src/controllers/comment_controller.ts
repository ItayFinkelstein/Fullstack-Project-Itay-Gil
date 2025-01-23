import commentModel from "../models/comment";
import BaseController from "./base_controller";

const commentsController = new BaseController(commentModel);

export default commentsController;