import * as CommentController from "../controller/commentController";
export const commentRoutes = [
  {
    method: "POST",
    path: "/{id}/comments",
    handler: CommentController.createCommentHandler,
  },
  {
    method: "GET",
    path: "/comments",
    handler: CommentController.getCommentHandler,
  },
];
