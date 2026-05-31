const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET ALL REGIONS
exports.getRegions = async (req, res) => {
  try {
    const regions = await prisma.region.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(regions);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// CREATE REGION
exports.createRegion = async (req, res) => {
  try {
    const {
      regionName,
      latitude,
      longitude,
      strawPotential,
      biomassPotential,
    } = req.body;

    const region = await prisma.region.create({
      data: {
        regionName,
        latitude,
        longitude,
        strawPotential,
        biomassPotential,
      },
    });

    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET REGION BY ID
exports.getRegionById = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await prisma.region.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!region) {
      return res.status(404).json({
        message: 'Region not found',
      });
    }

    res.json(region);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE REGION
exports.updateRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      regionName,
      latitude,
      longitude,
      strawPotential,
      biomassPotential,
    } = req.body;

    const updated = await prisma.region.update({
      where: {
        id: Number(id),
      },
      data: {
        regionName,
        latitude,
        longitude,
        strawPotential,
        biomassPotential,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE REGION
exports.deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.region.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: 'Region deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};