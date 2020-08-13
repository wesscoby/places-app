import { Server, ModelInstance } from 'miragejs';

import { LatLng } from '../types';


interface User {
  name: string;
  email: string;
  image: string;
}

interface Place {
  title: string;
  description: string;
  address: string;
  location: LatLng,
  image: string;
  user: any;
}

export default function seeds(server: Server) {
  let darda = server.create<string, ModelInstance<User>, User>('user', {
    "name": "Darda Gouldstone",
    "email": "dgouldstone0@umich.edu",
    "image": "https://robohash.org/infacereut.png?size=250x250&set=set1"
  });

  let olivero = server.create<string, ModelInstance<User>, User>('user', {
    "name": "Olivero Sawday",
  "email": "osawday1@tamu.edu",
  "image": "https://robohash.org/estmollitiaquo.png?size=250x250&set=set1"
  });

  let ranice = server.create<string, ModelInstance<User>, User>('user', {
    "name": "Ranice Farries",
  "email": "rfarries2@joomla.org",
  "image": "https://robohash.org/enimveniamveritatis.png?size=250x250&set=set1"
  });

  let ab = server.create<string, ModelInstance<User>, User>('user', {
  "name": "Ab Matterson",
  "email": "amatterson3@go.com",
  "image": "https://robohash.org/atautemex.png?size=250x250&set=set1"
  });

  server.create<string, ModelInstance<Place>, Place>("place", {
    user: darda,
    title: "New Life Children's Home",
    description: 'A registered non-governmental and non-profit making organization founded from a call burning desire to aid the development of the homeless orphans in Ghana',
    address: 'Near Junction Mall, Nungua',
    location: {
      lat: 5.611074,
      lng: -0.069404
    },
    image: 'https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1518452946/p/photo/image/2433418/Scene_2a.jpg',
  });

  server.create<string, ModelInstance<Place>, Place>('place', {
    title: 'Skyplex Pictures',
    description: 'Skyplex pictures deals in all Your Wedding Events, Model Shoot, Parties, Conference, Graduation etc.',
    address: 'Near Wassaman, Community Two',
    location: {
      lat: 5.630065,
      lng: -0.016705
    },
    image: 'https://scontent.facc5-1.fna.fbcdn.net/v/t1.0-9/86870657_2408366526050660_8096142867698810880_n.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_eui2=AeHqyz1MVE9aVDRjRRMiryKVny2Jj8x6ZrKfLYmPzHpmsgJ2xRnJvyRPD94M_GGdPyZtNyuXrcPln6pqhGqPkbR6&_nc_ohc=KVKGlS-kENIAX9vGIs5&_nc_ht=scontent.facc5-1.fna&oh=0a34ffa7b8c0efca1e250dd70bd4ee5d&oe=5F557EFE',
    user: darda
  });

  server.create<string, ModelInstance<Place>, Place>('place', {
    title: 'iSpace Foundation',
    description: 'iSpace Foundation is an Innovation and Technology hub in Accra, Ghana founded in February 2013. iSpace is known to offer a conducive environment for growth in the Startup Ecosystem by providing a working space, Training and Mentoring, access to Funding and other facilities for Entrepreneurs and Start-ups to launch and manage their business ideas. ',
    address: 'No 14 Otu Adzin Rd, Spintex',
    location: {
      lat: 5.639522,
      lng: -0.093145
    },
    image: 'https://static.wixstatic.com/media/a6e9b3_b98926fd21b94bf8adbfd8a5c6c7ac40~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_366,h_206,al_c,q_80,usm_0.66_1.00_0.01/IMG_7714_JPG.webp',
    user: olivero
  })
}