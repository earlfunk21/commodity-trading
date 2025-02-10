export default function EnrollmentRequestVerifyEmailHTML(token: string) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link rel="preload" as="image" href="/static/herman-miller-chair.jpg" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
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
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        mso-font-alt: 'Helvetica';
        src: url(https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fjbvMwCp50PDca1ZL7.woff2) format('woff2');
      }

      * {
        font-family: 'Inter', Helvetica;
      }
    </style>
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        mso-font-alt: 'Helvetica';
        src: url(https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fjbvMwCp50BTca1ZL7.woff2) format('woff2');
      }

      * {
        font-family: 'Inter', Helvetica;
      }
    </style>
  </head>
  <body style="margin:0;margin-left:12px;margin-right:12px">
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;margin-left:auto;margin-right:auto;box-sizing:border-box;padding-top:1rem;padding-bottom:1rem;height:100vh"
    >
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top:16px;margin-bottom:16px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Student Enrollment"
                      height="320"
                      src="https://cancare.b-cdn.net/logo.png"
                      style="display:block;outline:none;border:none;text-decoration:none;width:100%;border-radius:12px;object-fit:cover"
                    />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:32px;text-align:center"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;margin-bottom:16px;font-weight:600;color:rgb(79,70,229)"
                            >
                              Email Verification Required
                            </p>
                            <h1
                              style="margin:0px;margin-top:8px;font-size:36px;line-height:36px;font-weight:600;color:rgb(17,24,39)"
                            >
                              Verify Your Student Account
                            </h1>
                            <p
                              style="font-size:16px;line-height:24px;margin:16px 0;color:rgb(107,114,128)"
                            >
                              Thank you for enrolling! To complete your registration process and access your student account,
                              please click the verification button below.
                            </p>
                            <a
                              href="${process.env.FRONTEND_URL}/enrollment-request-form/payment?token=${token}"
                              style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;margin-top:16px;border-radius:8px;background-color:rgb(79,70,229);padding:12px 40px;font-weight:600;color:rgb(255,255,255);"
                              target="_blank"
                              ><span
                                style="max-width:100%;display:inline-block;line-height:120%;mso-text-raise:9px"
                                >Verify Email</span
                              ></a
                            >
                            <p
                              style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(107,114,128)"
                            >
                              If you didn't request this verification, please ignore this email.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
}
