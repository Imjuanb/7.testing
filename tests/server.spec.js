const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    test('Debería devolver un código de estado 200 y un arreglo con al menos un objeto', async () => {
        const response = await request(server).get('/cafes');
    
        expect(response.status).toBe(200);
      });
    
      test('Debería devolver un código de estado 404 si se intenta obtener un café con un ID inexistente', async () => {
        const idInexistente = 5;
        const response = await request(server).get(`/cafes/${idInexistente}`);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          message: 'No se encontró ningún cafe con ese id',
        });
      });
    
      test('Debería agregar un nuevo café y devolver un código de estado 201', async () => {
        const nuevoCafe = {
          id: 5,
          nombre: 'Expreso',
        };
    
        const response = await request(server).post('/cafes').send(nuevoCafe);
    
        expect(response.status).toBe(201);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(nuevoCafe);
      });
    
      test('Debería devolver un código de estado 400 si se intenta agregar un café con un ID existente', async () => {
        const cafeExistente = {
          id: 1,
          nombre: 'Cortado',
        };
    
        const response = await request(server).post('/cafes').send(cafeExistente);
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Ya existe un cafe con ese id' });
      });
    
      test('Debería devolver un código de estado 400 si el ID del parámetro no coincide con el ID del café recibido', async () => {
        const cafeExistente = {
          id: 1,
          nombre: 'Cortado',
        };
    
        const response = await request(server).put('/cafes/2').send(cafeExistente);
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: 'El id del parámetro no coincide con el id del café recibido',
        });
      });
    });
