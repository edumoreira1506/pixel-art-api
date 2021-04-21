export default {
  '/folders/{folderId}/arts': {
    post: {
      summary: 'API Endpoint for register art',
      tags: [ 'Art' ],
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
          name: 'art',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              itemWidth: {
                type: 'integer',
              },
              marginBetween: {
                type: 'integer',
              },
              items: {
                type: 'object'
              }
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
      summary: 'API Endpoint for get arts',
      tags: [ 'Art' ],
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
  '/folders/{folderId}/arts/{artId}': {
    patch: {
      summary: 'API Endpoint for update art',
      tags: [ 'Art' ],
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
          in: 'path',
          name: 'artId',
          description: 'id of art',
          schema: {
            type: 'uuid'
          }
        },
        {
          in: 'body',
          name: 'art',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              itemWidth: {
                type: 'integer',
              },
              marginBetween: {
                type: 'integer',
              },
              items: {
                type: 'object'
              }
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
      summary: 'API Endpoint for delete art',
      tags: [ 'Art' ],
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
        {
          in: 'path',
          name: 'artId',
          description: 'id of art',
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
