const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'StrawFuel API Documentation',
      version: '1.0.0',
      description:
        'StrawFuel Sustainability Platform API',
    },

    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

      schemas: {
        User: {
          type: 'object',

          properties: {
            id: {
              type: 'integer',
            },

            name: {
              type: 'string',
            },

            email: {
              type: 'string',
            },

            role: {
              type: 'string',
              example: 'user',
            },
          },
        },

        Straw: {
          type: 'object',

          properties: {
            id: {
              type: 'integer',
            },

            region: {
              type: 'string',
            },

            amount: {
              type: 'number',
            },

            moisture: {
              type: 'number',
            },
          },
        },

        Region: {
          type: 'object',

          properties: {
            id: {
              type: 'integer',
            },

            name: {
              type: 'string',
            },

            latitude: {
              type: 'number',
            },

            longitude: {
              type: 'number',
            },

            strawPotential: {
              type: 'number',
            },
          },
        },

        Article: {
          type: 'object',

          properties: {
            id: {
              type: 'integer',
            },

            title: {
              type: 'string',
            },

            content: {
              type: 'string',
            },

            category: {
              type: 'string',
            },

            thumbnail: {
              type: 'string',
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      {
        name: 'Authentication',
        description: 'Authentication API',
      },

      {
        name: 'User Features',
        description: 'User accessible API',
      },

      {
        name: 'Admin Features',
        description: 'Admin management API',
      },

      {
        name: 'Straw Monitoring',
        description: 'Straw monitoring API',
      },

      {
        name: 'Articles',
        description: 'Educational article API',
      },

      {
        name: 'Carbon Analytics',
        description: 'Carbon analytics API',
      },

      {
        name: 'Dashboard',
        description: 'Dashboard analytics API',
      },

      {
        name: 'Map',
        description: 'Leaflet map API',
      },
    ],

    paths: {
      // ======================================================
      // AUTHENTICATION
      // ======================================================

      '/api/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'Register new user',

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    name: {
                      type: 'string',
                      example: 'Farhan',
                    },

                    email: {
                      type: 'string',
                      example: 'farhan@gmail.com',
                    },

                    password: {
                      type: 'string',
                      example: '123456',
                    },
                  },
                },
              },
            },
          },

          responses: {
            201: {
              description:
                'User registered successfully',
            },
          },
        },
      },

      '/api/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login user',

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    email: {
                      type: 'string',
                      example: 'farhan@gmail.com',
                    },

                    password: {
                      type: 'string',
                      example: '123456',
                    },
                  },
                },
              },
            },
          },

          responses: {
            200: {
              description: 'Login success',
            },
          },
        },
      },

      // ======================================================
      // DASHBOARD
      // ======================================================

      '/api/dashboard/stats': {
        get: {
          tags: ['User Features'],
          summary: 'Get dashboard statistics',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Dashboard statistics fetched',
            },
          },
        },
      },

      '/api/dashboard/analytics': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get monthly analytics',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Monthly analytics fetched',
            },
          },
        },
      },

      '/api/dashboard/regions': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get regional statistics',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Regional statistics fetched',
            },
          },
        },
      },

      '/api/dashboard/sustainability': {
        get: {
          tags: ['Dashboard'],
          summary:
            'Get sustainability metrics',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Sustainability metrics fetched',
            },
          },
        },
      },

      // ======================================================
      // STRAW MONITORING
      // ======================================================

      '/api/straw': {
        get: {
          tags: ['Straw Monitoring'],
          summary: 'Get all straw data',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'List of straw data',
            },
          },
        },

        post: {
          tags: ['Straw Monitoring'],
          summary: 'Create straw data',

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    region: {
                      type: 'string',
                      example: 'Klaten',
                    },

                    amount: {
                      type: 'number',
                      example: 1500,
                    },

                    moisture: {
                      type: 'number',
                      example: 12,
                    },
                  },
                },
              },
            },
          },

          responses: {
            201: {
              description:
                'Straw data created',
            },
          },
        },
      },

      '/api/straw/{id}': {
        get: {
          tags: ['Straw Monitoring'],
          summary: 'Get straw by ID',

          security: [
            {
              bearerAuth: [],
            },
          ],

          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,

              schema: {
                type: 'integer',
              },
            },
          ],

          responses: {
            200: {
              description:
                'Straw detail fetched',
            },
          },
        },

        put: {
          tags: ['Straw Monitoring'],
          summary: 'Update straw data',

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    region: {
                      type: 'string',
                      example: 'Sragen',
                    },

                    amount: {
                      type: 'number',
                      example: 2500,
                    },

                    moisture: {
                      type: 'number',
                      example: 10,
                    },
                  },
                },
              },
            },
          },

          responses: {
            200: {
              description:
                'Straw updated successfully',
            },
          },
        },

        delete: {
          tags: ['Admin Features'],
          summary: 'Delete straw data',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Straw deleted successfully',
            },
          },
        },
      },

      // ======================================================
      // ARTICLES
      // ======================================================

      '/api/articles': {
        get: {
          tags: ['Articles'],
          summary: 'Get all articles',

          responses: {
            200: {
              description:
                'List of articles',
            },
          },
        },

        post: {
          tags: ['Admin Features'],
          summary:
            'Create article with image',

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',

                  properties: {
                    title: {
                      type: 'string',
                    },

                    content: {
                      type: 'string',
                    },

                    category: {
                      type: 'string',
                    },

                    thumbnail: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },

          responses: {
            201: {
              description:
                'Article created successfully',
            },
          },
        },
      },

      '/api/articles/{id}': {
        delete: {
          tags: ['Admin Features'],
          summary: 'Delete article',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Article deleted successfully',
            },
          },
        },
      },

      // ======================================================
      // CARBON ANALYTICS
      // ======================================================

      '/api/carbon/overview': {
        get: {
          tags: ['Carbon Analytics'],
          summary:
            'Get carbon overview analytics',

          responses: {
            200: {
              description:
                'Carbon overview fetched',
            },
          },
        },
      },

      '/api/carbon/monthly': {
        get: {
          tags: ['Carbon Analytics'],
          summary:
            'Get monthly carbon analytics',

          responses: {
            200: {
              description:
                'Monthly carbon analytics fetched',
            },
          },
        },
      },

      '/api/carbon/regions': {
        get: {
          tags: ['Carbon Analytics'],
          summary:
            'Get regional carbon analytics',

          responses: {
            200: {
              description:
                'Regional analytics fetched',
            },
          },
        },
      },

      '/api/carbon/score': {
        get: {
          tags: ['Carbon Analytics'],
          summary:
            'Get sustainability score',

          responses: {
            200: {
              description:
                'Sustainability score fetched',
            },
          },
        },
      },

      // ======================================================
      // MAP
      // ======================================================

      '/api/map/regions': {
        get: {
          tags: ['Map'],
          summary: 'Get all regions',

          responses: {
            200: {
              description:
                'List of regions',
            },
          },
        },

        post: {
          tags: ['Admin Features'],
          summary: 'Create region',

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    name: {
                      type: 'string',
                      example: 'Klaten',
                    },

                    latitude: {
                      type: 'number',
                      example: -7.70583,
                    },

                    longitude: {
                      type: 'number',
                      example: 110.60639,
                    },

                    strawPotential: {
                      type: 'number',
                      example: 2500,
                    },
                  },
                },
              },
            },
          },

          responses: {
            201: {
              description:
                'Region created successfully',
            },
          },
        },
      },

      '/api/map/regions/{id}': {
        get: {
          tags: ['Map'],
          summary: 'Get region detail',

          responses: {
            200: {
              description:
                'Region detail fetched',
            },
          },
        },

        put: {
          tags: ['Admin Features'],
          summary: 'Update region',

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    name: {
                      type: 'string',
                      example: 'Sragen',
                    },

                    latitude: {
                      type: 'number',
                      example: -7.4305,
                    },

                    longitude: {
                      type: 'number',
                      example: 111.0213,
                    },

                    strawPotential: {
                      type: 'number',
                      example: 3200,
                    },
                  },
                },
              },
            },
          },

          responses: {
            200: {
              description:
                'Region updated successfully',
            },
          },
        },

        delete: {
          tags: ['Admin Features'],
          summary: 'Delete region',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'Region deleted successfully',
            },
          },
        },
      },

      // ======================================================
      // ADMIN
      // ======================================================

      '/api/admin/users': {
        get: {
          tags: ['Admin Features'],
          summary: 'Get all users',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'List of users',
            },
          },
        },
      },

      '/api/admin/users/{id}': {
        delete: {
          tags: ['Admin Features'],
          summary: 'Delete user',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'User deleted successfully',
            },
          },
        },
      },

      '/api/admin/users/{id}/role': {
        put: {
          tags: ['Admin Features'],
          summary: 'Update user role',

          security: [
            {
              bearerAuth: [],
            },
          ],

          requestBody: {
            required: true,

            content: {
              'application/json': {
                schema: {
                  type: 'object',

                  properties: {
                    role: {
                      type: 'string',
                      example: 'admin',
                    },
                  },
                },
              },
            },
          },

          responses: {
            200: {
              description:
                'User role updated',
            },
          },
        },
      },

      '/api/admin/summary': {
        get: {
          tags: ['Admin Features'],
          summary: 'Get system summary',

          security: [
            {
              bearerAuth: [],
            },
          ],

          responses: {
            200: {
              description:
                'System summary fetched',
            },
          },
        },
      },
    },
  },

  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
