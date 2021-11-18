import httpServer from '../../src/index';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import should from 'should';
import supertest from 'supertest';
supertest(httpServer);
import CocktailSchema from '../../src/models/cocktails';
import mongoose from 'mongoose';

const url = 'http://localhost:5000';
chai.should();
chai.use(chaiHttp);
describe('Test GET route /api/cocktail/rezept/:name', () => {
	it('It should return named rezept', (done) => {
		chai.request(url)
			.get('/api/cocktail/rezepte/test')
			.end((err, response) => {
				response.should.have.status(404);
				response.body.should.be.a('Object');
				response.body.should.have.property('message');
				response.body.should.have.property('message').eq('Not found');
				done();
			});
	});
});

describe('Test GET route /api/cocktail/random/rezept', () => {
	it('It should return random rezept', (done) => {
		chai.request(url)
			.get('/api/cocktail/random/rezept')
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('_id');
				response.body.should.have.property('name');
				done();
			});
	});
	it('Test POST route /api/cocktail/random/rezept', (done) => {
		chai.request(url)
			.post('/api/cocktail/random/rezept')
			.end((err, response) => {
				response.should.have.status(404);
				response.body.should.be.a('object');
				response.body.should.have.property('message');
				response.body.should.have.property('message').eq('Not found');
				done();
			});
	});
});
describe('Test GET route /api/cocktail/rezepte/all', () => {
	it('It should return all rezepte', (done) => {
		chai.request(url)
			.get('/api/cocktail/rezepte/all')
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a('array');
				response.body.length.should.not.be.eq(0);
				done();
			});
	});

	it('Test POST route /api/cocktail/rezepte/all', (done) => {
		chai.request(url)
			.post('/api/cocktail/rezepte/all')
			.end((err, response) => {
				response.should.have.status(404);
				response.body.should.be.a('object');
				response.body.should.have.property('message');
				response.body.should.have.property('message').eq('Not found');
				done();
			});
	});
});
describe('Test GET route /api/cocktail/rezept/', () => {
	it('It should return nothing', (done) => {
		chai.request(url)
			.get('/api/cocktail/rezept/')
			.end((err, response) => {
				response.should.have.status(404);
				response.body.should.be.a('object');
				response.body.should.have.property('message');
				response.body.should.have.property('message').eq('Not found');
				done();
			});
	});
	//TODO post mongoose???
});

// Zutaten:

describe('Test GET route /api/cocktail/zutat/:name', () => {
	it('It should return named zutat', (done) => {
		chai.request(url)
			.get('/api/cocktail/rezepte/test')
			.end((err, response) => {
				response.should.have.status(404);
				response.body.should.be.a('object');
				response.body.should.have.property('message');
				response.body.should.have.property('message').eq('Not found');
				done();
			});
	});
	//TODO test post but how to handle mongoose???
});

describe('Test GET route /api/cocktail/zutat/all', () => {
	it('It should return all zutaten', (done) => {
		chai.request(url)
			.get('/api/cocktail/zutaten/all')
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a('array');
				response.body.length.should.not.be.eq(0);
				done();
			});
	});

	it('Test POST route /api/cocktail/zutat/all', (done) => {
		chai.request(url)
			.post('/api/cocktail/zutaten/all')
			.end((err, response) => {
				response.should.have.status(404);
				response.body.should.be.a('object');
				response.body.should.have.property('message');
				response.body.should.have.property('message').eq('Not found');
				done();
			});
	});
});

describe('Task test mod', () => {
	describe('Test GET route /api/cocktail/rezepte/:name', () => {
		it('It should return named rezept', (done) => {
			chai.request(url)
				.get('/api/cocktail/rezepte/test')
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.be.a('object');
					response.body.should.have.property('message');
					response.body.should.have.property('message').eq('Not found');
					done();
				});
		});
		//TODO test post but how to handle mongoose???
	});
});
