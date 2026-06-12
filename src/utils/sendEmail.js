const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // HARUS APP PASSWORD
  },
});

const sendEmail = async (
  to,
  subject,
  otp
) => {
  try {
    const htmlTemplate = `
      <div style="
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        padding: 40px;
      ">

        <div style="
          max-width: 600px;
          margin: auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        ">

          <div style="
            background: #14532d;
            padding: 20px;
            text-align: center;
            color: white;
          ">
            <h1>🌱 StrawFuel Security</h1>
          </div>

          <div style="padding: 30px;">

            <h2>Hello User,</h2>

            <p>
              We received a request related to your StrawFuel account.
            </p>

            <p>
              Use the OTP code below to continue:
            </p>

            <div style="
              text-align: center;
              margin: 30px 0;
            ">
              <span style="
                display: inline-block;
                background: #14532d;
                color: white;
                font-size: 32px;
                letter-spacing: 8px;
                padding: 16px 32px;
                border-radius: 10px;
                font-weight: bold;
              ">
                ${otp}
              </span>
            </div>

            <p>
              ⏳ This OTP will expire in 30 minutes.
            </p>

            <p>
              ⚠️ If you did not request this action,
              please ignore this email immediately.
            </p>

            <hr style="margin: 30px 0;" />

            <p style="
              color: gray;
              font-size: 14px;
            ">
              StrawFuel helps transform agricultural straw waste
              into sustainable alternative energy solutions.
            </p>

          </div>

          <div style="
            background: #f0fdf4;
            padding: 16px;
            text-align: center;
            font-size: 13px;
            color: #444;
          ">
            © 2026 StrawFuel — Sustainable Energy Platform
          </div>

        </div>
      </div>
    `;

    const info =
      await transporter.sendMail({
        from: `"StrawFuel Security" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html: htmlTemplate,
      });

    console.log(
      'EMAIL SENT:',
      info.response
    );
  } catch (error) {
    console.log(
      'EMAIL ERROR:',
      error
    );
  }
};

module.exports = sendEmail;