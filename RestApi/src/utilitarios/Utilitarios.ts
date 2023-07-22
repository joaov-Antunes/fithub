import crypto from 'crypto';

class Utilitarios {
    static CRYPTO_SENHA: string = process.env.CRYPTO_SENHA;

    constructor() {}

    public static async gerarHash(valor: string): Promise<string> {
        return crypto.createHash('md5').update(valor).digest('hex');
    }
    
    public static async Encriptar(id: string): Promise<string> {
    const key = crypto.scryptSync(this.CRYPTO_SENHA, 'salt', 24);

    const iv = Buffer.alloc(16, 0);

    const cifra = crypto.createCipheriv('aes-256-ocb', key, iv);

    const cifr = cifra.update(id, 'utf8', 'hex') + cifra.final('hex');

    return cifr;
    }
    
    public static async Decriptar(idEnc: string): Promise<string> {
    const key = crypto.scryptSync(this.CRYPTO_SENHA, 'salt', 24);

    const iv = Buffer.alloc(16, 0);

    const cifra = crypto.createDecipheriv('aes-256-ocb', key, iv);

    const decr = cifra.update(idEnc, 'hex', 'utf8') + cifra.final('utf8');

    return decr;
    }
}

export default Utilitarios;