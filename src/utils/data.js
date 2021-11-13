import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'jaison',
      email: 'jaison@jaison.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'jane',
      email: 'jane@jane.com',
      password: bcrypt.hashSync('1234'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Asus Rampage',
      slug: 'asus-rampage',
      category: 'Eletronics',
      image: '/images/asus-rampage.jpeg',
      price: 1289,
      brand: 'Asus',
      rating: 4.7,
      numReviews: 10,
      countInStock: 8,
      description: 'i5 10qth, 8gb dd4, 512ssd Nve',
    },
    {
      name: 'Ssd 128 A400 Kingston',
      slug: 'ssd-128-a400-kingston',

      category: 'Eletronics',
      image: '/images/ssd-kingston.jpeg',
      price: 45,
      brand: 'Kingston',
      rating: 4.5,
      numReviews: 10,
      countInStock: 10,
      description: '10x Faster than normal Hdd',
    },
    {
      name: 'Micro Sd San Disk',
      slug: 'micro-sd-san-disk',
      category: 'Eletronics',
      image: '/images/micro-sd.jpeg',
      price: 25,
      brand: 'San Disk',
      rating: 4.1,
      numReviews: 10,
      countInStock: 50,
      description: '128Gb',
    },

    {
      name: 'EarPhones JBL',
      slug: 'earphones-jbl',
      category: 'Eletronics',
      image: '/images/jbl-phone.jpeg',
      price: 59,
      brand: 'JBL',
      rating: 4.7,
      numReviews: 10,
      countInStock: 20,
      description: 'A best phone bluetooth',
    },
    {
      name: 'Mouse Gamer Razer',
      slug: 'mouse-gamer-razer',
      category: 'Eletronics',
      image: '/images/mouse-razer.jpeg',
      price: 129,
      brand: 'Razer',
      rating: 4.6,
      numReviews: 10,
      countInStock: 10,
      description: 'The best expirience of games',
    },
    {
      name: 'Smartphone Samsung A71',
      slug: 'smartphone-samsung-a71',

      category: 'Eletronics',
      image: '/images/samsung-A71.jpeg',
      price: 599,
      brand: 'Samsung',
      rating: 4.3,
      numReviews: 10,
      countInStock: 40,
      description: '128gb 4 cameras 48mpx',
    },
  ],
};

export default data;
