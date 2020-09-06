export class Meta {
  count: number;
  next: string;
  previous: string;

  constructor(data: any = {}) {
    this.count = data.count ? data.count : null;
    this.next = data.next ? data.next : '';
    this.previous = data.previous ? data.previous : '';
  }
}
