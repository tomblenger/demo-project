const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 MongoDB URL Update Tool');
console.log('==========================');
console.log('');

rl.question('Enter your MongoDB cloud URL: ', (mongodbUrl) => {
  if (!mongodbUrl || mongodbUrl.trim() === '') {
    console.log('❌ MongoDB URL is required!');
    rl.close();
    return;
  }

  const envFiles = [
    '.env.local',
    'apps/web/.env.local',
    'apps/admin/.env.local'
  ];

  let updatedCount = 0;

  envFiles.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace the placeholder with actual URL
        const newContent = content.replace(
          /MONGODB_URI=your-cloud-mongodb-url-here/g,
          `MONGODB_URI=${mongodbUrl.trim()}`
        );
        
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Updated: ${filePath}`);
        updatedCount++;
      } else {
        console.log(`⚠️  File not found: ${filePath}`);
      }
    } catch (error) {
      console.log(`❌ Error updating ${filePath}:`, error.message);
    }
  });

  console.log('');
  console.log(`🎉 Updated ${updatedCount} environment files!`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Restart your development server: pnpm dev');
  console.log('2. Test the connection by visiting your app');
  console.log('3. If needed, run: node seed-data.js (to seed cloud database)');
  
  rl.close();
}); 