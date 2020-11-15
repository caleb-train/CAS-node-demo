import supertest from 'supertest';
import { expect } from 'chai';
import { app } from './server';

const server = () => supertest(app);

describe('APP HOST /', () => {
  it('should return Welcome', async () => {
    const { status, body } = await server().get('/');

    expect(status).to.equal(200);
  });
  it('should return 404', async () => {
    const { status, body } = await server().get('/s');

    expect(status).to.equal(404);
  });
});
