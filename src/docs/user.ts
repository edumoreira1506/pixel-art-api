export default {
  '/auth': {
    post: {
      summary: 'API Endpoint for authentication',
      description : 'Authentication',
      tags: [ 'Authentication' ],
      parameters: [
        {
          in: 'body',
          name: 'user',
          schema: {
            type: 'object',
            required: [ 'username', 'password' ],
            properties: {
              username: {
                username: 'string',
              },
              password: {
                type: 'string',
              }
            }
          }
        }
      ],
      responses:{
        200: {
          description : 'Authenticated'
        },
        400: {
          description : 'Not allowed'
        }
      }
    }
  },
  '/users': {
    post: {
      summary: 'API Endpoint for register user',
      tags: [ 'User' ],
      parameters: [
        {
          in: 'body',
          name: 'user',
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
              confirmPassword: {
                type: 'string'
              }
            }
          }
        }
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
  },
}
