<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Ride Share</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .otp-code {
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
            display: inline-block;
            padding: 10px;
            border: 2px dashed #007bff;
            border-radius: 5px;
            background: #f8f9fa;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Email Verification</div>
        <p>Dear {{$user->name}},</p>
        <p>Thank you for signing up for Ride Share! Please use the OTP below to verify your email address:</p>
        <div class="otp-code">{{$user->otp_code}}</div>
        <p>This OTP is valid for only 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">© 2025 Ride Share. All rights reserved.</div>
    </div>
</body>
</html>
