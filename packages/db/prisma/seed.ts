import prisma from "../src";
import bcrypt from "bcrypt";

async function seed() {
  const alice = await prisma.user.upsert({
    where: { number: "111111" },
    update: {},
    create: {
      number: "111111",
      password: await bcrypt.hash("alice0", 10),
      name: "Alice",
      Balance: {
        create: {
          amount: 1000000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
            startTime: new Date(),
            amount: 1000000,
            status: "Success",    
            token: "token_1",
            provider: "HDFC"
        }
      }
    },
  });
  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      Balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ alice, bob })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
