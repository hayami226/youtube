import express from "express";
import { deleteVideo, getEditVideo, postEditVideo, getUpload, postUpload, videoDetail, videos } from "../controllors/videoControllor";
import routes from "../routes"
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;