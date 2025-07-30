import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@pharmacy.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // Create some sample medications
  const medications = await prisma.medication.createMany({
    data: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        form: 'tablet',
        ndc: '12345-678-90',
        temperature: 'ROOM',
        controlled: false
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        form: 'tablet',
        ndc: '98765-432-10',
        temperature: 'ROOM',
        controlled: false
      },
      {
        name: 'Insulin',
        dosage: '100 units/mL',
        form: 'injection',
        ndc: '11111-222-33',
        temperature: 'REFRIGERATED',
        controlled: false
      }
    ]
  })

  // Create a sample patient
  const patient = await prisma.patient.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '555-0123',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345'
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('Admin login: admin@pharmacy.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })