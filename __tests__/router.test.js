'use strict';

require('dotenv').config()

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
const bearer = require('../src/auth/middleware/bearer.js');

const mockRequest = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
};

describe('testing server for 404 on bad route', () =>{
  it ('should send a 404 status route does not exist', async () => {
    const response = await mockRequest.get('/scooby');
    expect(response.status).toEqual(404);
  })
})

describe('testing server for 404 on bad method', () =>{
  it ('should send a 404 status request method is invalid', async () => {
    const response = await mockRequest.post('/clothes/5');
    expect(response.status).toEqual(404);
  })
})

describe('testing server for 500 on no authorization', () =>{
  it ('should send a 500 status', async () => {
    const response = await mockRequest.post('/api/v2/food');
    expect(response.status).toEqual(500);
  })
})

describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)

      });

      it('can signin with basic', async () => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)

      });

    });

    describe('bad logins', () => {
      it('basic fails with known user and wrong password ', async () => {

        const response = await mockRequest.post('/signin')
          .auth('admin', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();

      });

      it('basic fails with unknown user', async () => {

        const response = await mockRequest.post('/signin')
          .auth('nobody', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()

      });

    })

  });

});
