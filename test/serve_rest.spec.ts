import pactum from 'pactum';
import { inspect } from 'util';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';

describe('ServeRest API', () => {
  let token = '';
  let produto = '';
  let i = 0;
  let arrProduto = [];
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://serverest.dev';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Login', () => {
    it('POST', async () => {
      token = await p
        .spec()
        .post(`${baseUrl}/login`)
        .withJson({
          email: 'fulano@qa.com',
          password: 'teste'
        })
        .expectStatus(200)
        .returns('authorization');
    });
  });

  describe('Usuários', () => {
    it('GET ALL', async () => {
      await p
        .spec()
        .get(`${baseUrl}/usuarios`)
        .withHeaders('Authorization', token)
        .expectStatus(200);
    });
  });

  describe('produtos', () => {
    for (i; i <= 2; i++) {
      it('post', async () => {
        produto = await p
          .spec()
          .post(`${baseUrl}/produtos`)
          .withHeaders('Authorization', token)
          .withJson({
            nome: faker.commerce.product() + 150801,
            preco: 5000,
            descricao: faker.commerce.product() + 150801,
            quantidade: 1
          })
          .expectStatus(201)
          .expectBodyContains('Cadastro realizado com sucesso')
          .inspect()
          .returns('_id');
        arrProduto.push(produto);
        console.log(arrProduto);
      });
    }
  });

  describe('carrinhos', () => {
    arrProduto.forEach(function (idproduto) {
      it('post', async () => {
        await p
          .spec()
          .post(`${baseUrl}/carrinhos`)
          .withHeaders('Authorization', token)
          .withJson({
            idProduto: idproduto,
            quantidade: 1
          })
          .expectStatus(201)
          .inspect();
      });
    });
  });
});
