export interface IShip {
  ship: {
    name: string;
    image: string;
    id: string;
    active: boolean;
    home_port: string;
    weight_lbs?: undefined | number;
    url: string;
    missions: Array<Mission>;
  };
}

export interface Mission {
  name: string;
  flight: string;
}
