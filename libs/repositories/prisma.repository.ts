export class PrismaRepository<T> {
  prismaService: T;
  entityName: string;

  constructor(prismaService: T, entityName: string) {
    this.prismaService = prismaService;
    this.entityName = entityName;
  }

  async findOneById<T>(params: { where: { [key: string]: T } }) {
    return await this.prismaService[this.entityName].findUnique({
      where: params.where,
    });
  }

  async findOneBy<T>(params: { where: { [key: string]: T } }) {
    return await this.prismaService[this.entityName].findFirst({
      where: params.where,
    });
  }

  async findAll() {
    return await this.prismaService[this.entityName].findMany();
  }

  async findAllBy<T>(params: { where: { [key: string]: T } }) {
    return await this.prismaService[this.entityName].findMany({
      where: params.where,
    });
  }

  async create<T>(params: { data: T }) {
    return await this.prismaService[this.entityName].create({
      data: params.data,
    });
  }

  async updateBy<T, D>(params: { where: { [key: string]: T }; data: D }) {
    return await this.prismaService[this.entityName].update({
      where: params.where,
      data: params.data,
    });
  }

  async updateAllBy<T, D>(params: { where: { [key: string]: T }; data: D }) {
    return await this.prismaService[this.entityName].updateMany({
      where: params.where,
      data: params.data,
    });
  }

  async deleteBy<T>(params: { where: { [key: string]: T } }) {
    return await this.prismaService[this.entityName].delete({
      where: params.where,
    });
  }
}
