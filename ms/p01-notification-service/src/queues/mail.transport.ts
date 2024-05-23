import { config } from '@notifications/config';
import { IEmailLocals } from '@notifications/email.interfaces';
import { emailTemplates } from '@notifications/helpers';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    emailTemplates(template, receiverEmail, locals);
    log.info(`${template} Email sent successfully.`);
  } catch (error) {
    log.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}

export { sendEmail };