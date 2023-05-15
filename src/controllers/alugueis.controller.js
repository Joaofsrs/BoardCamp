import { db } from "../database/database.connection.js";

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        const game = await db.query(
            `SELECT * FROM games WHERE id = gameId;`
        )

        const price = game.pricePerDay*daysRented

        await db.query(
            `INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, Date(), daysRented, null, price, null]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(
            `SELECT * FROM rentals;
                JOIN customers
                    ON customers.id = rentals.customerId
                JOIN games 
                    ON games.id = rentals.gameId
            `
        );

        res.send(rentals.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRentalsById(req, res) {
    const { id } = req.params;

    try {
        const games = await db.query(
            `SELECT * FROM customers WHERE id = $1;`,
            [id]
        );
        if(games.rows.length <= 0){
            return res.sendStatus("404")
        }
        res.send(games.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateRentalsById(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        await db.query(
            `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
            [name, phone, cpf, birthday, id]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}