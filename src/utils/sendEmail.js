const { Resend } = require('resend');

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendEmail = async (
  to,
  subject,
  text
) => {
  try {
    const response =
      await resend.emails.send({
        from:
          'onboarding@resend.dev',

        to,

        subject,

        html: `
          <div style="font-family:sans-serif">
            <h1>StrawFuel OTP</h1>

            <p>Kode OTP Anda:</p>

            <h2>${text}</h2>

            <p>Berlaku 15 menit.</p>
          </div>
        `,
      });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;