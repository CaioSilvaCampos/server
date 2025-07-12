import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";


 export const deleteRoomRoute: FastifyPluginCallbackZod = (app) => {
    app.delete(
        '/rooms/:roomId',
        {
            schema: {
                params:z.object({
                    roomId: z.string(),
                })
            }
        },
        async (req,res) => {
            const roomId = req.params.roomId

            const result = await db.delete(schema.rooms).where(eq(schema.rooms.id, roomId)).returning()

            if(result.length === 0){
                throw new Error('Room not found!')
            }

            const roomDeleted = result[0]

            return res.send({
                message: 'Room deleted with success',
                roomDeleted
            })
        }
    )
 }