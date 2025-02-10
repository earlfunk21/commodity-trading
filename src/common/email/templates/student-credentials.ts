export default function StudentCredentialsHTML(
  email: string,
  password: string,
) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'Helvetica';
        src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
      }
      * {
        font-family: 'Inter', Helvetica;
      }
    </style>
  </head>
  <body style="margin:0;padding:24px">
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
      <tr>
        <td align="center">
          <img src="https://cancare.b-cdn.net/logo.png" alt="CanCare Logo" style="width:200px;margin-bottom:32px" />
          
          <div style="background-color:#ffffff;border-radius:16px;padding:32px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
            <h1 style="color:#111827;font-size:24px;margin-bottom:24px;text-align:center">Welcome to CanCare!</h1>
            
            <p style="color:#4B5563;font-size:16px;line-height:24px;margin-bottom:24px;text-align:center">
              Your account has been created successfully. Here are your login credentials:
            </p>

            <div style="background-color:#F3F4F6;border-radius:8px;padding:24px;margin-bottom:24px">
              <table width="100%" style="border-collapse:collapse">
                <tr>
                  <td style="padding:8px 0">
                    <strong style="color:#111827">Email:</strong>
                    <span style="color:#4B5563;margin-left:8px">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0">
                    <strong style="color:#111827">Password:</strong>
                    <span style="color:#4B5563;margin-left:8px">${password}</span>
                  </td>
                </tr>
              </table>
            </div>

            <p style="color:#4B5563;font-size:16px;line-height:24px;margin-bottom:24px;text-align:center">
              Please use these credentials to log in to your account. We recommend changing your password after your first login.
            </p>

            <div style="text-align:center">
              <a href="${process.env.FRONTEND_URL}/login" 
                 style="display:inline-block;background-color:#4F46E5;color:#ffffff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600">
                Login to Your Account
              </a>
            </div>
          </div>

          <p style="color:#6B7280;font-size:14px;margin-top:24px;text-align:center">
            If you didn't create an account with CanCare, please ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
