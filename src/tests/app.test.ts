import request from 'supertest'
import app from '../app'

test("GET /", async () => {
    const res = await request(app)
    .get("/")
    expect(res.status).toBe(200)
})