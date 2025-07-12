import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";


 export const deleteQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.delete(
        '/rooms/:roomId/questions/:questionId',
        {
            schema: {
                params:z.object({
                    roomId: z.string(),
                    questionId: z.string()
                })
            }
        },
        async (req,res) => {
            const questionId = req.params.questionId

            const result = await db.delete(schema.questions).where(eq(schema.questions.id, questionId)).returning()

            if(result.length === 0){
                throw new Error('Question not found!')
            }

            const questionDeleted = result[0]

            return res.send({
                message: 'Question deleted with success',
                questionDeleted
            })
        }
    )
 }