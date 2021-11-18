import * as yup from 'yup';

// Es wäre cool wenn man Interfaces nutzen kann aber well rip soweit ich das sehe in yup
const CocktailSchema = yup.object().shape({
	bild: yup.string().url().required(),
	name: yup.string().required(),
	alkohol: yup.boolean().required(),
	zutaten: yup.array().required(),
	diff: yup.number().required(),
	anleitung: yup.string().required(),
	utensil: yup.array().nullable(),
});

const ZutatSchema = yup.object({
	name: yup.string().required(),
	alkohol: yup.boolean().nullable(),
	bestand: yup.number().required(),
	bestand_einheit: yup.string().required(),
});
const UtensilSchema = yup.object({
	name: yup.string().required(),
});

const UserRegisterSchema = yup.object({
	username: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(16).required(),
	admin: yup.boolean().default(false).required(),
});

const UserLoginSchema = yup.object({
	username: yup.string().required(),
	password: yup.string().min(8).max(16).required(),
});

const UserChangeNameSchema = yup.object({
	username: yup.string().required(),
});

const UserChangePasswordSchema = yup.object({
	password: yup.string().required(),
});

export { CocktailSchema, ZutatSchema, UserRegisterSchema, UserLoginSchema, UtensilSchema, UserChangePasswordSchema, UserChangeNameSchema };
