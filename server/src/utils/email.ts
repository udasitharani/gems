import nodemailer from "nodemailer";

export async function sendResetPasswordMail(
  to: string,
  token: string,
  firstName: string
) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "noreply@gems.com",
    to,
    subject: "Reset Gems Password",
    html: `
    <main style="padding: 2rem">
      <h3>Reset Your Password.</h3>
      <p>
        Hey ${firstName}!
      </p>
      <p>
        Tap the button below to reset password for your Gems account. If your didn't request a new password, you can safely delete this email.
      </p>

      <a style="color: white">
        <button style="background-color: #1d4ed8; outline: none; border: none; padding: 1rem; border-radius: 0.75rem; margin: auto; display: block; color: #fff; font-size: 1rem;">
          Reset Password
        </button>
      </a>

      <p style="color: grey;">
        If that does not work, try this link:
      </p>
      <a href="http://locahost:3000/reset-password/${token}" style="">http://locahost:3000/reset-password/${token}</a>

      <h5 style="font-weight: 600; margin-top: 2rem;">
        The Gems Team
      </h5>
    </main>
    `,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
