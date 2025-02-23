const request = require('supertest');
const app = require('../server'); // Adjust path based on your file structure

describe('GET /api/quizzes', () => {
  it('should return a list of quizzes', async () => {
    const response = await request(app).get('/api/quizzes');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: expect.any(Number), title: expect.any(String) }),
    ]));
  });

  it('should return a 404 error if no quizzes found', async () => {
    // Simulate no quizzes in DB (adjust depending on your setup)
    const response = await request(app).get('/api/quizzes');
    expect(response.status).toBe(404);
  });
});
