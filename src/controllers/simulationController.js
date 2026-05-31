const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

exports.calculateSimulation = async (req, res) => {
  try {
    const { strawAmount, userId } = req.body;

    const biofuelResult = strawAmount * 0.32;
    const carbonReduction = strawAmount * 1.8;

    const simulation = await prisma.simulation.create({
      data: {
        strawAmount,
        biofuelResult,
        carbonReduction,
        userId: Number(userId),
      },
    });

    res.json(simulation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
