export const emailVerificationHtmlTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td align="center" bgcolor="#f97316" style="padding: 40px 0;">
        <img src="https://example.com/logo.png" alt="Solar App Logo" width="200" style="display: block;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #333333; font-size: 24px; font-weight: bold; padding-bottom: 20px;">
              Verify Your Email Address
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              Thank you for signing up for SolarKoko. To complete your registration, please use the verification code below:
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#f97316" style="border-radius: 4px;">
                    <span style="font-size: 28px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 15px 30px; display: inline-block;">
                      {{verificationCode}}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              If you didn't request this verification code, please ignore this email or contact our support team <a href="mailto:support@solarkoko.com">support@solarkoko.com</a> if you have any concerns.
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px;">
              Best regards,<br />
              SolarKoko Team
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#f0f0f0" style="padding: 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #888888; font-size: 14px; line-height: 20px;">
              This is an automated message, please do not reply to this email. If you need assistance, please contact our support team.
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0 0 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://facebook.com" style="color: #f97316; text-decoration: none;">Facebook</a>
                  </td>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://twitter.com" style="color: #f97316; text-decoration: none;">Twitter</a>
                  </td>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://instagram.com" style="color: #f97316; text-decoration: none;">Instagram</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
export const loginVerificationHtmlTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td align="center" bgcolor="#f97316" style="padding: 40px 0;">
        <img src="https://example.com/logo.png" alt="Solar App Logo" width="200" style="display: block;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #333333; font-size: 24px; font-weight: bold; padding-bottom: 20px;">
              Verify Your Login
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              We noticed a login attempt to your SolarKoko account from a new device or location. To continue, please enter the verification code below:
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#f97316" style="border-radius: 4px;">
                    <span style="font-size: 28px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 15px 30px; display: inline-block;">
                      {{loginVerificationCode}}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              If you didn't request this verification, please ignore this email or contact our support team at <a href="mailto:support@solarkoko.com">support@solarkoko.com</a>.
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px;">
              Best regards,<br />
              SolarKoko Team
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#f0f0f0" style="padding: 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #888888; font-size: 14px; line-height: 20px;">
              This is an automated message, please do not reply. For assistance, contact our support team.
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0 0 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://facebook.com" style="color: #f97316; text-decoration: none;">Facebook</a>
                  </td>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://twitter.com" style="color: #f97316; text-decoration: none;">Twitter</a>
                  </td>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://instagram.com" style="color: #f97316; text-decoration: none;">Instagram</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;


export const onSuccessVendorRegistrationHtmlTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SolarKoko as a Vendor!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td align="center" bgcolor="#f97316" style="padding: 40px 0;">
        <img src="https://example.com/logo.png" alt="SolarKoko Logo" width="200" style="display: block;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #333333; font-size: 24px; font-weight: bold; padding-bottom: 20px;">
              Welcome to SolarKoko!
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              Dear {{fullName}}, Congratulations! You have successfully registered as a vendor on SolarKoko. We're excited to have you join our community of solar energy providers.
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              You can now start selling your solar panels, inverters, and other solar energy products on our platform. Here's what you can do next:
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 30px;">
              <ul style="color: #666666; font-size: 16px; line-height: 24px;">
                <li>Set up your vendor profile</li>
                <li>List your products</li>
                <li>Set competitive prices</li>
                <li>Manage your inventory</li>
                <li>Track your sales and performance</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#f97316" style="border-radius: 4px;">
                    <a href="https://solarkoko.com/vendor" style="font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 15px 30px; display: inline-block;">
                      Go to Your Dashboard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px; padding-bottom: 30px;">
              If you encounter any issues or have questions, our support team is here to help. Don't hesitate to reach out to us at <a href="mailto:support@solarkoko.com" style="color: #f97316; text-decoration: none;">support@solarkoko.com</a>.
            </td>
          </tr>
          <tr>
            <td style="color: #666666; font-size: 16px; line-height: 24px;">
              We look forward to a bright future together!<br /><br />
              Best regards,<br />
              The SolarKoko Team
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#f0f0f0" style="padding: 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #888888; font-size: 14px; line-height: 20px;">
              This email was sent to {{userEmail}}. If you have any questions, please contact our support team.
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0 0 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://facebook.com/solarkoko" style="color: #f97316; text-decoration: none;">Facebook</a>
                  </td>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://twitter.com/solarkoko" style="color: #f97316; text-decoration: none;">Twitter</a>
                  </td>
                  <td style="text-align: center; padding: 0 10px;">
                    <a href="https://instagram.com/solarkoko" style="color: #f97316; text-decoration: none;">Instagram</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`