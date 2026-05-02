import mongoose from 'mongoose';
import config from './src/config/env.js';
import { connectDB, disconnectDB } from './src/config/database.js';

import Staff from './src/modules/staff/model/staff.model.js';
import Driver from './src/modules/drivers/model/driver.model.js';
import VehicleCategory from './src/modules/vehicle-categories/model/vehicleCategory.model.js';
import Pricing from './src/modules/pricing/model/pricing.model.js';
import ToursPackage from './src/modules/taxi/model/toursPackage.model.js';

async function seed() {
  try {
    await connectDB();
    console.log('Connected to DB');

    // 1. Clear existing data for a clean seed
    console.log('Clearing existing staff/drivers...');
    const staffDeleted = await Staff.deleteMany({ role: 'admin' });
    const driversDeleted = await Driver.deleteMany({});
    const toursDeleted = await ToursPackage.deleteMany({});
    console.log(`Deleted ${staffDeleted.deletedCount} admins, ${driversDeleted.deletedCount} drivers, and ${toursDeleted.deletedCount} tours`);

    // 2. Admin User
    await Staff.create({
      name: 'Admin User',
      email: 'admin@nammaxi.com',
      phone: '9876543210',
      passwordHash: 'password123', // auto hashed by pre-save
      role: 'admin',
    });
    console.log('✅ Admin user re-created: admin@nammaxi.com / password123');

    // 2. Vehicle Categories
    await VehicleCategory.deleteMany({});
    
    const catHatch = await VehicleCategory.create({
      name: 'Compact Hatch',
      brand: 'Swift',
      seats: 4,
      luggage: 1,
      ac: false,
      baseDisplayPrice: 450,
      image: 'service_tours-removebg-preview - Copy.png',
      description: 'Economical and fast commute for city and airport runs.',
      sortOrder: 1,
    });

    const catSedan = await VehicleCategory.create({
      name: 'Sedan Premium',
      brand: 'Toyota',
      seats: 4,
      luggage: 2,
      ac: true,
      baseDisplayPrice: 750,
      image: 'service_airport-removebg-preview - Copy.png',
      description: 'Highest rated sedan with maximum comfort and professional driver.',
      sortOrder: 2,
    });
    const sedanCatId = catSedan._id;

    const catSuv = await VehicleCategory.create({
      name: 'SUV Luxury',
      brand: 'Innova',
      seats: 7,
      luggage: 4,
      ac: true,
      baseDisplayPrice: 1200,
      image: 'service_outstation_-_Copy-removebg-preview - Copy.png',
      description: 'Spacious SUV perfect for family trips and heavy luggage.',
      sortOrder: 3,
    });

    console.log('Vehicle categories seeded');

    // 3. Pricing
    await Pricing.deleteMany({});

    // Airport Pricing
    const airportModes = ['pickup', 'drop'];
    for (const mode of airportModes) {
      await Pricing.create({
        serviceType: 'airport',
        tripMode: mode,
        vehicleCategoryId: catHatch._id,
        baseFare: 450,
        perKmRate: 15,
        minimumKm: 10,
      });
      await Pricing.create({
        serviceType: 'airport',
        tripMode: mode,
        vehicleCategoryId: catSedan._id,
        baseFare: 750,
        perKmRate: 20,
        minimumKm: 15,
      });
      await Pricing.create({
        serviceType: 'airport',
        tripMode: mode,
        vehicleCategoryId: catSuv._id,
        baseFare: 1200,
        perKmRate: 25,
        minimumKm: 20,
      });
    }

    // Outstation Pricing
    const outstationModes = ['oneway', 'roundtrip'];
    for (const mode of outstationModes) {
      await Pricing.create({
        serviceType: 'outstation',
        tripMode: mode,
        vehicleCategoryId: catHatch._id,
        baseFare: 500,
        perKmRate: 14,
        minimumKm: 130, // example
        driverAllowance: mode === 'roundtrip' ? 300 : 0,
      });
      await Pricing.create({
        serviceType: 'outstation',
        tripMode: mode,
        vehicleCategoryId: catSedan._id,
        baseFare: 800,
        perKmRate: 18,
        minimumKm: 130,
        driverAllowance: mode === 'roundtrip' ? 300 : 0,
      });
      await Pricing.create({
        serviceType: 'outstation',
        tripMode: mode,
        vehicleCategoryId: catSuv._id,
        baseFare: 1300,
        perKmRate: 22,
        minimumKm: 130,
        driverAllowance: mode === 'roundtrip' ? 400 : 0,
      });
    }
    
    // 3.5 Tours Packages
    const tourPackageData = [
      { slug: "1day_450km_arunachalam", name: "1 DAY TRIP ARUNACHALAM/TIRUVANNAMALAI PACKAGE 450 KM", basePrice: 4500, maxKm: 450, maxHours: 24, description: "Full day spiritual trip to Arunachalam." },
      { slug: "1day_300km_hogenakkal", name: "1 DAY TRIP HOGENAKKAL FALLS PACKAGE 300 KM", basePrice: 3500, maxKm: 300, maxHours: 18, description: "Enjoy the waterfalls at Hogenakkal." },
      { slug: "1day_300km_lepakshi", name: "1 DAY TRIP LEPAKSHI & ISHA/ADIYOGI PACKAGE 300 KM", basePrice: 3200, maxKm: 300, maxHours: 15, description: "Historical Lepakshi and serene Isha Foundation." },
      { slug: "3day_mysore_coorg", name: "3 DAY TRIP MYSORE & COORG/MADIKERI PACKAGE KM", basePrice: 12000, maxKm: 800, maxHours: 72, description: "Comprehensive tour of Mysore and Coorg." },
      { slug: "4hr_40km", name: "4 Hours 40 KM", basePrice: 1200, maxKm: 40, maxHours: 4, description: "Quick city run or local errands." },
      { slug: "8hr_160km_isha", name: "8 Hours Isha Foundation Chikkaballapura 160 km", basePrice: 2800, maxKm: 160, maxHours: 8, description: "Visit Isha Foundation at Chikkaballapura." },
      { slug: "8hr_160km_nandi", name: "8 Hours Nandi Hills Roundtrip 160 km", basePrice: 2500, maxKm: 160, maxHours: 8, description: "Scenic sunrise at Nandi Hills." },
      { slug: "8hr_80km", name: "8 Hours 80 KM", basePrice: 1800, maxKm: 80, maxHours: 8, description: "Half-day city tour." },
      { slug: "10hr_200km_nandi_isha", name: "10 Hours Nandi Hills + Isha Foundation 200 KM", basePrice: 3800, maxKm: 200, maxHours: 10, description: "Best of both: Nandi Hills and Isha." },
      { slug: "10hr_200km_kotilingeshwara", name: "10 Hours KOTILINGESHWARA 200KM PACKAGE", basePrice: 3500, maxKm: 200, maxHours: 10, description: "Visit the world famous Kotilingeshwara temple." },
      { slug: "12hr_300km_koti_isha", name: "12 Hours KOTILINGESHWARA + ISHA FOUNDATION 300KM", basePrice: 4800, maxKm: 300, maxHours: 12, description: "Long spiritual day tour." },
      { slug: "24hr_mysore", name: "24 Hours DAY TRIP MYSORE PACKAGE", basePrice: 5500, maxKm: 400, maxHours: 24, description: "One day trip to the Palace city." }
    ];

    for (const pkg of tourPackageData) {
      await ToursPackage.create(pkg);
    }
    console.log(`✅ Seeded ${tourPackageData.length} tours packages`);

    // Tours Pricing (using the stable values)
    const tourPackages = [
      "1day_450km_arunachalam",
      "1day_300km_hogenakkal",
      "1day_300km_lepakshi",
      "3day_mysore_coorg",
      "4hr_40km",
      "8hr_160km_isha",
      "8hr_160km_nandi",
      "8hr_80km",
      "10hr_200km_nandi_isha",
      "10hr_200km_kotilingeshwara",
      "12hr_300km_koti_isha",
      "24hr_mysore"
    ];

    for (const pkg of tourPackages) {
      await Pricing.create({
        serviceType: 'tours',
        tripMode: pkg,
        vehicleCategoryId: catHatch._id,
        packagePrice: 1500, // Example generic pricing
      });
      await Pricing.create({
        serviceType: 'tours',
        tripMode: pkg,
        vehicleCategoryId: catSedan._id,
        packagePrice: 2000,
      });
      await Pricing.create({
        serviceType: 'tours',
        tripMode: pkg,
        vehicleCategoryId: catSuv._id,
        packagePrice: 3000,
      });
    }

    // Local Pricing (City Rides)
    await Pricing.create({
      serviceType: 'local',
      tripMode: 'city_ride',
      vehicleCategoryId: catHatch._id,
      baseFare: 50,
      perKmRate: 12,
      minimumKm: 5,
    });
    await Pricing.create({
      serviceType: 'local',
      tripMode: 'city_ride',
      vehicleCategoryId: catSedan._id,
      baseFare: 80,
      perKmRate: 15,
      minimumKm: 5,
    });
    await Pricing.create({
      serviceType: 'local',
      tripMode: 'city_ride',
      vehicleCategoryId: catSuv._id,
      baseFare: 120,
      perKmRate: 18,
      minimumKm: 5,
    });

    // 4. Test Driver
    await Driver.create({
      name: 'Test Driver',
      phone: '9999999999',
      passwordHash: '123456',
      licenseNumber: 'DL-1234567890',
      vehicleNumber: 'KA-01-AB-1234',
      vehicleCategoryId: sedanCatId,
      status: 'available',
      isActive: true,
    });
    console.log('✅ Driver created: 9999999999 / 123456');

    console.log('Pricing seeded');
    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await disconnectDB();
  }
}

seed();
