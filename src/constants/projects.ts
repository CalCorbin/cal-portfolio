import ROUTES from './routes';

interface Project {
  id: number;
  title: string;
  img: string;
  link: string;
  description: string;
}

const PROJECTS: Array<Project> = [
  {
    id: 10,
    title: 'MineSweeper',
    link: ROUTES.MINESWEEPER,
    img: 'https://images.pexels.com/photos/4811240/pexels-photo-4811240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description:
      'A simple game of MineSweeper. Click the squares to reveal the hidden mines!',
  },
  {
    id: 8,
    title: 'Chicago Art Institute Explorer',
    link: ROUTES.CHICAGOART,
    img: 'https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    description:
      'Search the Art Institute of Chicago collection for your favorite art pieces!',
  },
  {
    id: 6,
    title: 'HexClock',
    link: ROUTES.HEXCLOCK,
    img: 'https://images.unsplash.com/photo-1550534791-2677533605ab',
    description: 'A clock that changes color based on the time.',
  },
  {
    id: 7,
    title: 'Furbot: The Discord Bot',
    link: 'https://github.com/CalCorbin/furbot',
    img: 'https://images.pexels.com/photos/5418837/pexels-photo-5418837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A Discord bot for querying random information.',
  },
  {
    id: 4,
    title: 'Cat Chat',
    link: ROUTES.CATCHAT,
    img: 'https://images.unsplash.com/photo-1549545931-59bf067af9ab',
    description:
      'Chat with an ornery virtual cat. See what the cat has to say!',
  },
  {
    id: 9,
    title: 'Tic Tac Toe',
    link: ROUTES.TICTACTOE,
    img: 'https://images.pexels.com/photos/3400795/pexels-photo-3400795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A simple game of Tic Tac Toe. Click the squares to play!',
  },
  {
    id: 3,
    title: 'SpaceX GraphQL',
    link: ROUTES.SPACEX,
    img: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441',
    description: 'A simple GraphQL client for the SpaceX API.',
  },
  {
    id: 1,
    title: 'Star Trek Elevator Game',
    link: 'https://github.com/CalCorbin/elevatorGame',
    img: 'https://images.unsplash.com/photo-1550479023-2a811e19dfd3',
    description: 'Ride the elevator of the Starship Enterprise!',
  },
  {
    id: 2,
    title: 'Cacti Corral',
    link: 'https://github.com/CalCorbin/cacti-corral',
    img: 'https://images.unsplash.com/photo-1528475478853-5b89bed65c4c',
    description: 'Grow your own cactus and keep it alive!',
  },
  {
    id: 5,
    title: 'Test Driven Development',
    link: 'https://github.com/CalCorbin/cal-portfolio/blob/main/src/components/CatChat/CatChat.test.tsx',
    img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6',
    description:
      'A example of Test Driven Development using Jest and React Testing Library.',
  },
];

export default PROJECTS;
