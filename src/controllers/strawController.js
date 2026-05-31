const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// CREATE
exports.createStraw = async (req, res) => {
  try {
    const {
      region,
      amountTon,
      biomassPotential,
      utilizationPercentage,
    } = req.body;

    const straw = await prisma.strawWaste.create({
      data: {
        region,
        amountTon,
        biomassPotential,
        utilizationPercentage,
      },
    });

    res.status(201).json(straw);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL
exports.getAllStraw = async (req, res) => {
  try {
    const data = await prisma.strawWaste.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET BY ID
exports.getStrawById = async (req, res) => {
  try {
    const { id } = req.params;

    const straw = await prisma.strawWaste.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!straw) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }

    res.json(straw);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE
exports.updateStraw = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      region,
      amountTon,
      biomassPotential,
      utilizationPercentage,
    } = req.body;

    const updated = await prisma.strawWaste.update({
      where: {
        id: Number(id),
      },
      data: {
        region,
        amountTon,
        biomassPotential,
        utilizationPercentage,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE
exports.deleteStraw = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.strawWaste.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: 'Data deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};