'use strict';

const supergoose = require('@code-fellows/supergoose');
const { response } = require('express');
const supertest = require ('supertest');
const server = require('../src/server.js');
const request = supergoose(server.server);



describe('testing server for create a food', () =>{
  it ('should create a food on POST /food', async () => {
    const response = await request.post('/api/v1/food').send({
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
    const response = await request.post('/api/v1/food').send({
      name: 'spaghetti',
      calories: 20,
      type: 'FRUIT'
    });
    const findResponse = await request.get(`/api/v1/food/${response.body._id}`);
    expect(findResponse.status).toEqual(200);
    expect(findResponse.body._id).toEqual(response.body._id);
  })
})

describe('testing for retrieving food database', () =>{
  it ('should return a food array if correctly used', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  })
})

describe('testing for updating a food by ID', () =>{
  it ('should update a food object if correctly used', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'ramen',
      calories: 20,
      type: 'FRUIT'
    });
    const updateResponse = await request.put(`/api/v1/food/${response.body._id}`).send({
      name: 'tapioca',
      calories: 40,
      type: 'FRUIT'
    });
    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body._id).toEqual(response.body._id);
    const findResponse = await request.get(`/api/v1/food/${response.body._id}`);
    expect(findResponse.body.name).toEqual('tapioca');
  })
})

describe('testing for deleting a food by ID', () =>{
  it ('should delete a food object if correctly used', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'ramune',
      calories: 20,
      type: 'FRUIT'
    });
    const deleteResponse = await request.delete(`/api/v1/food/${response.body._id}`);
    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.name).toEqual("ramune");
    expect(deleteResponse.body.type).toEqual("FRUIT");
  })
})

describe('testing server for create clothes', () =>{
  it ('should create a food on POST /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'jacket',
      color: 'blue',
      size: 'Large'
    });
    expect(response.status).toEqual(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toEqual('jacket')
  });
});


describe('testing for finding a cloth by ID', () =>{
  it ('should return a clothing object if correctly used', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'Pink',
      color: 'blue',
      size: 'Large'
    });
    const findResponse = await request.get(`/api/v1/clothes/${response.body._id}`);
    expect(findResponse.status).toEqual(200);
    expect(findResponse.body._id).toEqual(response.body._id);
  })
})

describe('testing for retrieving clothes database', () =>{
  it ('should return a clothes array if correctly used', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  })
})

describe('testing for updating a cloth by ID', () =>{
  it ('should update a cloth object if correctly used', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'Purple',
      color: 'blue',
      size: 'Large'
    });
    const updateResponse = await request.put(`/api/v1/clothes/${response.body._id}`).send({
      name: 'tango',
      color: 'blue',
      size: 'Large'
    });
    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body._id).toEqual(response.body._id);
    const findResponse = await request.get(`/api/v1/clothes/${response.body._id}`);
    expect(findResponse.body.name).toEqual('tango');
  })
})

describe('testing for deleting a food by ID', () =>{
  it ('should delete a food object if correctly used', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'jacket',
      color: 'blue',
      size: 'Large'
    });
    const deleteResponse = await request.delete(`/api/v1/clothes/${response.body._id}`);
    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.name).toEqual("jacket");
    expect(deleteResponse.body.size).toEqual("Large");
  })
})