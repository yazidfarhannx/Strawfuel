require('dotenv').config(); 

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// 2. Inisialisasi Prisma Client dengan Driver Adapter PostgreSQL (Prisma 7)
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // cek apakah admin sudah ada
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: 'admin@strawfuel.com',
    },
  });

  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }

  // hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // create admin
  const admin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@strawfuel.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin created successfully');
  console.log(admin);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
;