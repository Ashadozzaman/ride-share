### **How to Configure MailDev in Laravel (For Local Email Testing)**

MailDev is a simple SMTP server that lets you capture emails in your local development environment without sending them to real email addresses. Here's how to set it up in Laravel.

---

### **Step 1: Install MailDev**

You need **Node.js** installed. Run the following command to install MailDev globally:

```bash
npm install -g maildev
```

---

### **Step 2: Start MailDev**

Run this command to start MailDev:

```bash
maildev
```

This will start MailDev, and you can view emails at:  
📌 **URL:** [http://localhost:1080](http://localhost:1080)

By default, MailDev listens on **port 1025** for SMTP and **port 1080** for the web interface.

---

### **Step 3: Configure Laravel to Use MailDev**

Update your `.env` file with the following mail settings:

```env
MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="Ride Share"
```

Since MailDev doesn’t require authentication, set `MAIL_USERNAME` and `MAIL_PASSWORD` to `null`.

---

### **Step 4: Test Sending an Email**

Now, send a test email from Laravel using **Tinker**:

```bash
php artisan tinker
```

Then run:

```php
Mail::to('test@example.com')->send(new App\Mail\OtpMail(123456));
```

Now, open **MailDev UI** at [http://localhost:1080](http://localhost:1080), and you should see the email there.

---

### **Step 5: Run MailDev in the Background (Optional)**

If you want to keep MailDev running in the background, use:

```bash
maildev --background
```

To stop it, use:

```bash
maildev --quit
```

---

### **Done! 🎉**

Now your Laravel app can send emails locally using MailDev! 🚀
