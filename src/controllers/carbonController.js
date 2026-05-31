const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

exports.getCarbonOverview = async (req, res) => {
  try {
    const simulations = await prisma.simulation.findMany();

    let totalStraw = 0;
    let totalCarbonReduction = 0;
    let totalBurningEmission = 0;

    simulations.forEach((item) => {
      totalStraw += item.strawAmount;

      totalCarbonReduction += item.strawAmount * 1.8;
      totalBurningEmission += item.strawAmount * 1.46;
    });

    const netCarbonImpact =
      totalCarbonReduction - totalBurningEmission;

    res.json({
      totalStraw,
      totalCarbonReduction,
      totalBurningEmission,
      netCarbonImpact,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMonthlyCarbonAnalytics = async (req, res) => {
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
          carbonReduction: 0,
          burningEmission: 0,
          netImpact: 0,
        };
      }

      const reduction = item.strawAmount * 1.8;
      const burning = item.strawAmount * 1.46;

      monthlyData[month].carbonReduction += reduction;
      monthlyData[month].burningEmission += burning;
      monthlyData[month].netImpact += reduction - burning;
    });

    res.json(Object.values(monthlyData));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getRegionCarbonAnalytics = async (req, res) => {
  try {
    const regions = await prisma.strawWaste.findMany();

    const analytics = regions.map((item) => {
      const burningEmission = item.amountTon * 1.46;
      const carbonReduction = item.amountTon * 1.8;

      return {
        region: item.region,
        strawAmount: item.amountTon,
        burningEmission,
        carbonReduction,
        netImpact: carbonReduction - burningEmission,
      };
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCarbonScore = async (req, res) => {
  try {
    const simulations = await prisma.simulation.findMany();

    let score = 0;

    simulations.forEach((item) => {
      score += item.carbonReduction;
    });

    let level = 'Low';

    if (score > 500) {
      level = 'Medium';
    }

    if (score > 1500) {
      level = 'High';
    }

    if (score > 3000) {
      level = 'Excellent';
    }

    res.json({
      carbonScore: score,
      sustainabilityLevel: level,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};