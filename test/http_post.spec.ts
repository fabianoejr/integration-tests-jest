import pactum from 'pactum';

import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';

describe('Validacao', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'http://127.0.0.1:8000';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Validando endpoints usando POST', () => {
    it('Login na Plataforma', async () => {
      await p
        .spec()
        .post(`${baseUrl}/api/auth/login`)
        .withJson({
          email: 'fabianoeliasjunior@Hotmail.com',
          password: '123456'
        })
        .expectStatus(200)
        //.inspect();
    });
  });

  it('Cadastro na plataforma', async () => {
    await p
      .spec()
      .post(`${baseUrl}/api/auth/register`)
      .withJson({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .expectStatus(201)
      //.inspect();
  });
});
