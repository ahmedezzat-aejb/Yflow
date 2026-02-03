import { PieceAuthHelpers, createPiece, PieceAction, PieceContext } from '../../../framework/src/lib/piece-framework';

export const notionPiece = createPiece({
  displayName: 'Notion',
  description: 'Create and update pages in Notion',
  logoUrl: 'https://cdn.yflow.com/pieces/notion.png',
  authors: ['yflow'],
  categories: ['PRODUCTIVITY'],
  auth: PieceAuthHelpers.ApiKey({
    apiKey: 'NOTION_API_KEY',
    headerName: 'Authorization',
  }),
  actions: [
    {
      name: 'create_page',
      displayName: 'Create Page',
      description: 'Create a new page in Notion',
      props: {
        databaseId: {
          type: 'text',
          displayName: 'Database ID',
          required: true,
        },
        title: {
          type: 'text',
          displayName: 'Page Title',
          required: true,
        },
      },
      async run(context: PieceContext) {
        const { databaseId, title } = context.propsValue;
        const apiKey = context.auth.apiKey;
        
        const response = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
          },
          body: JSON.stringify({
            parent: {
              database_id: databaseId,
            },
            properties: {
              title: {
                title: [
                  {
                    text: {
                      content: title,
                    },
                  },
                ],
              },
            },
          }),
        });

        const data = await response.json();
        
        if (response.status !== 200) {
          throw new Error(`Notion API error: ${data.message}`);
        }
        
        return {
          pageId: data.id,
          url: data.url,
          title: title,
        };
      },
    },
  ],
  triggers: [],
});
