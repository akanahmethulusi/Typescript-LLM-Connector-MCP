## Loacker LLM Connector (MCP)

🚀 MCP-basierter KI-Agent für sichere PostgreSQL-Anbindungen. Implementiert Human-in-the-Loop Workflows für autonome Systeme. Entwickelt mit TypeScript & Docker.

### Terminal Ausgabe:
<img width="640" height="139" alt="Bildschirmfoto 2026-04-21 um 11 22 08" src="https://github.com/user-attachments/assets/4e395bd0-f215-435d-862b-5cb18ec12bf3" />

### Schnitstelle Ausgabe:
<img width="822" height="562" alt="Bildschirmfoto 2026-04-21 um 14 48 22" src="https://github.com/user-attachments/assets/e27049f3-56c2-46c0-b4b1-9a3231ad62f5" />



Dieses Projekt demonstriert die Implementierung eines autonomen Agentensystems auf Basis des Model Context Protocol (MCP). Es dient als sichere Schnittstelle zwischen einem Large Language Model (LLM) und einer PostgreSQL-Produktionsdatenbank.

🚀 Key Features
Sichere Datenanbindung: Verwendung von Parameterized Queries zur Vermeidung von SQL-Injection.
Human-in-the-Loop (HITL): Zweistufiger Bestellprozess (propose -> confirm), um unkontrollierte Datenbank-Schreibvorgänge durch KI-Agenten zu verhindern.

### Schema-Validierung: Strikte Typisierung der LLM-Inputs mittels Zod und TypeScript.
Modern Stack: Basierend auf Node.js, MCP SDK und PostgreSQL.

🛠 Architektur & Sicherheit
Der Agent greift nicht direkt auf die Datenbank zu. Stattdessen nutzt er definierte Tools:
### Read-Only Zugriff: Abfrage von Lagerbeständen über einen dedizierten DB-User.
### Gated Writes: Bestellungen werden initial im Status DRAFT angelegt. Eine finale Buchung erfolgt erst nach expliziter Bestätigung durch den Nutzer.
### Leitplanken: Mengenbegrenzungen und Typprüfungen direkt in der Tool-Definition.

📦 Installation

bash
```
npm install
npm run build
```

⚙️ Konfiguration
Erstelle eine .env Datei mit folgendem Inhalt:

env
```
DATABASE_URL=postgresql://user:password@localhost:5432/loacker_db
```

🖥 Nutzung mit Claude Desktop / MCP Inspector
Um den Server lokal zu testen, kannst du den MCP Inspector nutzen:

bash
npx @modelcontextprotocol/inspector node dist/index.js

In der claude_desktop_config.json:
```json
{
  "mcpServers": {
    "loacker-llm-pg": {
      "command": "node",
      "args": ["/pfad/zu/deinem/projekt/dist/index.js"],
      "env": {
        "DATABASE_URL": "deine_verbindungs_url"
      }
    }
  }
}
```

### Empfohlene Ordnerstruktur
Dein Projekt sollte jetzt so aussehen:

```MCP-llm-pg-typescript/
├── node_modules/
├── src/
│   ├── index.ts     (Der MCP Server Code)
│   └── db.ts        (Die Datenbank-Logik)
├── .env
├── docker-compose.yml
├── init.sql
├── package.json
└── tsconfig.json
```
