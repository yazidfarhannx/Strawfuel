const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// CREATE ARTICLE
exports.createArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const thumbnail = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        category,
        thumbnail,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL ARTICLES
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(articles);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE ARTICLE
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.article.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: 'Article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};