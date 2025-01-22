import commentModel from "../models/commentModel";
import BaseController from "./base_controller";

const commentsController = new BaseController(commentModel);

export default commentsController;