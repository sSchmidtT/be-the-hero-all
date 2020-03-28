const connection = require('../database/connection');

module.exports = {
    async list(request, response){
        const {page = 1, qnt = 5} = request.query;
        const ong_id = request.headers.authorization;
        var incidents, count;
        console.log(ong_id);
        if(ong_id != undefined){
            const [_count]  = await connection('incidents')
            .where('ong_id', ong_id)
            .count();

            count = _count;

            incidents = await connection('incidents')
            .limit(qnt)
            .offset((page - 1) * qnt)
            .where('ong_id', ong_id)
            .select("*")
        }
        else{
            const [_count]  = await connection('incidents')
            .count();

            count = _count;

            incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(qnt)
            .offset((page - 1) * qnt)
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
        }
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },



    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
}