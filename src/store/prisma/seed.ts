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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/fma1p2hozywndfssxot4.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/cjcbpvn1rryvdmsgnce0.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
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
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
            isMain: true
          },
          { 
            url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
            isMain: true
          }
        ],
      },
    },
  });

  // Crear imágenes para subcategorías
  await prisma.subCategoryImage.create({
    data: {
      url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/b5g3uctj9epkbww55mqa.png',
      subCategoryId: cropTopsSubCategory.id,
    },
  });

  await prisma.subCategoryImage.create({
    data: {
      url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/yj0mc68ti0cwldmc9w9z.png',
      subCategoryId: tShirtsSubCategory.id,
    },
  });






  // // Crear algunos ProductPay
  // const productPay1 = await prisma.productPay.create({
  //   data: {
  //     name: 'Taza Personalizada',
  //     description: 'Taza de cerámica con tu nombre',
  //     price: 1500,
  //     size: 'M',
  //     color: 'Blanco',
  //     typeStamping: 'Serigrafía',
  //     quantity: 100,
  //     urlImage: {
  //       create: [
  //         { 
  //           url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
  //           isMain: true
  //         },
  //         { 
  //           url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
  //           isMain: false
  //         }
  //       ],
  //     },
  //   },
  // });

  // const productPay2 = await prisma.productPay.create({
  //   data: {
  //     name: 'Taza Personalizada',
  //     description: 'Taza de cerámica con tu nombre',
  //     price: 1500,
  //     size: 'M',
  //     color: 'Blanco',
  //     typeStamping: 'Serigrafía',
  //     quantity: 100,
  //     urlImage: {
  //       create: [
  //         { 
  //           url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/gqmwmuhg0idavqgqxlzp.png',
  //           isMain: true
  //         },
  //         { 
  //           url: 'https://res.cloudinary.com/dk41avvjd/image/upload/v1716168105/lbfe7vl6gkhlxdxsgfrz.png',
  //           isMain: false
  //         }
  //       ],
  //     },
  //   },
  // });

  // // Crear un Pay asociado a un Payer
  // const pay1 = await prisma.pay.create({
  //   data: {
  //     paymentId: 'PAY123456',
  //     description: 'Pago por taza personalizada',
  //     amount: 1500,
  //     state: 'COMPLETED',
  //     payerId: "3808c5a1-f976-4d0d-b03f-259051038d04",
  //     productsPay: {
  //       connect: { id: productPay1.id },
  //     },
  //   },
  // });

  // const pay2 = await prisma.pay.create({
  //   data: {
  //     paymentId: 'PAY123456',
  //     description: 'Pago por taza personalizada',
  //     amount: 1500,
  //     state: 'COMPLETED',
  //     payerId: "3808c5a1-f976-4d0d-b03f-259051038d04",
  //     productsPay: {
  //       connect: { id: productPay2.id },
  //     },
  //   },
  // });
  

  // console.log(pay1, pay2)
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });