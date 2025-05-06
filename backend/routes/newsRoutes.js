import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getAllNews,
  getTopNews,
  getSportsNews,
  getEntertainmentNews,
  getCurrentAffairsNews,
  getFullArticle,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/all",isAuthenticated, getAllNews);
router.get("/top", isAuthenticated,getTopNews);
router.get("/sports", isAuthenticated,getSportsNews);
router.get("/entertainment",isAuthenticated, getEntertainmentNews);
router.get("/current-affairs",isAuthenticated, getCurrentAffairsNews);
router.get("/article/:sourceId/:articleId",isAuthenticated, getFullArticle);

// Protected routes can be added here if needed
// router.get("/personalized", isAuthenticated, getPersonalizedNews);

export default router;
