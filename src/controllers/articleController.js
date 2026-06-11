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
// CREATE ARTICLE
// ======================
exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      link,
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message: 'Title, content, and category are required',
      });
    }

    const thumbnail = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        category,
        link,
        thumbnail,
      },
    });

    res.status(201).json({
      message: 'Article created successfully',
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// GET ALL ARTICLES
// ======================
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      total: articles.length,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// GET ARTICLE BY ID
// ======================
exports.getArticleById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
      });
    }

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      return res.status(404).json({
        message: 'Article not found',
      });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// UPDATE ARTICLE
// ======================
exports.updateArticle = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
      });
    }

    const existing = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: 'Article not found',
      });
    }

    const {
      title,
      content,
      category,
      link,
    } = req.body;

    const thumbnail = req.file
      ? `/uploads/${req.file.filename}`
      : existing.thumbnail;

    const updated = await prisma.article.update({
      where: {
        id,
      },
      data: {
        title: title ?? existing.title,
        content: content ?? existing.content,
        category: category ?? existing.category,
        link: link ?? existing.link,
        thumbnail,
      },
    });

    res.status(200).json({
      message: 'Article updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ======================
// DELETE ARTICLE
// ======================
exports.deleteArticle = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
      });
    }

    const existing = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: 'Article not found',
      });
    }

    await prisma.article.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: 'Article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

