import { Server } from 'miragejs';


export default function routes(this: Server) {
  this.namespace = '/api';

  // Get all places
  this.get("/places", (schema: any) => schema.places.all());

  // Get all places by a user
  this.get('/places/user/:uid', (schema: any, request) => {
    const uid = request.params.uid;
    let user = schema.users.find(uid);
    return { places: user ? user.places.models : [] };
  });

   // Get place by id
  this.get('/places/:pid', (schema: any, request) => {
    const pid = request.params.pid;
    return schema.places.find(pid);
  })

  // Add new place
  this.post('/places', (schema: any, request) => {
    let data = JSON.parse(request.requestBody);
    return schema.places.create(data);
  });

  // Update a place [title and description]
  this.patch("/places/:pid", (schema: any, request) => {
    const pid = request.params.pid;
    const data = JSON.parse(request.requestBody);
    const place =  schema.places.find(pid);
    return place.update(data);
  })

  // Delete a place
  this.delete('/places/:pid', (schema: any, request) => {
    const pid = request.params.pid;
    const place =  schema.places.find(pid);
    return place.destroy();
  })
  
  // Get all users
  this.get('/users', (schema: any) => schema.users.all());
}