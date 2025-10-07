// Email Service using Resend
// SECURITY: See SECURITY_ANALYSIS.md Section 4.3, 6.1

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface SendVerificationEmailParams {
  to: string;
  organizationName: string;
  verificationToken: string;
}

export async function sendVerificationEmail({
  to,
  organizationName,
  verificationToken,
}: SendVerificationEmailParams) {
  const verificationUrl = `${APP_URL}/verifiera-epost?token=${verificationToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Verifiera din e-postadress - Kollektivly',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .button:hover { background: #2563eb; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Välkommen till Kollektivly!</h1>
              </div>
              <div class="content">
                <p>Hej ${organizationName},</p>

                <p>Tack för att du registrerade din organisation på Kollektivly - plattformen som kopplar samman företag med verifierade CSR-projekt.</p>

                <p>För att slutföra registreringen, vänligen verifiera din e-postadress genom att klicka på knappen nedan:</p>

                <div style="text-align: center;">
                  <a href="${verificationUrl}" class="button">Verifiera e-postadress</a>
                </div>

                <p style="color: #6b7280; font-size: 14px;">Eller kopiera och klistra in denna länk i din webbläsare:<br/>
                <a href="${verificationUrl}" style="color: #3b82f6;">${verificationUrl}</a></p>

                <p><strong>Länken är giltig i 24 timmar.</strong></p>

                <p>Efter verifiering kommer en av våra administratörer att granska din ansökan. Du kommer att få ett mejl när ditt konto är godkänt och du kan börja lägga till projekt.</p>

                <p>Har du frågor? Svara på detta mejl så återkommer vi så snart som möjligt.</p>

                <p>Med vänliga hälsningar,<br/>
                <strong>Kollektivly-teamet</strong></p>
              </div>
              <div class="footer">
                <p>Detta är ett automatiskt mejl från Kollektivly.<br/>
                Om du inte registrerade dig på vår plattform kan du ignorera detta mejl.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send exception:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export interface SendAdminNotificationParams {
  organizationName: string;
  email: string;
  city: string;
}

export async function sendAdminNotification({
  organizationName,
  email,
  city,
}: SendAdminNotificationParams) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn('ADMIN_EMAIL not configured, skipping admin notification');
    return { success: false, error: 'Admin email not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `Ny organisation väntar på godkännande - ${organizationName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Ny organisation har verifierat sin e-post</h2>
            <p><strong>Organisation:</strong> ${organizationName}</p>
            <p><strong>E-post:</strong> ${email}</p>
            <p><strong>Stad:</strong> ${city}</p>
            <p>Logga in på admin-panelen för att granska och godkänna ansökan.</p>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Admin notification error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Admin notification exception:', error);
    return { success: false, error: 'Failed to send admin notification' };
  }
}
