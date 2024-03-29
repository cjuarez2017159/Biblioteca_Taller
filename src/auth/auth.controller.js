import bcryptjs from 'bcryptjs';
import Usuario from '../user/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, Correo no existe en la Database",
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario no existe en la Database",
            });
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta",
            });
        }
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Inicio Exitoso',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador",
        });
    }
}