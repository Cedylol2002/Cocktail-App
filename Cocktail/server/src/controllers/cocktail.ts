import { Request, Response } from 'express';
import { Types } from 'mongoose';
import CocktailSchema from '../models/cocktails';
import ZutatSchema from '../models/zutat';
import Utensilien from '../models/Utensilien';

const getRezept = async (req: Request, res: Response): Promise<any> => {
	CocktailSchema.findOne({ name: req.params.name })
		.lean()
		.exec(function (err, doc) {
			if (err) {
				return res.status(500).json({
					message: err.message,
					err,
				});
			}
			if (!doc) {
				return res.status(404).json({
					message: 'Not found',
				});
			}
			return res.status(200).send(doc);
		});
};
const getAllRezepte = async (req: Request, res: Response): Promise<any> => {
	CocktailSchema.find({}).exec(function (err, docs) {
		if (err) {
			return res.status(500).json({
				message: err.message,
				err,
			});
		}
		return res.status(200).json(docs);
	});
};

const getRandomRezept = async (req: Request, res: Response): Promise<any> => {
	CocktailSchema.find({})
		.lean()
		.exec(function (err, docs) {
			if (err) {
				return res.status(500).json({
					message: err.message,
					err,
				});
			}
			return res.status(200).send(docs[Math.floor(Math.random() * docs.length)]);
		});
};

const createRezept = async (req: Request, res: Response): Promise<any> => {
	const { bild, name, alkohol, diff, anleitung, utensil, zutaten } = req.body;
	const _cocktail = new CocktailSchema({
		_id: new Types.ObjectId(),
		bild,
		name,
		alkohol,
		diff,
		anleitung,
		utensil,
		zutaten,
	});
	return await _cocktail
		.save()
		.then((cocktail) => {
			return res.status(201).json({
				cocktail,
			});
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error,
			});
		});
};
const updateRezept = async (req: Request, res: Response): Promise<any> => {
	await CocktailSchema.findOneAndUpdate({ name: req.params.name }, req.body, {
		new: true,
	})
		.then((updatedRezept) => res.status(200).send(updatedRezept))
		.catch((err) =>
			res.status(500).json({
				message: err.message,
				err,
			}),
		);
};
const getZutat = async (req: Request, res: Response): Promise<any> => {
	ZutatSchema.findOne({ name: req.params.name })
		.lean()
		.exec(function (err, doc) {
			if (err) {
				return res.status(500).json({
					message: err.message,
					err,
				});
			}
			if (!doc) {
				return res.status(404).json({
					message: 'Not found',
				});
			}
			return res.status(200).send(doc);
		});
};
const getAllZutat = async (req: Request, res: Response): Promise<any> => {
	ZutatSchema.find({})
		.lean()
		.exec(function (err, doc) {
			if (err) {
				return res.status(500).json({
					message: err.message,
					err,
				});
			}
			return res.status(200).send(doc);
		});
};
const createZutat = async (req: Request, res: Response): Promise<Response> => {
	const { name, alkohol, bestand, bestand_einheit } = req.body;
	const _zutat = new ZutatSchema({
		_id: new Types.ObjectId(),
		name,
		alkohol,
		bestand,
		bestand_einheit,
	});
	return await _zutat
		.save()
		.then((zutat) => {
			return res.status(201).json({
				zutat,
			});
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error,
			});
		});
};
const updateZutat = async (req: Request, res: Response): Promise<any> => {
	await ZutatSchema.findOneAndUpdate({ name: req.params.name }, req.body, {
		new: true,
	})
		.then((updatedZutat) => res.status(200).send(updatedZutat))
		.catch((err) =>
			res.status(500).json({
				message: err.message,
				err,
			}),
		);
};

const getAllUtensil = async (req: Request, res: Response): Promise<any> => {
	Utensilien.find({})
		.select('-_id')
		.exec(function (err, doc) {
			if (err) {
				return res.status(500).json({
					message: err.message,
					err,
				});
			}
			return res.status(200).json(doc);
		});
};

export default {
	getRezept,
	createRezept,
	updateRezept,
	getZutat,
	createZutat,
	updateZutat,
	getAllRezepte,
	getRandomRezept,
	getAllZutat,
	getAllUtensil,
};
