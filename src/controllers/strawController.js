const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});


// ======================
// CREATE
// ======================
exports.createStraw = async (req, res) => {
  try {
    const {
      region,
      amount,
      moisture,
      biomassPotential,
      utilizationPercentage,
    } = req.body;

    // VALIDATION
    if (!region || amount === undefined) {
      return res.status(400).json({
        message: 'Region and amount are required',
      });
    }

    const straw = await prisma.strawWaste.create({
      data: {
        region,
        amountTon: Number(amount),
        moisture: moisture ? Number(moisture) : null,
        biomassPotential: biomassPotential
          ? Number(biomassPotential)
          : null,
        utilizationPercentage: utilizationPercentage
          ? Number(utilizationPercentage)
          : null,
      },
    });

    res.status(201).json({
      message: 'Data created successfully',
      data: straw,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// GET ALL
// ======================
exports.getAllStraw = async (req, res) => {
  try {
    const data = await prisma.strawWaste.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// GET BY ID
// ======================
exports.getStrawById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
      });
    }

    const straw = await prisma.strawWaste.findUnique({
      where: {
        id,
      },
    });

    if (!straw) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }

    res.status(200).json(straw);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// UPDATE
// ======================
exports.updateStraw = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
      });
    }

    const existing = await prisma.strawWaste.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }

    const {
      region,
      amount,
      moisture,
      biomassPotential,
      utilizationPercentage,
    } = req.body;

    const updated = await prisma.strawWaste.update({
      where: {
        id,
      },
      data: {
        region: region ?? existing.region,
        amountTon:
          amount !== undefined
            ? Number(amount)
            : existing.amountTon,
        moisture:
          moisture !== undefined
            ? Number(moisture)
            : existing.moisture,
        biomassPotential:
          biomassPotential !== undefined
            ? Number(biomassPotential)
            : existing.biomassPotential,
        utilizationPercentage:
          utilizationPercentage !== undefined
            ? Number(utilizationPercentage)
            : existing.utilizationPercentage,
      },
    });

    res.status(200).json({
      message: 'Data updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// DELETE
// ======================
exports.deleteStraw = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
      });
    }

    const existing = await prisma.strawWaste.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }

    await prisma.strawWaste.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: 'Data deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
