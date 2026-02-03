import { PieceAuthHelpers, createPiece, PieceAction, PieceContext } from '../../../framework/src/lib/piece-framework';

export const googleSheetsPiece = createPiece({
  displayName: 'Google Sheets',
  description: 'Read and write data to Google Sheets',
  logoUrl: 'https://cdn.yflow.com/pieces/google-sheets.png',
  authors: ['yflow'],
  categories: ['PRODUCTIVITY'],
  auth: PieceAuthHelpers.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }),
  actions: [
    {
      name: 'read_rows',
      displayName: 'Read Rows',
      description: 'Read rows from a Google Sheet',
      props: {
        spreadsheetId: {
          type: 'text',
          displayName: 'Spreadsheet ID',
          required: true,
        },
        range: {
          type: 'text',
          displayName: 'Range',
          required: true,
          description: 'e.g., Sheet1!A1:C10',
        },
      },
      async run(context: PieceContext) {
        const { spreadsheetId, range } = context.propsValue;
        const accessToken = context.auth.access_token;

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        return {
          values: data.values || [],
          range: data.range,
        };
      },
    },
    {
      name: 'append_row',
      displayName: 'Append Row',
      description: 'Append a new row to a Google Sheet',
      props: {
        spreadsheetId: {
          type: 'text',
          displayName: 'Spreadsheet ID',
          required: true,
        },
        range: {
          type: 'text',
          displayName: 'Range',
          required: true,
          description: 'e.g., Sheet1!A1',
        },
        values: {
          type: 'json',
          displayName: 'Values',
          required: true,
          description: 'Array of values to append',
        },
      },
      async run(context: PieceContext) {
        const { spreadsheetId, range, values } = context.propsValue;
        const accessToken = context.auth.access_token;

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: Array.isArray(values) ? values : [values],
            }),
          }
        );

        const data = await response.json();

        return {
          updatedRange: data.updates?.updatedRange,
          updatedRows: data.updates?.updatedRows,
        };
      },
    },
  ],
  triggers: [],
});
