
// common keys in all response 
export class ResponseInterface {
    status: boolean;
    message: string;
}

export class Pizza extends ResponseInterface {
    name: string;
    cookedOn: any;
}
export class PizzaSerializer {
    fromJson(json: any): Pizza {
      const pizza = new Pizza();
      pizza.name = json.name;
      pizza.cookedOn = moment(json.cookedOn, 'mm-dd-yyyy hh:mm');
  
      return pizza;
    }
  
    toJson(pizza: Pizza): any {
      return {
        id: pizza.id,
        name: pizza.name
      };
    }
}

export class HttpInterface<T extends ResponseInterface> {

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string,
        private serializer: Serializer
    ) {}
    
      public create(item: T): Observable<T> {
        return this.httpClient
          .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item))
          .pipe(map(data => this.serializer.fromJson(data) as T));
      }
    
      public update(item: T): Observable<T> {
        return this.httpClient
          .put<T>(`${this.url}/${this.endpoint}/${item.id}`,
            this.serializer.toJson(item))
          .pipe(map(data => this.serializer.fromJson(data) as T));
      }
    
      read(id: number): Observable<T> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/${id}`)
          .pipe(map((data: any) => this.serializer.fromJson(data) as T));
      }
    
      list(queryOptions: QueryOptions): Observable<T[]> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`)
          .pipe(map((data: any) => this.convertData(data.items)));
      }
    
      delete(id: number) {
        return this.httpClient
          .delete(`${this.url}/${this.endpoint}/${id}`);
      }
    
      private convertData(data: any): T[] {
        return data.map(item => this.serializer.fromJson(item));
      }
}