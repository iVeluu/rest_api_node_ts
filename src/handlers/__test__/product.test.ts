import  request  from "supertest";
import server from "../../server";

describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor curvo - testing',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor curvo - testing',
            price: 'hola'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })


    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Desde Testing",
            price: 300
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('GET /api/products', () => {
    it('should check if api/product url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('get a json response with the products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errros')

    })
})

describe('GET /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    it('should check a valid ID in the URL', async () => {

        const response = await request(server).get('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('get a json with a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', ()  => {

    it('should check a valid ID in the URL', async () => {

        const response = await request(server).put('/api/products/not-valid-url').send({
            name: "Monitor Curvo",
            price: 1200,
            availability: true
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo",
            price: 0,
            availability: true
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Valor no válido')
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Curvo",
            price: 300,
            availability: true
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should update a valid product with valid data', async () => {
        const productId = 2000
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo - Actualizado",
            price: 300,
            availability: true
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})