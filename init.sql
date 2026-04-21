-- Tabelle für die Recyclingfirma-Produktwelt
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- z.B. 'Waffeln', 'Schokolade', 'Patisserie'
    stock INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT positive_stock CHECK (stock >= 0)
);

-- Tabelle für Bestellungen mit Status-Management
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    amount INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT', -- DRAFT, CONFIRMED, CANCELLED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_amount CHECK (amount > 0 AND amount <= 100) -- Sicherheitslimit
);

-- Beispieldaten für den Wow-Effekt im Interview
INSERT INTO products (name, category, stock, price) VALUES
('Recycling Quadratini Napolitaner', 'Waffeln', 500, 3.49),
('Recycling Tortina Original', 'Patisserie', 120, 4.99),
('Recycling Gardena Hazelnut', 'Schokolade', 250, 2.89),
('Recycling Classic Alpine Milk', 'Waffeln', 300, 1.99);