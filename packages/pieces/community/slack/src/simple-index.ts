import { PieceAuthHelpers, createPiece, PieceAction, PieceContext } from '../../../framework/src/lib/piece-framework';

export const slackPiece = createPiece({
  displayName: 'Slack',
  description: 'Send messages and interact with Slack',
  logoUrl: 'https://cdn.yflow.com/pieces/slack.png',
  authors: ['yflow'],
  categories: ['COMMUNICATION'],
  auth: PieceAuthHelpers.ApiKey({
    apiKey: 'SLACK_BOT_TOKEN',
    headerName: 'Authorization',
  }),
  actions: [
    {
      name: 'send_message',
      displayName: 'Send Message',
      description: 'Send a message to a Slack channel',
      props: {
        channel: {
          type: 'text',
          displayName: 'Channel',
          required: true,
          description: 'Channel ID or name (e.g., #general)',
        },
        message: {
          type: 'text',
          displayName: 'Message',
          required: true,
        },
      },
      async run(context: PieceContext) {
        const { channel, message } = context.propsValue;
        const token = context.auth.apiKey;
        
        const response = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            channel,
            text: message,
          }),
        });

        const data = await response.json();
        
        if (!data.ok) {
          throw new Error(`Slack API error: ${data.error}`);
        }
        
        return {
          success: true,
          messageId: data.ts,
          channel: data.channel,
        };
      },
    },
  ],
  triggers: [],
});
