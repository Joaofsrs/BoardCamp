import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        const game = await db.query(
            `SELECT * FROM games WHERE id = $1;`,
            [gameId]
        );
        const customer = await db.query(
            `SELECT * FROM customers WHERE id = $1;`,
            [customerId]
        );

        if (customer.rows.length <= 0 || game.rows.length <= 0) {
            return res.sendStatus(400);
        }

        const price = parseInt(game.rows[0].pricePerDay) * parseInt(daysRented);

        const now = dayjs().format("YYYY-MM-DD");
        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
                VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, now, daysRented, null, price, null]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(
            `SELECT rentals.*, customers.id AS "customersId", customers.name AS "customersName", games.id AS "gamesId", games.name AS "gamesName"
                FROM rentals
                JOIN customers
                    ON customers.id = rentals."customerId"
                JOIN games
                    ON games.id = rentals."gameId";
            `
        );

        const object = [];

        for (let i = 0; i < rentals.rows.length; i++) {
            const actualObject = rentals.rows[i];
            object.push({
                id: actualObject.id,
                customerId: actualObject.customerId,
                gameId: actualObject.gameId,
                rentDate: actualObject.rentDate,
                daysRented: actualObject.daysRented,
                returnDate: actualObject.returnDate,
                originalPrice: actualObject.originalPrice,
                delayFee: actualObject.delayFee,
                customer: {
                    id: actualObject.customersId,
                    name: actualObject.customersName
                },
                game: {
                    id: actualObject.gamesId,
                    name: actualObject.gamesName
                }
            });
        }

        res.send(object);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function endRentalsById(req, res) {
    const { id } = req.params;

    try {
        const rentals = await db.query(
            `SELECT * FROM rentals WHERE id = $1;`,
            [id]
        );
        if (rentals.rows.length <= 0) {
            return res.sendStatus(404);
        }

        if (rentals.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        const returnDate = dayjs().format("YYYY-MM-DD");
        let delayFee = 0;

        const returnDateMili = new Date(returnDate).getTime();
        const getDateMili = new Date(rentals.rows[0].rentDate).getTime();
        const oneDayMili = 1000 * 60 * 60 * 24;

        let diferenceDate = (getDateMili + (rentals.rows[0].daysRented * oneDayMili)) - returnDateMili;

        if (diferenceDate < 0) {
            const price = rentals.rows[0].originalPrice / rentals.rows[0].daysRented;
            const days = Math.ceil((diferenceDate * (-1)) / oneDayMili);

            delayFee = days * price;
        }

        await db.query(
            `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`,
            [returnDate, delayFee, id]
        );

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRentalsById(req, res) {
    const { id } = req.params;

    try {
        const rentals = await db.query(
            `SELECT * FROM rentals WHERE id = $1;`,
            [id]
        );
        if (rentals.rows.length <= 0) {
            return res.sendStatus(404);
        }

        if (rentals.rows[0].returnDate === null) {
            return res.sendStatus(400);
        }
        await db.query(
            `DELETE FROM rentals WHERE id = $1;`,
            [id]
        );
        res.send(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}