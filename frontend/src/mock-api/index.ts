import { 
  createServer, Model, hasMany, belongsTo, 
  RestSerializer as RS
} from 'miragejs';

import seeds from './seeds'


export default function () {
  createServer({
    models: {
      user: Model.extend({
        places: hasMany()
      }),
      place: Model.extend({
        user: belongsTo()
      })
    },

    serializers: {
      user: RS.extend({
        include: ['places'],
        embed: true
      }),
      place: RS.extend({
        include: ['user'],
        embed: true
      })
    },

    seeds,

    routes() {
      this.namespace = '/api';

      this.get("/places", (schema: any) => schema.places.all());

      this.post('/places', (schema: any, request) => {
        let data = JSON.parse(request.requestBody);

        return schema.places.create(data);
      });

      this.get('/places/user/:uid', (schema: any, request) => {
        const uid = request.params.uid;
        let user = schema.users.find(uid);

        return { places: user ? user.places.models : [] };
      });

      this.get('/places/:pid', (schema: any, request) => {
        const pid = request.params.pid;

        return schema.places.find(pid);
      })

      this.patch("/places/:pid", (schema: any, request) => {
        const pid = request.params.pid;
        const data = JSON.parse(request.requestBody);

        const place =  schema.places.find(pid);
        return place.update(data);
      })

      this.get('/users', (schema: any) => schema.users.all())
    },
  })
}