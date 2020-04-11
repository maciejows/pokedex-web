// Pokemon's statistic (ex. Attack value)

export class Stat {
  name: string;
  value: number;

  constructor(properties: any){
    this.value = properties.base_stat;
    this.name = properties.stat.name;
  }
}
