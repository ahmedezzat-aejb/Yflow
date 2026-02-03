// @ts-nocheck

import { Command } from 'commander';
import { createActionCommand } from './lib/commands/create-action';
import { createPieceCommand } from './lib/commands/create-piece';
import { createTriggerCommand } from './lib/commands/create-trigger';
import { syncPieceCommand } from './lib/commands/sync-pieces';
import { publishPieceCommand } from './lib/commands/publish-piece';
import { buildPieceCommand } from './lib/commands/build-piece';
import { generateWorkerTokenCommand } from './lib/commands/generate-worker-token';
import { generateTranslationFileForAllPiecesCommand, generateTranslationFileForPieceCommand } from './lib/commands/generate-translation-file-for-piece';

// --- إضافة الأمر الجديد هنا ---
import { generateSberLinkCommand } from './lib/commands/generate-sber-link';

const pieceCommand = new Command('pieces')
  .description('Manage pieces');

pieceCommand.addCommand(createPieceCommand);
pieceCommand.addCommand(syncPieceCommand);
pieceCommand.addCommand(publishPieceCommand);
pieceCommand.addCommand(buildPieceCommand);
pieceCommand.addCommand(generateTranslationFileForPieceCommand);
pieceCommand.addCommand(generateTranslationFileForAllPiecesCommand);

const actionCommand = new Command('actions')
  .description('Manage actions');

actionCommand.addCommand(createActionCommand);

const triggerCommand = new Command('triggers')
  .description('Manage triggers');

triggerCommand.addCommand(createTriggerCommand);

const workerCommand = new Command('workers')
  .description('Manage workers');

workerCommand.addCommand(generateWorkerTokenCommand);

// --- قسم المدفوعات (Sberbank) ---
const paymentCommand = new Command('payments')
  .description('Yflow Payment Gateway Management');

paymentCommand.addCommand(generateSberLinkCommand); // الأمر اللي هينفذ الربط

const program = new Command();

program.version('0.0.1').description('Yflow CLI');

program.addCommand(pieceCommand);
program.addCommand(actionCommand);
program.addCommand(triggerCommand);
program.addCommand(workerCommand);
program.addCommand(paymentCommand); // تسجيل قسم المدفوعات في البرنامج الرئيسي

program.parse(process.argv);
