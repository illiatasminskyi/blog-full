import PostModel from '../models/Post.js'

class PostsController {
	async create(req, res) {
		if (req.userId == null) return res.status(500).json({ message: 'login' })

		try {
			const doc = new PostModel({
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags,
				user: req.userId,
			})

			const post = await doc.save()
			res.json(post)
		} catch (err) {
			res.status(500).json(err.message)
		}
	}

	async getAll(req, res) {
		try {
			const posts = await PostModel.find().populate('user').exec()
			res.json(posts)
		} catch (err) {
			res.status(500).json(err.message)
		}
	}

	// err
	async getOne(req, res) {
		try {
			const postId = req.params.id
			PostModel.findOneAndUpdate(
				{
					_id: postId,
				},
				{
					$inc: { viewsCount: 1 },
				},
				{
					returnDocument: 'after',
				},
				(err, doc) => {
					if (err) return res.status(502).json(err)
					if (!doc) return res.status(404).json(err)
					res.json(doc)
				}
			)
		} catch (err) {
			res.status(500).json(err.message)
		}
	}

	async delete(req, res) {
		try {
			const postId = req.params.id
			// console.log(postId)
			PostModel.findOneAndDelete(
				{
					_id: postId,
				},
				(err, doc) => {
					if (err) return res.status(502).json(err)
					if (!doc) return res.status(404).json(err)
					res.json(doc)
				}
			)
		} catch (err) {
			res.status(500).json(err.message)
		}
	}

	async update(req, res) {
		try {
			const postId = req.params.id

			const posts = await PostModel.updateOne(
				{
					_id: postId,
				},
				{
					title: req.body.title,
					text: req.body.text,
					tags: req.body.tags,
					user: req.userId,
				}
			)
			res.json(posts)
		} catch (err) {
			res.status(500).json(err.message)
		}
	}
}

export default new PostsController()
