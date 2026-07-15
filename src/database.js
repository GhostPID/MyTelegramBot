
import Database from "better-sqlite3";

const db = new Database("./data/bot.db");

db.exec(`
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_message_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

export default db;