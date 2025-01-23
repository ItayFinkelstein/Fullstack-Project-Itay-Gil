import postModel from '../models/postModel';
import BaseController from './base_controller';

const postsController = new BaseController(postModel);

export default postsController;