import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear categorías
  const tShirtsCategory = await prisma.category.create({
    data: {
      name: 'T-Shirts',
    },
  });

  const cropTopsCategory = await prisma.category.create({
    data: {
      name: 'Crop Tops',
    },
  });

  // Crear subcategorías
  const tShirtsSubCategory = await prisma.subCategory.create({
    data: {
      name: 'T-Shirts',
      code: 'PHN',
      categoryId: tShirtsCategory.id,
    },
  });

  const cropTopsSubCategory = await prisma.subCategory.create({
    data: {
      name: 'Crop Tops',
      code: 'CT',
      categoryId: cropTopsCategory.id,
    },
  });

  // Crear productos
  await prisma.product.create({
    data: {
      name: 'Camiseta manga Corta',
      description: 'Camiseta Manga corta talla L color negro',
      price: 999,
      size: 'L',
      color: '#000',
      typeStamping: "DTF",
      quantity: 50,
      subCategoryId: tShirtsSubCategory.id,
      categoryId: tShirtsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: false 
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camiseta manga Corta',
      description: 'Camiseta Manga corta talla L color blanca',
      price: 999,
      size: 'L',
      color: '#fff',
      typeStamping: "DTF",
      quantity: 50,
      subCategoryId: tShirtsSubCategory.id,
      categoryId: tShirtsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: false 
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camiseta manga Corta',
      description: 'Camiseta Manga corta talla L color verde',
      price: 999,
      size: 'L',
      color: '#70c250',
      typeStamping: "DTF",
      quantity: 50,
      subCategoryId: tShirtsSubCategory.id,
      categoryId: tShirtsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: false 
          }
        ],
      },
    },
  });


  await prisma.product.create({
    data: {
      name: 'Camiseta manga Corta',
      description: 'Camiseta Manga corta talla S color blanco',
      price: 999,
      size: 'S',
      color: '#fff',
      typeStamping: "DTF",
      quantity: 50,
      subCategoryId: tShirtsSubCategory.id,
      categoryId: tShirtsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: false 
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camiseta manga Corta',
      description: 'Camiseta Manga corta talla S color negro',
      price: 999,
      size: 'S',
      color: '#000',
      typeStamping: "DTF",
      quantity: 50,
      subCategoryId: tShirtsSubCategory.id,
      categoryId: tShirtsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: false 
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camisa ombliguera',
      description: 'Camisa ombliguera talla L color azul',
      price: 29.99,
      size: 'L',
      color: '#0423d2',
      typeStamping: "Sublimado",
      quantity: 100,
      subCategoryId: cropTopsSubCategory.id,
      categoryId: cropTopsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camisa ombliguera',
      description: 'Camisa ombliguera talla L color blanca',
      price: 29.99,
      size: 'L',
      color: '#fff',
      typeStamping: "Sublimado",
      quantity: 100,
      subCategoryId: cropTopsSubCategory.id,
      categoryId: cropTopsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camisa ombliguera',
      description: 'Camisa ombliguera talla L color negra',
      price: 29.99,
      size: 'L',
      color: '#000',
      typeStamping: "Sublimado",
      quantity: 100,
      subCategoryId: cropTopsSubCategory.id,
      categoryId: cropTopsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          }
        ],
      },
    },
  });


  await prisma.product.create({
    data: {
      name: 'Camisa ombliguera',
      description: 'Camisa ombliguera talla S color azul',
      price: 29.99,
      size: 'S',
      color: '#0423d2',
      typeStamping: "Sublimado",
      quantity: 100,
      subCategoryId: cropTopsSubCategory.id,
      categoryId: cropTopsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camisa ombliguera',
      description: 'Camisa ombliguera talla S color blanca',
      price: 29.99,
      size: 'S',
      color: '#fff',
      typeStamping: "Sublimado",
      quantity: 100,
      subCategoryId: cropTopsSubCategory.id,
      categoryId: cropTopsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          }
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Camisa ombliguera',
      description: 'Camisa ombliguera talla S color negra',
      price: 29.99,
      size: 'S',
      color: '#000',
      typeStamping: "Sublimado",
      quantity: 100,
      subCategoryId: cropTopsSubCategory.id,
      categoryId: cropTopsCategory.id,
      urlImage: {
        create: [
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
            isMain: true
          }
        ],
      },
    },
  });

  // Crear imágenes para subcategorías
  await prisma.subCategoryImage.create({
    data: {
      url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
      subCategoryId: cropTopsSubCategory.id,
    },
  });

  await prisma.subCategoryImage.create({
    data: {
      url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
      subCategoryId: tShirtsSubCategory.id,
    },
  });

  // Crear usuarios
  // await prisma.user.create({
  //   data: {
  //     name: 'Jane Doe',
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     email: 'jane.doe@example.com',
  //     picture: 'https://example.com/jane.jpg',
  //     googleId: 'google-id-123',
  //     role: 'USER',
  //   },
  // });

  // // Crear pagadores
  // const payer = await prisma.payer.create({
  //   data: {
  //     name: 'John Smith',
  //     surname: 'Smith',
  //     city: 'Bogotá D.C',
  //     email: 'john.smith@example.com',
  //     phone: '1234567890',
  //     address: '123 Main St',
  //     zipCode: '110111',
  //     detailAddress: 'Apt 101',
  //   },
  // });

  // // Crear pagos
  // await prisma.pay.create({
  //   data: {
  //     paymentId: 'pay-id-123',
  //     description: 'Payment for products',
  //     amount: 1029,
  //     state: 'Completed',
  //     payerId: payer.id,
  //     productsPay: {
  //       create: [
  //         {
  //           name: 'iPhone 13',
  //           description: 'Latest iPhone model',
  //           price: 999.99,
  //           size: 'N/A',
  //           color: 'Black',
  //           quantity: 1,
  //           urlImage: {
  //             create: [
  //               { url: 'https://example.com/iphone13-pay.jpg' },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });