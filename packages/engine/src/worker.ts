import { Worker } from 'bullmq';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface FlowStep {
  id: string;
  type: 'trigger' | 'action';
  pieceId: string;
  name: string;
  config: any;
  position: { x: number; y: number };
}

interface FlowJob {
  flowName: string;
  flowId: string;
  projectId: string;
  steps: FlowStep[];
}

// WebSocket client for real-time updates
const socket: Socket = io(process.env.WEBSOCKET_URL || 'http://localhost:3000', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('🔌 Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected from WebSocket server');
});

const worker = new Worker('flow-queue', async (job) => {
  const { flowName, flowId, projectId, steps } = job.data as FlowJob;
  console.log(`⚡ جاري تنفيذ الفلو: ${flowName} (ID: ${flowId})`);
  console.log(`📋 عدد الخطوات: ${steps.length}`);

  // Emit flow started event
  socket.emit('join-flow', { flowId, projectId });
  socket.emit('flow-started', {
    flowId,
    projectId,
    flowName,
    status: 'started',
    timestamp: new Date().toISOString(),
  });

  for (const step of steps) {
    console.log(`🔄 تنفيذ خطوة: ${step.name} (${step.pieceId})`);

    // Emit step started event
    socket.emit('step-started', {
      flowId,
      projectId,
      stepId: step.id,
      stepName: step.name,
      pieceId: step.pieceId,
      status: 'started',
      timestamp: new Date().toISOString(),
    });

    try {
      // HTTP Request Piece - أول Piece حقيقية
      if (step.pieceId === 'http-request') {
        const { url, method = 'GET', headers = {}, body } = step.config;
        console.log(`🌐 تنفيذ طلب ${method} إلى: ${url}`);

        const response = await axios({
          method,
          url,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          data: body,
          timeout: 30000 // 30 seconds timeout
        });

        console.log(`✅ تم التنفيذ بنجاح! Status: ${response.status}`);
        console.log(`📊 Response:`, response.data);

        // Emit step completed event
        socket.emit('step-completed', {
          flowId,
          projectId,
          stepId: step.id,
          stepName: step.name,
          pieceId: step.pieceId,
          status: 'completed',
          result: {
            status: response.status,
            data: response.data,
          },
          timestamp: new Date().toISOString(),
        });
      }

      // Google Sheets Pieces
      else if (step.pieceId.startsWith('google-sheets-')) {
        console.log(`📊 تنفيذ Google Sheets Piece: ${step.pieceId}`);
        // هنا هنضيف الـ Google Sheets Integration لاحقاً
        console.log(`🔧 Google Sheets Integration قيد التطوير...`);
      }

      // Notion Pieces 🍌
      else if (step.pieceId.startsWith('notion-')) {
        console.log(`🍌 تنفيذ Notion Piece: ${step.pieceId}`);
        // هنا هنضيف الـ Notion Integration لاحقاً
        console.log(`🔧 Notion Integration قيد التطوير...`);
      }

      // Slack Pieces
      else if (step.pieceId.startsWith('slack-')) {
        console.log(`💬 تنفيذ Slack Piece: ${step.pieceId}`);
        // هنا هنضيف الـ Slack Integration لاحقاً
        console.log(`🔧 Slack Integration قيد التطوير...`);
      }

      // Email Pieces
      else if (step.pieceId.includes('email') || step.pieceId.includes('gmail')) {
        console.log(`📧 تنفيذ Email Piece: ${step.pieceId}`);
        // هنا هنضيف الـ Email Integration لاحقاً
        console.log(`🔧 Email Integration قيد التطوير...`);
      }

      // Social Media Pieces
      else if (['twitter', 'instagram', 'linkedin'].some(service => step.pieceId.includes(service))) {
        console.log(`📱 تنفيذ Social Media Piece: ${step.pieceId}`);
        // هنا هنضيف الـ Social Media Integration لاحقاً
        console.log(`🔧 Social Media Integration قيد التطوير...`);
      }

      // E-commerce Pieces
      else if (['shopify', 'stripe'].some(service => step.pieceId.includes(service))) {
        console.log(`🛒 تنفيذ E-commerce Piece: ${step.pieceId}`);
        // هنا هنضيف الـ E-commerce Integration لاحقاً
        console.log(`🔧 E-commerce Integration قيد التطوير...`);
      }

      // GitHub Pieces
      else if (step.pieceId.startsWith('github-')) {
        console.log(`💻 تنفيذ GitHub Piece: ${step.pieceId}`);
        // هنا هنضيف الـ GitHub Integration لاحقاً
        console.log(`🔧 GitHub Integration قيد التطوير...`);
      }

      else {
        console.log(`⚠️ Piece غير معروف: ${step.pieceId}`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ فشل تنفيذ الخطوة "${step.name}":`, errorMessage);

      // Emit step failed event
      socket.emit('step-failed', {
        flowId,
        projectId,
        stepId: step.id,
        stepName: step.name,
        pieceId: step.pieceId,
        status: 'failed',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      });

      // نكمل التنفيذ حتى لو خطوة فشلت
    }
  }

  console.log(`🎉 انتهى تنفيذ الفلو: ${flowName}`);

  // Emit flow completed event
  socket.emit('flow-completed', {
    flowId,
    projectId,
    flowName,
    status: 'completed',
    timestamp: new Date().toISOString(),
  });

  socket.emit('leave-flow', { flowId });
}, {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
  },
  concurrency: 5 // ينفذ 5 flows في نفس الوقت
});

console.log('🚀 الـ Yflow Engine شغال ومستني الأوامر...');
console.log('📊 متصل بـ Redis على:', process.env.REDIS_HOST || 'localhost:6379');

// Error handling
worker.on('error', (err) => {
  console.error('❌ Worker Error:', err);
});

worker.on('completed', (job) => {
  console.log(`✅ تم إنجاز الـ Job: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ فشل الـ Job ${job?.id}:`, err);
});

export default worker;
