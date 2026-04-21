import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getInventory, createOrderDraft, confirmOrder } from "./db.js";

const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0",
});

// Tool 1: Abfrage
server.tool(
  "get_stock",
  "Fragt den Lagerbestand von eine Recyclingfirma Produkten ab (z.B. Waffeln, Schokolade)",
  { category: z.string() },
  async ({ category }) => {
    const data = await getInventory(category);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Tool 2: Bestellung vorschlagen
server.tool(
  "propose_order",
  "Erstellt einen Entwurf für eine Produktbestellung.",
  { 
    productId: z.number(), 
    quantity: z.number().max(100) 
  },
  async ({ productId, quantity }) => {
    const id = await createOrderDraft(productId, quantity);
    return {
      content: [{ type: "text", text: `Entwurf ID ${id} erstellt. Bitte bestätigen Sie den Kauf.` }]
    };
  }
);

// Tool 3: Bestätigen
server.tool(
  "confirm_order",
  "Bestätigt eine bestehende Entwurfs-Bestellung final.",
  { orderId: z.number() },
  async ({ orderId }) => {
    await confirmOrder(orderId);
    return {
      content: [{ type: "text", text: `Bestellung ${orderId} wurde erfolgreich gebucht.` }]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server läuft via Stdio");
}

main().catch(console.error);