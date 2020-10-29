module.exports.DB = class DB {
    constructor(connectClient) {
        this.connectClient = connectClient;
    }

    async findBoxContentSizeById(id) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT COUNT(*) FROM cups WHERE boxId = $1';
            const res = await client.query(queryText, [id]);
            const result = res.rows[0];
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async findCupsByBoxId(id) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM cups WHERE boxId = $1';
            const res = await client.query(queryText, [id]);
            const result = res.rows;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async findBoxById(id) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM boxes WHERE id = $1';
            const res = await client.query(queryText, [id]);
            const result = res.rows[0];
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async findCupById(id) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM cups WHERE id = $1';
            const res = await client.query(queryText, [id]);
            const result = res.rows[0];
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async insertCup(cup) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO cups(type, boxId) VALUES ($1, $2) RETURNING id';
            const res = await client.query(queryText, [cup.type, cup.boxId]);
            const result = res.rows[0].id;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async insertBox(box) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO boxes(size) VALUES ($1) RETURNING id';
            const res = await client.query(queryText, [box.size]);
            const result = res.rows[0].id;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async getCupCount() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT COUNT(*) FROM cups';
            const res = await client.query(queryText);
            const result = res.rows[0].count;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
    }

    async getBoxCount() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT COUNT(*) FROM boxes';
            const res = await client.query(queryText);
            const result = res.rows[0].count;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }

    }
};