const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE USER ROLE
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// SYSTEM SUMMARY
exports.getSystemSummary = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();

    const totalArticles = await prisma.article.count();

    const totalSimulations = await prisma.simulation.count();

    const totalWaste = await prisma.strawWaste.aggregate({
      _sum: {
        amountTon: true,
      },
    });

    res.json({
      totalUsers,
      totalArticles,
      totalSimulations,
      totalWaste: totalWaste._sum.amountTon || 0,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};