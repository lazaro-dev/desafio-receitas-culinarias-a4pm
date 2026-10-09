import "dotenv/config";
import express from "express";
import router from "@/routes/router";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "@/docs/Swagger";
const app = express()

app.use(cors());
app.use(express.json())
app.use('/api/v1', router)

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app 