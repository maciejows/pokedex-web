export class Meta {
  count: number;
  offset: number;
  limit: number;
  next: string;
  previous: string;

  constructor(data: any = {}) {
    this.count = data.count ? data.count : null;
    this.next = data.next ? data.next : '';
    this.previous = data.previous ? data.previous : '';
    this.offset = 0;
    this.limit = 50;
  }
}
