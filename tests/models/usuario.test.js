jest.mock('../../models/database', () => ({
  authenticate: jest.fn(),
  sync: jest.fn(),
}));

jest.mock('../../models/Usuario');

const Usuario = require('../../models/Usuario');
const {
    crearUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require('../../controllers/usuarios');


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Controlador de usuarios - pruebas unitarias', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('crearUsuario debe devolver 201 cuando se crea correctamente', async () => {
        const req = {
            body: { nombre: 'Naomi', email: 'naomi@test.com', pass: '123456' }
        };
        const res = mockResponse();

        Usuario.create.mockResolvedValue({ id: 1, ...req.body });

        await crearUsuario(req, res);

        expect(Usuario.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    test('crearUsuario debe devolver 400 si faltan campos', async () => {
        const req = {
            body: { email: 'naomi@test.com', pass: '123456' } 
        };
        const res = mockResponse();

        await crearUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: expect.any(String)
            })
        );
        expect(Usuario.create).not.toHaveBeenCalled();
    });

    test('obtenerUsuarios debe devolver la lista de usuarios', async () => {
        const req = {};
        const res = mockResponse();

        const usuariosMock = [
            { id: 1, nombre: 'Naomi' },
            { id: 2, nombre: 'Nadia' }
        ];

        Usuario.findAll.mockResolvedValue(usuariosMock);

        await obtenerUsuarios(req, res);

        expect(Usuario.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(usuariosMock);
    });
});