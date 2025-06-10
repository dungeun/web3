const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function checkDatabaseStatus() {
  try {
    // Count records in each table
    const counts = await Promise.all([
      prisma.user.count().then(count => ({ table: 'Users', count })),
      prisma.menu.count().then(count => ({ table: 'Menus', count })),
      prisma.page.count().then(count => ({ table: 'Pages', count })),
      prisma.productCategory.count().then(count => ({ table: 'Product Categories', count })),
      prisma.product.count().then(count => ({ table: 'Products', count })),
      prisma.siteConfig.count().then(count => ({ table: 'Site Configs', count })),
      prisma.heroSlide.count().then(count => ({ table: 'Hero Slides', count }))
    ]);

    console.log('\n📊 Database Status Report:');
    console.log('==========================');
    
    counts.forEach(({ table, count }) => {
      console.log(`${table}: ${count} records`);
    });

    // Check admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@daekyung.com' }
    });
    
    console.log('\n👤 Admin User:');
    console.log(adminUser ? '✅ Admin user exists' : '❌ Admin user not found');

    // Check site configuration
    const heroType = await prisma.siteConfig.findUnique({
      where: { key: 'heroType' }
    });
    
    console.log('\n⚙️  Site Configuration:');
    console.log(`Hero Type: ${heroType?.value || 'not set'}`);

    // Sample products
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      include: {
        category: true
      }
    });

    console.log('\n📦 Sample Products:');
    sampleProducts.forEach(product => {
      console.log(`- ${product.name} (${product.code}) - Category: ${product.category.name}`);
    });

    console.log('\n✅ Database check complete!');
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseStatus();