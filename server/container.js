// Wires real dependencies together in one place. Tests build the same pieces
// with fakes instead (see tests/).
import { config } from './config/env.js';
import { pingDatabase } from './config/db.js';
import * as inquiryModel from './models/inquiryModel.js';
import { sendNotification } from './services/emailService.js';
import { createSubmissionService } from './services/submissionService.js';
import { createSubmissionController } from './controllers/submissionController.js';
import { createHealthController } from './controllers/healthController.js';
import { createSpamGuard } from './middleware/spamGuard.js';
import { logger } from './utils/logger.js';

const submissionService = createSubmissionService({ inquiryModel, sendNotification, logger });

export const container = {
  submissionController: createSubmissionController(submissionService),
  healthController: createHealthController({ pingDatabase }),
  spamGuard: createSpamGuard({ minFillMs: config.minFormFillMs, logger }),
};
