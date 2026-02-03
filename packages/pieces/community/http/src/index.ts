import { PieceAuthHelpers, createPiece, PieceAction, PieceContext } from '../../../framework/src/lib/piece-framework';

export const httpPiece = createPiece({
  displayName: 'HTTP Request',
  description: 'Make HTTP requests to any API',
  logoUrl: 'https://cdn.yflow.com/pieces/http.png',
  authors: ['yflow'],
  categories: ['DEVELOPER_TOOLS'],
  auth: PieceAuthHelpers.None(),
  actions: [
    {
      name: 'make_request',
      displayName: 'Make HTTP Request',
      description: 'Send HTTP request to specified URL',
      props: {
        url: {
          type: 'text',
          displayName: 'URL',
          required: true,
        },
        method: {
          type: 'dropdown',
          displayName: 'Method',
          required: true,
          options: [
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
            { label: 'PATCH', value: 'PATCH' },
          ],
          defaultValue: 'GET',
        },
        headers: {
          type: 'json',
          displayName: 'Headers',
          required: false,
        },
        body: {
          type: 'json',
          displayName: 'Body',
          required: false,
        },
      },
      async run(context: PieceContext) {
        const { url, method, headers, body } = context.propsValue;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        return {
          status: response.status,
          statusText: response.statusText,
          data,
        };
      },
    },
  ],
  triggers: [],
});
