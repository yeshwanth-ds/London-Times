export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6; /* Light background color */
    }
    .header {
      background-color: #1F2937; /* Dark background color */
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
    }
    .content {
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .verification-code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #0EA5E9; /* Highlight color */
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email with CHRONO</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div class="verification-code">{verificationCode}</div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn’t create an account with us, please ignore this email.</p>
    <p>Best regards,<br>The CHRONO Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6;
    }
    .header {
      background-color: #1F2937;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
    }
    .content {
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .success-icon {
      background-color: #0EA5E9;
      color: white;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      display: inline-block;
      font-size: 30px;
      text-align: center;
      margin: 30px auto;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Successful</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Your password has been successfully reset for your CHRONO account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div class="success-icon">✓</div>
    </div>
    <p>If you did not initiate this reset, please contact support immediately.</p>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>The CHRONO Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6;
    }
    .header {
      background-color: #1F2937;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
    }
    .content {
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .reset-button {
      background-color: #0EA5E9;
      color: #FFFFFF;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      display: inline-block;
      text-align: center;
      margin: 20px auto;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We received a request to reset your CHRONO account password. If this was not you, please ignore this message.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" class="reset-button">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>The CHRONO Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CHRONO</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6;
    }
    .header {
      background-color: #1F2937;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
    }
    .content {
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .welcome-message {
      font-size: 24px;
      font-weight: bold;
      color: #0EA5E9;
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to CHRONO</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <div class="welcome-message">Welcome to the CHRONO community!</div>
    <p>Thank you for joining CHRONO. We’re excited to have you with us and look forward to providing a seamless experience.</p>
    <p>If you have any questions or need support, please feel free to reach out to us.</p>
    <p>Best regards,<br>The CHRONO Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const DUE_WATCH_SERVICES_TEMPLATE = (billNos) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upcoming Due Dates</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6;
    }
    .header {
      background-color: #1F2937;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
    }
    .content {
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .due-message {
      font-size: 20px;
      color: #0EA5E9;
      text-align: center;
      margin: 20px 0;
    }
    .bill-list {
      margin: 20px 0;
      padding-left: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Upcoming Due Dates</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <div class="due-message">The following watch services are due within the next few days:</div>
    <ul class="bill-list">
      ${billNos.map(billNo => `<li>Bill No: ${billNo}</li>`).join('')}
    </ul>
    <p>Please ensure these services are completed in time.</p>
    <p>Best regards,<br>The CHRONO Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;

