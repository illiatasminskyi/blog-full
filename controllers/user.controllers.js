import UserModel from '../models/User.js'

export const getUsers = async (req, res) => {
	try {
		const posts = await UserModel.find()
		res.json(posts)
	} catch (err) {
		res.status(500).json(err)
	}
}

export const getOneUser = (req, res) => {
	try {
		const userId = req.params.id
		UserModel.findOne({ _id: userId }, (err, doc) => {
			if (err) return res.status(502).json(err)
			if (!doc) return res.status(404).json(err)
			res.json(doc)
		})
	} catch (err) {
		res.status(501).json(err)
	}
}
