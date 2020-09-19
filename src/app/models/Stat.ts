// Pokemon's statistic (ex. Attack value)

export class Stat {
  name: string;
  value: number;

  constructor(data: any = {}) {
    this.value = data.base_stat || null;
    this.name = data.stat.name || '';
  }
}
