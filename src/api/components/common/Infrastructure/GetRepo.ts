import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";

export function getRepo<BE>(modelName: string): PrismaRepository<BE> {
  return new PrismaRepository<BE>(modelName);
}