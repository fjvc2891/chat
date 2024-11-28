const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token JWT.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verificar si el encabezado Authorization está presente
    if (!authHeader) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // Extraer el token del encabezado Authorization
    const token = authHeader.split(' ')[1]; // Espera el formato "Bearer <token>"

    if (!token) {
        return res.status(403).json({ error: 'Token no válido' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err.message);
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        // Almacenar los datos decodificados del token en la solicitud
        req.user = decoded;
        next(); // Continuar con el siguiente middleware o controlador
    });
};

module.exports = verifyToken;
