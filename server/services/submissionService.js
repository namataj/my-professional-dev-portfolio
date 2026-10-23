import { inquiryEmail, contactEmail } from './emailTemplates.js';

// Business logic for form submissions: save first, then notify.
// Dependencies are passed in so the logic can be tested without a real
// database or mail server (see tests/). Real wiring lives in container.js.
export function createSubmissionService({ inquiryModel, sendNotification, logger }) {
  async function notify(email) {
    try {
      await sendNotification(email);
    } catch (err) {
      // The submission is already saved, so a mail outage shouldn't fail the
      // request. Log it so it can be followed up.
      logger.error('Notification email failed:', err.message);
    }
  }

  return {
    async createInquiry(inquiry) {
      const { id } = await inquiryModel.insertInquiry(inquiry);
      await notify(inquiryEmail(inquiry, id));
      return { id };
    },

    async createContactMessage(message) {
      const { id } = await inquiryModel.insertContactMessage(message);
      await notify(contactEmail(message, id));
      return { id };
    },
  };
}
