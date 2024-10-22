import ROUTES from './routes';

interface Project {
  id: number;
  title: string;
  img: string;
  link: string;
  hasBackButton: boolean;
}

const PROJECTS: Array<Project> = [
  {
    id: 10,
    title: 'MineSweeper',
    link: ROUTES.MINESWEEPER,
    img: 'https://images.pexels.com/photos/4811240/pexels-photo-4811240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hasBackButton: false,
  },
  {
    id: 8,
    title: 'Art Institute of Chicago Search',
    link: ROUTES.CHICAGOART,
    img: 'https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    hasBackButton: false,
  },
  {
    id: 6,
    title: 'HexClock',
    link: ROUTES.HEXCLOCK,
    img: 'https://images.unsplash.com/photo-1550534791-2677533605ab',
    hasBackButton: false,
  },
  {
    id: 7,
    title: 'Furbot: The Discord Bot',
    link: 'https://github.com/CalCorbin/furbot',
    img: 'https://images.pexels.com/photos/5418837/pexels-photo-5418837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hasBackButton: false,
  },
  {
    id: 4,
    title: 'Cat Chat',
    link: ROUTES.CATCHAT,
    img: 'https://images.unsplash.com/photo-1549545931-59bf067af9ab',
    hasBackButton: false,
  },

  {
    id: 9,
    title: 'Tic Tac Toe',
    link: ROUTES.TICTACTOE,
    img: 'https://images.pexels.com/photos/3400795/pexels-photo-3400795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hasBackButton: false,
  },
  {
    id: 3,
    title: 'SpaceX GraphQL',
    link: ROUTES.SPACEX,
    img: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441',
    hasBackButton: false,
  },
  {
    id: 1,
    title: 'Star Trek Elevator Game',
    link: 'https://github.com/CalCorbin/elevatorGame',
    img: 'https://images.unsplash.com/photo-1550479023-2a811e19dfd3',
    hasBackButton: false,
  },
  {
    id: 2,
    title: 'Cacti Corral',
    link: 'https://github.com/CalCorbin/cacti-corral',
    img: 'https://images.unsplash.com/photo-1528475478853-5b89bed65c4c',
    hasBackButton: false,
  },
  {
    id: 5,
    title: 'Test Driven Development',
    link: 'https://github.com/CalCorbin/cal-portfolio/blob/master/src/components/CatChat/CatChat.test.tsx',
    img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6',
    hasBackButton: false,
  },
];

export default PROJECTS;
