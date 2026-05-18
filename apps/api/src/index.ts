import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import express from "express";
import { Pool } from "pg";
import { PrismaClient } from "../../../packages/database/generated/prisma/client.ts";

const app = express();
const port = 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/leagues", async (req, res) => {
  const leagues = await prisma.league.findMany();
  res.json(leagues);
});

// app.post('/leagues', cors(), async (req, res) => {
//   const { name, description } = req.body;
//   const newLeague = await prisma.league.create({ data: { name, ownerId: 1 } });
//   res.status(201).json(newLeague);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
