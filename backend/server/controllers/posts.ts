import { IError } from "../types/basic/IError";
import { RequestHandler } from "express";
import postModel from "../models/postSchema";
import { statusCode } from "../enums/statusCodes";

export const getPost: RequestHandler = (req, res, next) => {
	const postId = req.params.id;
	postModel
		.findById({ _id: postId })
		.then((result) => {
			if (!result) {
				throw new IError("Post not found", statusCode.NOT_FOUND);
			}
			res.status(200).json({ post: result });
		})
		.catch((err) => {
			throw new IError("Get post error", statusCode.NOT_FOUND);
		});
};

export const createPost: RequestHandler = (req, res, next) => {
	const text = req.body.text;
	const imageUrl = req.body.imageUrl || undefined;
	const audioUrl = req.body.audioUrl || undefined;
	const post = new postModel({
		text: text,
		imageUrl: imageUrl,
		audioUrl: audioUrl,
	});
	post.save()
		.then((res) => {
			console.log("Post saved successfully");
		})
		.catch((err) => {
			throw new IError(
				"Post not created",
				statusCode.INTERNAL_SERVER_ERROR,
			);
		});
};

export const deletePost: RequestHandler = (req, res, next) => {
	const postId = req.params.id;
	postModel
		.deleteOne({ _id: postId })
		.then((result) => {
			res.status(200).json({ message: "Post deleted successfully" });
		})
		.catch((err) => {
			throw new IError("Post not found", statusCode.NOT_FOUND);
		});
};
