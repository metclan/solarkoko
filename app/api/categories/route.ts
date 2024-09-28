import { Category } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";
export async function POST () {
    // Array of categories with parent-child relationships
const categories = [
    {
      name: 'Solar Panels',
      slug: 'solar-panels',
      description: 'High-quality solar panels for various applications.',
      metaTitle: 'Solar Panels for Home and Business',
      metaDescription: 'Find the best solar panels, including monocrystalline and polycrystalline types.',
      metaKeywords: ['solar panels', 'monocrystalline', 'polycrystalline', 'thin-film'],
      subcategories: [
        {
          name: 'Monocrystalline Solar Panels',
          slug: 'monocrystalline-solar-panels',
          description: 'High-efficiency monocrystalline solar panels.',
          metaTitle: 'Monocrystalline Solar Panels',
          metaDescription: 'Buy high-efficiency monocrystalline solar panels.',
          metaKeywords: ['monocrystalline solar panels', 'high-efficiency'],
        },
        {
          name: 'Polycrystalline Solar Panels',
          slug: 'polycrystalline-solar-panels',
          description: 'Affordable polycrystalline solar panels.',
          metaTitle: 'Polycrystalline Solar Panels',
          metaDescription: 'Affordable and efficient polycrystalline solar panels.',
          metaKeywords: ['polycrystalline solar panels', 'affordable solar'],
        },
        {
          name: 'Thin-Film Solar Panels',
          slug: 'thin-film-solar-panels',
          description: 'Flexible thin-film solar panels for various uses.',
          metaTitle: 'Thin-Film Solar Panels',
          metaDescription: 'Flexible and lightweight thin-film solar panels.',
          metaKeywords: ['thin-film solar panels', 'flexible solar panels'],
        },
        {
          name: 'Flexible Solar Panels',
          slug: 'flexible-solar-panels',
          description: 'Portable and lightweight flexible solar panels.',
          metaTitle: 'Flexible Solar Panels',
          metaDescription: 'Portable and lightweight flexible solar panels.',
          metaKeywords: ['flexible solar panels', 'portable solar panels'],
        },
        {
          name: 'Portable Solar Panels',
          slug: 'portable-solar-panels',
          description: 'Compact solar panels for on-the-go use.',
          metaTitle: 'Portable Solar Panels',
          metaDescription: 'Compact and portable solar panels for travel and camping.',
          metaKeywords: ['portable solar panels', 'travel solar panels'],
        }
      ]
    },
    {
      name: 'Solar Inverters',
      slug: 'solar-inverters',
      description: 'Solar inverters for converting DC to AC power.',
      metaTitle: 'Solar Inverters for All Solar Systems',
      metaDescription: 'Shop for solar inverters, including string inverters, microinverters, and hybrid inverters.',
      metaKeywords: ['solar inverters', 'string inverters', 'microinverters', 'hybrid inverters'],
      subcategories: [
        {
          name: 'String Inverters',
          slug: 'string-inverters',
          description: 'Reliable string inverters for solar systems.',
          metaTitle: 'String Inverters',
          metaDescription: 'Buy reliable string inverters for your solar system.',
          metaKeywords: ['string inverters', 'solar system inverters'],
        },
        {
          name: 'Microinverters',
          slug: 'microinverters',
          description: 'Efficient microinverters for individual solar panels.',
          metaTitle: 'Microinverters',
          metaDescription: 'Find efficient microinverters for individual solar panels.',
          metaKeywords: ['microinverters', 'panel inverters'],
        },
        {
          name: 'Hybrid Inverters',
          slug: 'hybrid-inverters',
          description: 'Inverters that support both grid and off-grid solar systems.',
          metaTitle: 'Hybrid Inverters',
          metaDescription: 'Shop for hybrid inverters that work in both grid and off-grid systems.',
          metaKeywords: ['hybrid inverters', 'off-grid inverters', 'grid-tie inverters'],
        },
        {
          name: 'Off-Grid Inverters',
          slug: 'off-grid-inverters',
          description: 'Inverters for off-grid solar systems.',
          metaTitle: 'Off-Grid Inverters',
          metaDescription: 'Buy off-grid inverters for standalone solar systems.',
          metaKeywords: ['off-grid inverters', 'standalone solar inverters'],
        },
        {
          name: 'Grid-Tie Inverters',
          slug: 'grid-tie-inverters',
          description: 'Inverters that tie directly into the grid.',
          metaTitle: 'Grid-Tie Inverters',
          metaDescription: 'Shop for grid-tie inverters that connect to the power grid.',
          metaKeywords: ['grid-tie inverters', 'grid-connected inverters'],
        }
      ]
    },
    {
      name: 'Solar Batteries',
      slug: 'solar-batteries',
      description: 'Energy storage solutions for solar systems.',
      metaTitle: 'Solar Batteries for Energy Storage',
      metaDescription: 'Explore solar batteries, including lithium-ion and lead-acid batteries.',
      metaKeywords: ['solar batteries', 'energy storage', 'lithium-ion', 'lead-acid'],
      subcategories: [
        {
          name: 'Lithium-Ion Batteries',
          slug: 'lithium-ion-batteries',
          description: 'High-efficiency lithium-ion batteries for solar systems.',
          metaTitle: 'Lithium-Ion Solar Batteries',
          metaDescription: 'Buy lithium-ion batteries for your solar setup.',
          metaKeywords: ['lithium-ion batteries', 'solar storage batteries'],
        },
        {
          name: 'Lead-Acid Batteries',
          slug: 'lead-acid-batteries',
          description: 'Affordable lead-acid batteries for solar energy storage.',
          metaTitle: 'Lead-Acid Solar Batteries',
          metaDescription: 'Shop for affordable lead-acid solar batteries.',
          metaKeywords: ['lead-acid batteries', 'solar batteries'],
        },
        {
          name: 'Gel Batteries',
          slug: 'gel-batteries',
          description: 'Durable gel batteries for energy storage.',
          metaTitle: 'Gel Solar Batteries',
          metaDescription: 'Find durable gel batteries for solar energy storage.',
          metaKeywords: ['gel batteries', 'solar energy storage'],
        },
        {
          name: 'AGM Batteries',
          slug: 'agm-batteries',
          description: 'AGM (Absorbent Glass Mat) batteries for solar systems.',
          metaTitle: 'AGM Solar Batteries',
          metaDescription: 'Buy AGM solar batteries for reliable energy storage.',
          metaKeywords: ['AGM batteries', 'solar system batteries'],
        }
      ]
    },
    {
      name: 'Solar Charge Controllers',
      slug: 'solar-charge-controllers',
      description: 'Control and manage the power flow in solar systems.',
      metaTitle: 'Solar Charge Controllers',
      metaDescription: 'Shop for PWM and MPPT solar charge controllers.',
      metaKeywords: ['solar charge controllers', 'MPPT', 'PWM'],
      subcategories: [
        {
          name: 'PWM Charge Controllers',
          slug: 'pwm-charge-controllers',
          description: 'Affordable PWM charge controllers for small systems.',
          metaTitle: 'PWM Charge Controllers',
          metaDescription: 'Find affordable PWM charge controllers for your solar setup.',
          metaKeywords: ['PWM charge controllers', 'solar controllers'],
        },
        {
          name: 'MPPT Charge Controllers',
          slug: 'mppt-charge-controllers',
          description: 'Efficient MPPT charge controllers for optimizing power output.',
          metaTitle: 'MPPT Charge Controllers',
          metaDescription: 'Shop for high-efficiency MPPT charge controllers.',
          metaKeywords: ['MPPT charge controllers', 'solar power optimization'],
        }
      ]
    },
    {
      name: 'Solar PTZ Cameras',
      slug: 'solar-ptz-cameras',
      description: 'Solar-powered PTZ cameras for surveillance.',
      metaTitle: 'Solar PTZ Cameras',
      metaDescription: 'Buy solar-powered PTZ cameras for monitoring and surveillance.',
      metaKeywords: ['solar PTZ cameras', 'solar security cameras'],
      subcategories: [
        {
          name: 'Wireless Solar PTZ Cameras',
          slug: 'wireless-solar-ptz-cameras',
          description: 'Wireless solar-powered PTZ cameras for remote monitoring.',
          metaTitle: 'Wireless Solar PTZ Cameras',
          metaDescription: 'Explore wireless solar-powered PTZ cameras for easy installation.',
          metaKeywords: ['wireless solar PTZ cameras', 'remote monitoring cameras'],
        },
        {
          name: '4G Solar PTZ Cameras',
          slug: '4g-solar-ptz-cameras',
          description: '4G-enabled solar-powered PTZ cameras for enhanced connectivity.',
          metaTitle: '4G Solar PTZ Cameras',
          metaDescription: 'Shop for 4G-enabled solar-powered PTZ cameras for secure surveillance.',
          metaKeywords: ['4G solar PTZ cameras', 'connected solar cameras'],
        }
      ]
    }
  ];
  // Create parent and subcategories
  for (const category of categories) {
    const parentCategory = await Category.create({
      name: category.name,
      slug: category.slug,
      description: category.description,
      metaTitle: category.metaTitle,
      metaDescription: category.metaDescription,
      metaKeywords: category.metaKeywords
    });

    for (const subcategory of category.subcategories) {
      await Category.create({
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        metaTitle: subcategory.metaTitle,
        metaDescription: subcategory.metaDescription,
        metaKeywords: subcategory.metaKeywords,
        parent: parentCategory._id
      });
    }
    }
    return NextResponse.json({message : "Categories added"}, { status : 200})  
}

export async function GET (req: NextRequest) {
  const fetchCategories = await Category.find({});
  return NextResponse.json({ ...fetchCategories }, { status : 200})
}