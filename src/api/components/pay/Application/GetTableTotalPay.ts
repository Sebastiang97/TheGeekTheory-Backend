import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/Pay";

export class GetTableTotalPay {
  constructor(private payService: PayService) { }

  execute(query: any): Promise<Pay[]> {
    

    return this.payService.findAll({
      ...query,
      include: {
        payer: {
          select: {
            email: true,
            name: true,
            surname: true
          }
        }
      }
    })
  }
  
  // execute(): Promise<Pay[]> {

  //   return this.payService.findAll({
  //     include: {
  //       payer: {
  //         select: {
  //           email: true,
  //           name: true,
  //           surname: true
  //         }
  //       }
  //     }
  //   })
  // }

}

/*

const getPostsById = async (id, direction = 'next', pageSize = 5) => {
  // Obtener los posts en la dirección deseada
  let posts;

  if (direction === 'next') {
    posts = await prisma.post.findMany({
      where: {
        id: {
          gt: id, // Obtener posts con ID mayor al proporcionado
        },
      },
      take: pageSize,
      orderBy: {
        id: 'asc', // Ordenar por ID ascendente
      },
    });
  } else {
    posts = await prisma.post.findMany({
      where: {
        id: {
          lt: id, // Obtener posts con ID menor al proporcionado
        },
      },
      take: pageSize,
      orderBy: {
        id: 'desc', // Ordenar por ID descendente
      },
    });
  }

  // Si no se encuentran posts, devolver array vacío
  if (posts.length === 0) {
    return {
      previewId: null,
      posts: [],
      lastId: null,
    };
  }

  const lastId = posts.length > 0 ? posts[posts.length - 1].id : null;

  return {
    previewId: id,
    posts,
    lastId,
  };
};
 */