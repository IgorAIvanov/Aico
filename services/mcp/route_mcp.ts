 import { Hono } from 'hono';
import { toFetchResponse, toReqRes } from 'fetch-to-node';
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { CallToolResult, isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';


// Create an MCP server with implementation details
const getServer = () => {
  const server = new McpServer({
    name: 'json-response-streamable-http-server',
    version: '1.0.0',
  }, {
    capabilities: {
      logging: {},
    }
  });

  server.tool(
    'A2V10_helper',
    'A tool that helps with A2V10 programming tasks. Contains a teg description and algorithm.',
    {
      name: z.string().describe('Name to greet'),
    },
    async ({ name }): Promise<CallToolResult> => {
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${name}!`,
          },
        ],
      };
    }
  );
  // Register a simple tool that returns a greeting
  server.tool(
    'greet',
    'A simple greeting tool',
    {
      name: z.string().describe('Name to greet'),
    },
    async ({ name }): Promise<CallToolResult> => {
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${name}!`,
          },
        ],
      };
    }
  );

  // Register a tool that sends multiple greetings with notifications
  server.tool(
    'multi-greet',
    'A tool that sends different greetings with delays between them',
    {
      name: z.string().describe('Name to greet'),
    },
    async ({ name }, { sendNotification }): Promise<CallToolResult> => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await sendNotification({
        method: "notifications/message",
        params: { level: "debug", data: `Starting multi-greet for ${name}` }
      });

      await sleep(1000); // Wait 1 second before first greeting

      await sendNotification({
        method: "notifications/message",
        params: { level: "info", data: `Sending first greeting to ${name}` }
      });

      await sleep(1000); // Wait another second before second greeting

      await sendNotification({
        method: "notifications/message",
        params: { level: "info", data: `Sending second greeting to ${name}` }
      });

      return {
        content: [
          {
            type: 'text',
            text: `Good morning, ${name}!`,
          }
        ],
      };
    }
  );
  return server;
}

const app = new Hono();


// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

app.post('/a2help',  async (c) => {    
    const { req, res } = toReqRes(c.req.raw);
    const reqBody = await c.req.json();

  console.log('Received MCP request:', reqBody);
  try {
    // Check for existing session ID
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      // Reuse existing transport
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(reqBody)) {
      // New initialization request - use JSON response mode
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        enableJsonResponse: true, // Enable JSON response mode
        onsessioninitialized: (sessionId) => {
          // Store the transport by session ID when session is initialized
          // This avoids race conditions where requests might come in before the session is stored
          console.log(`Session initialized with ID: ${sessionId}`);
          transports[sessionId] = transport;
        }
      });

      // Connect the transport to the MCP server BEFORE handling the request
      const server = getServer();
      await server.connect(transport);
      await transport.handleRequest(req, res, reqBody);

      return toFetchResponse(res); // Already handled
    } else {
      // Invalid request - no session ID or not initialization request
      return c.json({ 
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided',
        },
        id: null,
    }, 400);
      
    }

    // Handle the request with existing transport - no need to reconnect
    await transport.handleRequest(req, res, reqBody);
    return toFetchResponse(res);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
        c.json({ 
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
    }, 500);
     
    }
  }
});

// Handle GET requests for SSE streams according to spec
app.get('/a2help',  async (c) => {
    const { req, res } = toReqRes(c.req.raw);
    const reqBody = await c.req.json();
  // Since this is a very simple example, we don't support GET requests for this server
  // The spec requires returning 405 Method Not Allowed in this case
  console.log('Received GET request on /mcp - an fierst request should be a POST');
    return c.json({
        jsonrpc: '2.0',
        error: {
        code: -32601,
        message: 'Method not found, Allowed methods: POST',
        },
        id: null,
    }, 405)
});




export default app;