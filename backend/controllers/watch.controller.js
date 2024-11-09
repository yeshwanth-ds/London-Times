// Import the WatchService model
import { sendDueWatchServicesEmail } from '../mailtrap/emails.js';
import { User } from '../models/user.model.js';
import { WatchService } from '../models/watch.model.js';

// Controller to get a watch service by bill number
export const getWatchServiceByBillNo = async (req, res) => {
  const { billNo } = req.params;  // Get the bill number from request parameters

  try {
    // Find the watch service by bill number
    const service = await WatchService.findOne({ billNo });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'No watch service found with the given bill number.',
      });
    }

    // Respond with the retrieved watch service data
    res.status(200).json({
      success: true,
      watchService: service,
    });
  } catch (error) {
    console.error('Error retrieving watch service by bill number:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve watch service by bill number.',
      error: error.message,
    });
  }
};


// Controller to update the status of a watch service by bill number
export const updateWatchServiceStatus = async (req, res) => {
  const { billNo } = req.params; // Get the bill number from request parameters
  const { status } = req.body;   // Get the new status from the request body

  // Validate that the status provided is one of the allowed values
  const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'Delivered'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Allowed statuses are: Pending, In Progress, Completed, and Delivered.',
    });
  }

  try {
    // Find the watch service by bill number and update its status
    const service = await WatchService.findOneAndUpdate(
      { billNo },
      { serviceStatus: status },
      { new: true } // Return the updated document
    );

    // If no service is found with the given bill number
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'No watch service found with the given bill number.',
      });
    }

    // Respond with the updated watch service data
    res.status(200).json({
      success: true,
      message: `Watch service status updated to ${status} successfully!`,
      watchService: service,
    });
  } catch (error) {
    console.error('Error updating watch service status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to update watch service status.',
      error: error.message,
    });
  }
};



// Controller to get all watch services
export const getAllWatchServices = async (req, res) => {
  try {
    const services = await WatchService.find();
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('Error retrieving all watch services:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve watch services.',
      error: error.message,
    });
  }
};

// Controller to get watch services with status "Pending"
export const getPendingWatchServices = async (req, res) => {
  try {
    const services = await WatchService.find({ serviceStatus: 'Pending' });
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('Error retrieving pending watch services:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve pending watch services.',
      error: error.message,
    });
  }
};

// Controller to get watch services with status "In Progress"
export const getInProgressWatchServices = async (req, res) => {
  try {
    const services = await WatchService.find({ serviceStatus: 'In Progress' });
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('Error retrieving in-progress watch services:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve in-progress watch services.',
      error: error.message,
    });
  }
};

// Controller to get watch services with status "Completed"
export const getCompletedWatchServices = async (req, res) => {
  try {
    const services = await WatchService.find({ serviceStatus: 'Completed' });
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('Error retrieving completed watch services:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve completed watch services.',
      error: error.message,
    });
  }
};

// Controller to get watch services with status "Delivered"
export const getDeliveredWatchServices = async (req, res) => {
  try {
    const services = await WatchService.find({ serviceStatus: 'Delivered' });
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('Error retrieving delivered watch services:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve delivered watch services.',
      error: error.message,
    });
  }
};

// Controller to add a new watch service
export const addWatchService = async (req, res) => {
  const {
    billNo,
    customerName,
    customerEmail,
    customerPhoneNumber,
    watchType,
    brand,
    model,
    serviceType,
    estimatedCompletionDate,
    cost,
    description,
  } = req.body;

  try {
    // Validate required fields
    if (!billNo || !customerName || !watchType || !serviceType || !estimatedCompletionDate || cost === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided.',
      });
    }

    // Check if a watch service with the given billNo already exists
    const existingService = await WatchService.findOne({ billNo });
    if (existingService) {
      return res.status(409).json({
        success: false,
        message: 'A watch service with this bill number already exists.',
      });
    }

    // Create a new WatchService instance
    const newWatchService = new WatchService({
      billNo,
      customerName,
      customerEmail: customerEmail || '',  // Optional fields are set to empty if not provided
      customerPhoneNumber: customerPhoneNumber || '',
      watchType,
      brand: brand || '',
      model,
      serviceType,
      estimatedCompletionDate,
      cost,
      description: description || '',
    });

    // Save the new watch service to the database
    await newWatchService.save();

    // Respond with success and return the created watch service
    res.status(201).json({
      success: true,
      message: 'Watch service added successfully!',
      watchService: newWatchService,
    });
  } catch (error) {
    console.error('Error adding watch service:', error);
    // Send error response
    res.status(500).json({
      success: false,
      message: 'Server error, unable to add watch service.',
      error: error.message,
    });
  }
};


// Controller to get bill numbers of watch services with status "Pending" or "In Progress"
// and the estimated completion date within the next three days
export const getWatchServicesWithUpcomingEstimation = async (req, res) => {
  try {
    // Get the current date and the date for three days from now
    const currentDate = new Date();
    const threeDaysFromNow = new Date(currentDate);
    threeDaysFromNow.setDate(currentDate.getDate() + 3);

    // Find all watch services that match the criteria
    const services = await WatchService.find({
      serviceStatus: { $in: ['Pending', 'In Progress'] },  // Status is either Pending or In Progress
      estimatedCompletionDate: { $gte: currentDate, $lte: threeDaysFromNow },  // Estimated date within the next 3 days
    });

    // Extract the billNo from each service
    const billNos = services.map(service => service.billNo);

    // Hardcoded email
    const email = 'yeshwanthds2002@gmail.com';

    // Send email with the list of bill numbers
    await sendDueWatchServicesEmail(email, billNos);

    // Respond with the array of billNos
    res.status(200).json({
      success: true,
      message: 'Bill numbers of services with upcoming estimations fetched successfully!',
      billNos,
    });
  } catch (error) {
    console.error('Error retrieving watch services with upcoming estimations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve watch services with upcoming estimations.',
      error: error.message,
    });
  }
};

