import PgPromiseAdapter from "../../src/infra/database/DatabaseConnection";
import sleep from "./load";

async function main() {
    const connection = new PgPromiseAdapter();

    while (true) {
        const query = `SELECT FLOOR(EXTRACT(EPOCH FROM "timestamp"))::BIGINT as time, COUNT(*) as count FROM ccca.order GROUP BY time ORDER BY time DESC limit 10`;
        const output = await connection.query(query, []);
        console.log(output); 
        await sleep(1000);
    }
}

main();