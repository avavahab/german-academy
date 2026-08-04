import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const masterEmail = "masteradmin@germanacademy.com"; // ഫിക്സഡ് യൂസർനെയിം/ഇമെയിൽ
  const masterPassword = "SecurePassword123";          // മാറ്റാൻ സാധിക്കുന്ന പാസ്‌വേഡ്

  const existingMaster = await prisma.user.findUnique({
    where: { email: masterEmail },
  });

  if (!existingMaster) {
    await prisma.user.create({
      data: {
        name: "Master Admin",
        email: masterEmail,
        password: masterPassword, // പ്രൊഡക്ഷനിൽ പാസ്‌വേഡ് ഹാഷ് ചെയ്യുക (bcrypt)
        role: "MASTER_ADMIN",
      },
    });
    console.log("Master Admin created successfully.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });