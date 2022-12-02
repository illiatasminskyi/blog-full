import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

export const register = async (req, res) => {
	try {
		const err = validationResult(req)
		if (!err.isEmpty()) return res.status(400).json(err.array())

		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			fullName: req.body.fullName,
			login: req.body.login,
			email: req.body.email,
			passwordHash: hash,
		})
		const user = await doc.save()

		const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' })

		const { passwordHash, ...userData } = user._doc
		res.json({ ...userData, token })
	} catch (err) {
		res.status(500).json(err.message)
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ login: req.body.login })
		console.log(user)
		if (!user) {
			return res.status(404).json({ message: 'wrong login' })
		}
		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)
		if (!isValidPass) {
			return res.status(400).json({ message: 'wrong password' })
		}
		const token = jwt.sign({ _id: user._id }, 'secret123', {
			expiresIn: '30d',
		})
		const { passwordHash, ...userData } = user._doc
		res.json({ ...userData, token })
	} catch (err) {
		res.status(500).json(err)
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)
		if (!user) {
			return res.status(404).json({ message: 'User is not found' })
		}
		const { passwordHash, ...userData } = user._doc
		res.json(userData)
	} catch (err) {
		res.status(500).json(err)
	}
}
