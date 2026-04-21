import { getInventory } from "./db.js";

async function testConnection() {
  console.log("🔄 Teste Verbindung zu PostgreSQL...");
  
  try {
    // Wir versuchen, die 'Waffeln' abzurufen, die wir in init.sql angelegt haben
    const products = await getInventory("Waffeln");
    
    if (products.length > 0) {
      console.log("✅ Erfolg! Verbindung steht.");
      console.table(products); // Zeigt die Daten schön als Tabelle im Terminal
    } else {
      console.log("⚠️ Verbindung steht, aber keine Produkte in Kategorie 'Waffeln' gefunden.");
    }
  } catch (error) {
    console.error("❌ Fehler bei der Verbindung:");
    console.error(error);
  } finally {
    process.exit();
  }
}

testConnection();