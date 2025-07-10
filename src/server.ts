// biome-ignore assist/source/organizeImports: <aaaaa>
import { fastifyCors } from '@fastify/cors';
import 'dotenv/config';
import { fastify } from 'fastify';
import { fastifyMultipart } from '@fastify/multipart'

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from './env.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomsRoute } from './http/routes/create-rooms.ts';
import { getRoomsQuestions } from './http/routes/get-rooms-quetions.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors,{
    origin:true
})

app.register(fastifyMultipart)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.get('/health', ()=>{
    return 'OK'
})
app.register(getRoomsRoute)
app.register(createRoomsRoute)
app.register(getRoomsQuestions)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.listen({port:env.PORT})