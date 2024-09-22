import { SignJWT } from "jose"


export abstract class TokenService{

    generateToken(id: string){
        const jwt = new SignJWT({ id });
        jwt.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')

        const privateKeyString = process.env.JWT_PRIVATE_KEY;
        if (!privateKeyString) {
            throw new Error('Clave privada JWT no definida en el entorno.');
        }

        // Convertir la clave privada de cadena a Uint8Array
        const encoder = new TextEncoder();
        const privateKey = encoder.encode(privateKeyString);

        return jwt.sign(privateKey);

    }
}