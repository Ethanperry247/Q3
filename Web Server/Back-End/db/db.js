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
        } finally {
            client.release();
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
        } finally {
            client.release();
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
        } finally {
            client.release();
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
        } finally {
            client.release();
        }
    }

    async insertCup() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO cups(type, boxId) VALUES ((SELECT type FROM currentType LIMIT 1), (SELECT id FROM boxes ORDER BY id DESC LIMIT 1)) RETURNING id';
            const res = await client.query(queryText);
            const result = res.rows[0].id;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async updateCupType(type) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'UPDATE currentType SET type = $1';
            await client.query(queryText, [type]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getCurrentType() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT type FROM currenttype LIMIT 1';
            const res = await client.query(queryText,);
            const result = res.rows[0].type;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async insertBox() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO boxes(size) VALUES ((SELECT boxCount FROM boxCount LIMIT 1)) RETURNING id';
            const res = await client.query(queryText);
            const result = res.rows[0].id;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async updateBoxSize(size) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'UPDATE boxCount SET boxCount = $1';
            await client.query(queryText, [size]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getCupsInCurrentBox() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT COUNT(*) FROM cups WHERE boxId = (SELECT MAX(id) FROM boxes)';
            const res = await client.query(queryText);
            const result = res.rows[0].count;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getBoxSize() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT boxCount FROM boxcount LIMIT 1';
            const res = await client.query(queryText);
            const result = res.rows[0].boxcount;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getBoxRemainder() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT (SELECT boxCount FROM boxcount LIMIT 1) - COUNT(*) as count FROM cups WHERE boxId = (SELECT MAX(id) FROM boxes)';
            const res = await client.query(queryText);
            const result = res.rows[0].count;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
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
        } finally {
            client.release();
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
        } finally {
            client.release();
        }
    }

    

    async findBoxesByTimeframe(timeFrame) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM boxes WHERE timestamp > $1 AND timestamp < $2';
            const res = await client.query(queryText, [timeFrame.startTime, timeFrame.endTime]);
            const result = res.rows;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async findCupsByTimeframe(timeFrame) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM cups WHERE timestamp > $1 AND timestamp < $2';
            const res = await client.query(queryText, [timeFrame.startTime, timeFrame.endTime]);
            const result = res.rows;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getLatestBox() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM boxes ORDER BY timestamp DESC LIMIT 1';
            const res = await client.query(queryText);
            const result = res.rows[0];
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getCupTypes() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT type FROM cuptype';
            const res = await client.query(queryText);
            const result = res.rows;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async postMachine() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'INSERT INTO machines DEFAULT VALUES RETURNING id';
            const res = await client.query(queryText);
            const result = res.rows[0].id;
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getMachine() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM machines LIMIT 1';
            const res = await client.query(queryText);
            const result = res.rows[0];
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getLatestMachine() {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'SELECT * FROM machines ORDER BY id DESC LIMIT 1;';
            const res = await client.query(queryText);
            const result = res.rows[0];
            await client.query('COMMIT');
            return result;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async updateMachineCalibration(state) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'UPDATE machines SET motorcalibrating = $1';
            await client.query(queryText, [state]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async updateMachineLid(state) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'UPDATE machines SET lidstate = $1';
            await client.query(queryText, [state]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async updateMachineConveyor(state) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'UPDATE machines SET conveyorstate = $1';
            await client.query(queryText, [state]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async updateMachineSequence(state) {
        const client = await this.connectClient();
        try {
            await client.query('BEGIN');
            const queryText = 'UPDATE machines SET sequencing = $1';
            await client.query(queryText, [state]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
};