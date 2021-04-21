export default {
  '/folders': {
    post: {
      summary: 'API Endpoint for register folder',
      tags: [ 'Folder' ],
      parameters: [
        {
          in: 'body',
          name: 'folder',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            }
          }
        },
        {
          in: 'header',
          name: 'Authorization',
          schema: {
            type: 'string',
          },
        },
      ],
      responses:{
        200: {
          description: 'Registered'
        },
        400: {
          description: 'Error'
        }
      }
    },
    get: {
      summary: 'API Endpoint for get folders',
      tags: [ 'Folder' ],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          schema: {
            type: 'string',
          },
        },
      ],
      responses:{
        200: {
          description: 'Found'
        },
        400: {
          description: 'Error'
        }
      }
    },
  },
  '/folders/{folderId}': {
    patch: {
      summary: 'API Endpoint for update folder',
      tags: [ 'Folder' ],
      parameters: [
        {
          in: 'path',
          name: 'folderId',
          description: 'id of folder',
          schema: {
            type: 'uuid'
          }
        },
        {
          in: 'body',
          name: 'folder',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            }
          }
        },
        {
          in: 'header',
          name: 'Authorization',
          schema: {
            type: 'string',
          },
        },
      ],
      responses:{
        200: {
          description: 'Updated'
        },
        400: {
          description: 'Error'
        }
      }
    },
    delete: {
      summary: 'API Endpoint for delete folder',
      tags: [ 'Folder' ],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'folderId',
          description: 'id of folder',
          schema: {
            type: 'uuid'
          }
        },
      ],
      responses:{
        200: {
          description: 'Deleted'
        },
        400: {
          description: 'Error'
        }
      }
    },
  },
}
