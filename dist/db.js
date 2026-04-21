import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// Sicherer Lese-Zugriff
export const getInventory = async (category) => {
    const res = await pool.query('SELECT name, stock, price FROM products WHERE category = $1', [category]);
    return res.rows;
};
// Sicherer Schreib-Entwurf (Human-in-the-loop)
export const createOrderDraft = async (productId, quantity) => {
    const res = await pool.query('INSERT INTO orders (product_id, amount, status) VALUES ($1, $2, $3) RETURNING id', [productId, quantity, 'DRAFT']);
    return res.rows[0].id;
};
// Finalisierung
export const confirmOrder = async (orderId) => {
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['CONFIRMED', orderId]);
};
