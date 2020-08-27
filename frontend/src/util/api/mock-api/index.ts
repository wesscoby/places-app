import { 
  createServer, Model, hasMany, belongsTo, 
  RestSerializer as RS
} from 'miragejs';

import seeds from './seeds';
import routes from './routes';


export default function mockAPI({ environment = 'development' } = {}) {
  createServer({
    environment,
    models: {
      user: Model.extend({ places: hasMany() }),
      place: Model.extend({ user: belongsTo() })
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
    routes,
  })
}