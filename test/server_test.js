import { describe, before, it } from 'mocha';
import supertest from 'supertest';
import server from '../src/server';
// import expect from 'expect';

describe('Server A PI', () => {

  it('should respond to api/employees/ids request with list of ids', (done) => {
    const tid = 123;
    supertest(server)
      .get(`/terms/${tid}/longest-preview-media-url`)
      .set('Accept', 'application/json')
      .expect(200, [], done);
  });

});
