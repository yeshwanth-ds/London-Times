import { transporter, sender } from './mailtrap.config.js';  // Now imports transporter from updated config
import { DUE_WATCH_SERVICES_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './emailTemplates.js';


export const sendDeliveredWatchEmailWithAttachment = async (email, subject, message, filePath) => {
    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: subject,
            html: message,
            attachments: [
                {
                    filename: 'Delivered_Watch_Services_Report.pdf',
                    path: filePath,
                },
            ],
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent with attachment: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email with attachment:", error);
        throw new Error(`Error sending email with attachment: ${error.message}`);
    }
};


// Function to send a verification email
export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`, // Sender address
            to: email, // Recipient's email
            subject: "Verify your email", // Subject of the email
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), // Email body
        });
        console.log("Verification email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

// Function to send a welcome email after successful email verification
export const sendWelcomeEmail = async (email, name) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`, // Sender address
            to: email, // Recipient's email
            subject: "Welcome Email", // Subject of the email
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name), // Email body
        });
        console.log("Welcome email sent: %s", info.messageId);
    } catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

// Function to send a password reset email with a reset link
export const sendPasswordResetEmail = async (email, resetURL) => {
    // Create recipient array
    const recipient = email;

    try {
        // Send the email using nodemailer transporter
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`, // Sender's name and email
            to: recipient, // Recipient's email
            subject: "Reset your password", // Subject of the email
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // Email body with reset URL
        });

        // Log the message ID (optional)
        console.log("Password reset email sent: %s", info.messageId);
    } catch (error) {
        console.error(`Error sending password reset email:`, error);

        // Throw error if something goes wrong
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
};


// Function to send a success email after a password reset
export const sendResetSuccessfulEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`, // Sender address
            to: email, // Recipient's email
            subject: "Password reset successful", // Subject of the email
            html: PASSWORD_RESET_SUCCESS_TEMPLATE, // Email body
        });
        console.log("Password reset success email sent: %s", info.messageId);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};export const sendDueWatchServicesEmail = async (email, serviceDetails) => {
    try {
      const htmlContent = DUE_WATCH_SERVICES_TEMPLATE(serviceDetails);
  
      const info = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: email,
        subject: "Upcoming Watch Service Due Dates",
        html: htmlContent,
      });
  
    } catch (error) {
      console.error("Error sending due watch services email:", error);
      throw new Error(`Error sending due watch services email: ${error}`);
    }
  };
  
  
