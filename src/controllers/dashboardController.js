const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await prisma.user.count();

 
    const totalArticles = await prisma.article.count();

  
    const strawWaste = await prisma.strawWaste.aggregate({
      _sum: {
        amountTon: true,
      },
    });


    const totalSimulations = await prisma.simulation.count();


    const biofuel = await prisma.simulation.aggregate({
      _sum: {
        biofuelResult: true,
      },
    });


    const carbonReduction = await prisma.simulation.aggregate({
      _sum: {
        carbonReduction: true,
      },
    });

    res.json({
      totalUsers,
      totalArticles,
      totalSimulations,
      totalStrawWaste: strawWaste._sum.amountTon || 0,
      totalBiofuel: biofuel._sum.biofuelResult || 0,
      totalCarbonReduction:
        carbonReduction._sum.carbonReduction || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyAnalytics = async (req, res) => {
  try {
    const simulations = await prisma.simulation.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    const monthlyData = {};

    simulations.forEach((item) => {
      const month = new Date(item.createdAt).toLocaleString('default', {
        month: 'short',
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          biofuel: 0,
          carbon: 0,
        };
      }

      monthlyData[month].biofuel += item.biofuelResult;
      monthlyData[month].carbon += item.carbonReduction;
    });

    res.json(Object.values(monthlyData));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegionStats = async (req, res) => {
  try {
    const regions = await prisma.strawWaste.groupBy({
      by: ['region'],
      _sum: {
        amountTon: true,
        biomassPotential: true,
      },
      _count: {
        region: true,
      },
    });

    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSustainabilityMetrics = async (req, res) => {
  try {
    const totalWaste = await prisma.strawWaste.aggregate({
      _sum: {
        amountTon: true,
      },
    });

    const totalCarbon = await prisma.simulation.aggregate({
      _sum: {
        carbonReduction: true,
      },
    });

    const sustainabilityScore =
      (totalCarbon._sum.carbonReduction || 0) /
      ((totalWaste._sum.amountTon || 1) * 10);

    res.json({
      totalWaste: totalWaste._sum.amountTon || 0,
      totalCarbonReduction:
        totalCarbon._sum.carbonReduction || 0,
      sustainabilityScore: sustainabilityScore.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};