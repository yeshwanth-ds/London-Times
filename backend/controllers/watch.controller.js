
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { sendDeliveredWatchEmailWithAttachment, sendDueWatchServicesEmail } from '../mailtrap/emails.js';
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

export const getWatchServiceByPhoneNo = async (req, res) => {
  const { customerPhoneNumber } = req.params;  // Get the phone number from request parameters


  try {
    // Find the watch service by phone number
    const service = await WatchService.findOne({ customerPhoneNumber });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'No watch service found with the given phone number.',
      });
    }

    // Respond with the retrieved watch service data
    res.status(200).json({
      success: true,
      watchService: service,
    });
  } catch (error) {
    console.error('Error retrieving watch service by phone number:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve watch service by phone number.',
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
    // Validate required fields (exclude customerName)
    if (!billNo || !watchType || !serviceType || !estimatedCompletionDate || cost === undefined) {
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
      customerName: customerName || '',  // Set to empty if not provided
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
export const getWatchServicesWithUpcomingEstimation = async (req, res) => {
  try {
    // Find all watch services that match the criteria
    const services = await WatchService.find({
      serviceStatus: { $in: ['Pending', 'In Progress'] }  // Status is either Pending or In Progress
    });

    // Extract the billNo, customerPhoneNumber, description, and estimatedCompletionDate from each service
    const serviceDetails = services.map(service => ({
      billNo: service.billNo,
      customerPhoneNumber: service.customerPhoneNumber,
      description: service.description,
      estimatedCompletionDate: service.estimatedCompletionDate,  // Include estimated completion date
    }));

    // Hardcoded email
    const email = process.env.ADMIN_EMAIL;

    // Try to send email with the list of service details
    try {
      await sendDueWatchServicesEmail(email, serviceDetails);
      res.status(200).json({
        success: true,
        message: 'Email sent successfully with upcoming watch service estimations!',
        serviceDetails,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send email with upcoming watch service estimations.',
        serviceDetails,  // Include the service details in case the email failed but retrieval was successful
      });
    }
  } catch (error) {
    console.error('Error retrieving watch services with upcoming estimations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to retrieve watch services with upcoming estimations.',
      error: error.message,
    });
  }
};



// Controller to send a report of delivered watch services via email and delete delivered items
export const sendDeliveredWatchServicesReport = async (req, res) => {
  try {
    const services = await WatchService.find({ serviceStatus: 'Delivered' });
    
    if (services.length === 0) {
      return res.status(404).json({ success: false, message: 'No delivered watch services found.' });
    }

    const doc = new PDFDocument();
    const filePath = path.resolve('./delivered_watch_services_report.pdf');
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Get current date and time for the report header
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    // Report Header with date and time
    doc.fontSize(16).text('Delivered Watch Services Report', { align: 'center' });
    doc.fontSize(10).text(`Report generated on: ${formattedDate} at ${formattedTime}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text('Details of Delivered Watch Services:');
    doc.moveDown();

    // Iterate over each service and add its details
    services.forEach((service, index) => {
      doc.fontSize(12).text(`Service #${index + 1}`, { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10)
        .text(`Bill No: ${service.billNo}`)
        .text(`Customer Name: ${service.customerName}`)
        .text(`Customer Email: ${service.customerEmail || 'N/A'}`)
        .text(`Customer Phone Number: ${service.customerPhoneNumber || 'N/A'}`)
        .text(`Watch Type: ${service.watchType}`)
        .text(`Brand: ${service.brand || 'N/A'}`)
        .text(`Model: ${service.model || 'N/A'}`)
        .text(`Service Type: ${service.serviceType}`)
        .text(`Received Date: ${service.receivedDate.toDateString()}`)
        .text(`Estimated Completion Date: ${service.estimatedCompletionDate.toDateString()}`)
        .text(`Service Status: ${service.serviceStatus}`)
        .text(`Cost: $${service.cost}`)
        .text(`Description: ${service.description || 'No additional details'}`);
      doc.moveDown(1);
    });

    doc.end();

    writeStream.on('finish', async () => {
      try {
        const subject = 'Delivered Watch Services Report';
        const message = '<p>Please find attached the report of delivered watch services.</p>';

        const email = process.env.ADMIN_EMAIL;

        await sendDeliveredWatchEmailWithAttachment(email, subject, message, filePath);

        fs.unlinkSync(filePath);

        // Delete delivered services after successful email sending
        await WatchService.deleteMany({ serviceStatus: 'Delivered' });

        res.status(200).json({
          success: true,
          message: 'Delivered watch services report generated, sent via email, and records deleted successfully!',
        });
      } catch (error) {
        console.error('Error sending delivered watch services email or deleting records:', error);
        res.status(500).json({
          success: false,
          message: 'Server error, unable to complete email sending or record deletion.',
          error: error.message,
        });
      }
    });

    writeStream.on('error', (error) => {
      console.error('Error writing PDF file:', error);
      res.status(500).json({
        success: false,
        message: 'Server error, unable to generate PDF file.',
        error: error.message,
      });
    });
  } catch (error) {
    console.error('Error generating delivered watch services report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to generate delivered watch services report.',
      error: error.message,
    });
  }
};
