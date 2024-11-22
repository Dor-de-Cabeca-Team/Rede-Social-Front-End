export class User {
  id!: string;
  nome!: string;
  email!: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init); // Inicializa as propriedades do objeto
  }
}
