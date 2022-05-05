import nodemailer from "nodemailer";
import { google } from "googleapis";
import {
	GMAIL_CLIENT_ID,
	GMAIL_CLIENT_SECRET,
	GMAIL_REDIRECT_URI,
	GMAIL_REFRESH_TOKEN,
	GMAIL_EMAIL_FROM,
} from "../config";

const oauth2client = new google.auth.OAuth2(
	GMAIL_CLIENT_ID,
	GMAIL_CLIENT_SECRET,
	GMAIL_REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

class MailService {
	async sendMail(email, subject, body) {
		try {
			const GMAIL_ACCESS_TOKEN = await oauth2client.getAccessToken();

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: GMAIL_EMAIL_FROM,
					clientId: GMAIL_CLIENT_ID,
					clientSecret: GMAIL_CLIENT_SECRET,
					refreshToken: GMAIL_REFRESH_TOKEN,
					accessToken: GMAIL_ACCESS_TOKEN,
				},
			});

			const mailOptions = {
				from: "ChatRoom 📧 <fetkelaunde@gmail.com>",
				to: email,
				subject: subject,
				html: body,
			};

			const result = await transporter.sendMail(mailOptions);
			return result;
		} catch (error) {
			return error;
		}
	}
}
export default new MailService();
