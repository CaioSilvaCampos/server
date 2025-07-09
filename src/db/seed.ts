// biome-ignore assist/source/organizeImports: <so funciona assim sla pq kk>
import 'dotenv/config'; 
import { reset, seed} from 'drizzle-seed'
import { db,sql } from './connection.ts'
import { schema } from './schema/index.ts'

import { env } from '../env.ts';


await reset(db, schema)

await seed(db, schema).refine(f =>{
    return {
        rooms:{
            count: 20,
            columns:{
                name: f.companyName(),
                description: f.loremIpsum()
            },
        },
        questions:{
            count:20,
        },
    }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: <only in dev>
console.log('Database seeded')
// biome-ignore lint/suspicious/noConsole: <only in dev>
console.log(env.DATABASE_URL)