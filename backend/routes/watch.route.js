import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  addWatchService,
  getAllWatchServices,
  getPendingWatchServices,
  getInProgressWatchServices,
  getCompletedWatchServices,
  getDeliveredWatchServices,
  getWatchServiceByBillNo,
  updateWatchServiceStatus,
  getWatchServicesWithUpcomingEstimation,
} from '../controllers/watch.controller.js';

const router = express.Router();

// Route to add a new watch service
router.post("/newWatchService", verifyToken, addWatchService);

router.get('/watchService/:billNo',verifyToken, getWatchServiceByBillNo);

router.put('/updateStatus/:billNo',verifyToken, updateWatchServiceStatus);

router.get('/getUpcomingEstimatedOrders',verifyToken, getWatchServicesWithUpcomingEstimation);

// Routes to get watch services based on different statuses
router.get("/allWatchServices", verifyToken, getAllWatchServices);
router.get("/pendingWatchServices", verifyToken, getPendingWatchServices);
router.get("/inProgressWatchServices", verifyToken, getInProgressWatchServices);
router.get("/completedWatchServices", verifyToken, getCompletedWatchServices);
router.get("/deliveredWatchServices", verifyToken, getDeliveredWatchServices);

export default router;
