import { PieceAuthHelpers, createPiece, PieceAction, PieceContext } from '../../../framework/src/lib/piece-framework';

export const googleSheetsPiece = createPiece({
  displayName: 'Google Sheets',
  description: 'Read and write data to Google Sheets',
  logoUrl: 'https://cdn.yflow.com/pieces/google-sheets.png',
  authors: ['yflow'],
  categories: ['PRODUCTIVITY'],
  auth: PieceAuthHelpers.ApiKey({
    apiKey: 'GOOGLE_API_KEY',
    headerName: 'Authorization',
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
        const apiKey = context.auth.apiKey;

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`,
          {
            headers: {
              'Content-Type': 'application/json',
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
        const apiKey = context.auth.apiKey;

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`,
          {
            method: 'POST',
            headers: {
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
