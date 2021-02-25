'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js');
const request = supergoose(server.server);

process.env.SECRET = 'Scooby';



describe('testing server for food v2 routes', () =>{

  it ('should create a food on POST /food', async () => {
    const signUp = await request.post('/signup').send({
      username: 'Frank',
      password: 'John',
      role: 'writer'
    });
    const signIn = await request.post('/signin')
      .auth('Frank', 'John');
    const userObject = signIn.body;

    const response = await request.post('/api/v2/food')
    .set('Authorization', `Bearer ${userObject.token}`)
    .send({
        name: 'taco',
        calories: 20,
        type: 'FRUIT'
    });
    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toEqual('taco')
  });
});


describe('testing for finding a food by ID', () =>{
  it ('should return a food object if correctly used', async () => {
    const signUp = await request.post('/signup').send({
      username: 'John',
      password: 'Frank',
      role: 'writer'
    });
    const signIn = await request.post('/signin')
      .auth('John', 'Frank');
    const userObject = signIn.body;

    const response = await request.post('/api/v2/food')
    .set('Authorization', `Bearer ${userObject.token}`)
    .send({
      name: 'spaghetti',
      calories: 20,
      type: 'FRUIT'
    });
    const findResponse = await request.get(`/api/v2/food/${response.body._id}`)
    .set('Authorization', `Bearer ${userObject.token}`);
    expect(findResponse.status).toEqual(200);
    expect(findResponse.body._id).toEqual(response.body._id);
  })
})

describe('testing for retrieving food database', () =>{
  it ('should return a food array if correctly used', async () => {
    const signUp = await request.post('/signup').send({
      username: 'Jim',
      password: 'Joe',
      role: 'user'
    });
    const signIn = await request.post('/signin')
      .auth('Jim', 'Joe');
    const userObject = signIn.body;
    const response = await request.get('/api/v2/food')
    .set('Authorization', `Bearer ${userObject.token}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  })
})

describe('testing for updating a food by ID', () =>{
  it ('should update a food object if correctly used', async () => {
    const signUp = await request.post('/signup').send({
      username: 'Jimmy',
      password: 'Joel',
      role: 'editor'
    });
    const signIn = await request.post('/signin')
      .auth('Jimmy', 'Joel');
    const userObject = signIn.body;
    const response = await request.post('/api/v2/food')
    .set('Authorization', `Bearer ${userObject.token}`)
    .send({
      name: 'ramen',
      calories: 20,
      type: 'FRUIT'
    });
    const updateResponse = await request.put(`/api/v2/food/${response.body._id}`)
    .set('Authorization', `Bearer ${userObject.token}`)
    .send({
      name: 'tapioca',
      calories: 40,
      type: 'FRUIT'
    });
    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body._id).toEqual(response.body._id);
    const findResponse = await request.get(`/api/v2/food/${response.body._id}`)
    .set('Authorization', `Bearer ${userObject.token}`);
    expect(findResponse.body.name).toEqual('tapioca');
  })
})

describe('testing for deleting a food by ID', () =>{
  it ('should delete a food object if correctly used', async () => {
    const signUp = await request.post('/signup').send({
      username: 'King',
      password: 'Kong',
      role: 'admin'
    });
    const signIn = await request.post('/signin')
      .auth('King', 'Kong');
    const userObject = signIn.body;
    const response = await request.post('/api/v2/food')
    .set('Authorization', `Bearer ${userObject.token}`)
    .send({
      name: 'ramune',
      calories: 20,
      type: 'FRUIT'
    });
    const deleteResponse = await request.delete(`/api/v2/food/${response.body._id}`)
    .set('Authorization', `Bearer ${userObject.token}`);;
    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.name).toEqual("ramune");
    expect(deleteResponse.body.type).toEqual("FRUIT");
  })
})