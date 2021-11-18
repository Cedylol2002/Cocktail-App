import { Router } from 'express';
import controller from '../controllers/cocktail'; // TODO
import validation from '../middleware/validation';
import { CocktailSchema, ZutatSchema } from '../interfaces/yupValidiationModels';
const router = Router();

//Rezept routes
router.get('/rezept/:name', controller.getRezept);
router.get('/rezepte/all', controller.getAllRezepte);
router.get('/random/rezept', controller.getRandomRezept);
router.post('/rezept/:name', validation(CocktailSchema), controller.updateRezept);
router.post('/rezept', validation(CocktailSchema), controller.createRezept);

//Zutaten routes
router.get('/zutat/:name', controller.getZutat);
router.get('/zutaten/all', controller.getAllZutat);
router.post('/zutat/:name', validation(ZutatSchema), controller.updateZutat);
router.post('/zutat', validation(ZutatSchema), controller.createZutat);

//Utensilien
router.get('/utensil/all', controller.getAllUtensil);

export { router };
