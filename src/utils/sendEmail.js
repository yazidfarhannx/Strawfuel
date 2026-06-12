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
    console.log('SEND TO:', to);

    const response =
      await resend.emails.send({
        from: 'onboarding@resend.dev',

        to: [to],

        subject,

        html: `
          <h1>${subject}</h1>
          <p>${text}</p>
        `,
      });

    console.log(
      'RESEND RESPONSE:',
      response
    );

    return response;
  } catch (error) {
    console.log(
      'RESEND ERROR:',
      error
    );

    throw error;
  }
};

module.exports = sendEmail;