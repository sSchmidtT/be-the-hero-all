const crypto = require('crypto');
const connection = require('../database/connection');
module.exports = {
    async list (request, response){
        const ongs = await connection('ongs').select('*');
    
        console.log(ongs);
    
        return response.json(ongs)
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        console.log(id);

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({
            message:'ONG criado com sucesso!',
            id
        })
    }
};