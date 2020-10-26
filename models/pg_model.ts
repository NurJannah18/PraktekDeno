import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { QueryResult, QueryConfig } from 'https://deno.land/x/postgres/query.ts';

const client = new Client({
    hostname : "localhost",
    port : 5432,
    user : "postgres",
    password : "kiki123",
    database : "db_blognur"
});

export async function select(qry : QueryConfig | QueryConfig[] ){
    await client.connect();
    let tabel : any = [];
    let hasil : QueryResult | QueryResult[];
    try {
        if(Array.isArray(qry)){
            hasil = await client.multiQuery(qry);
            hasil.forEach((obj) => {
                tabel.push(obj.rowsOfObjects() );
                });
        } else {
            hasil = await client.query(qry);
            tabel = hasil.rowsOfObjects();
        }
        await client.end();

    } catch(error) {
        console.log(error);
    }
    return tabel;
}