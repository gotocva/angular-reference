
import { ResponseInterface } from "./response-interface";
import { Serializer } from "./serializer-interface";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

export class HttpInterface < T extends ResponseInterface > {

	private url: string;

	constructor(private httpClient: HttpClient,private endpoint: string,private serializer: Serializer) {
		this.url = environment.url;
	}

	public setUri(uri: string){
		this.url = uri;
		return this;
	};

	public getAll(): Observable < T[] > {
		return this.httpClient
			.get(`${this.url}/${this.endpoint}`)
			.pipe(map((data: any) => this.convertData(data)));
	};

	public getOne(id: any): Observable < T > {
		let uri = `${this.url}/${this.endpoint}`;
		if(id != null && id != undefined)
			uri = `${this.url}/${this.endpoint}/${id}`;
		return this.httpClient
			.get(uri)
			.pipe(map((data: any) => this.serializer.fromJson(data) as T));
	}

	public create(item: T): Observable < T > {
		return this.httpClient
			.post < T > (`${this.url}/${this.endpoint}`, this.serializer.toJson(item))
			.pipe(map(data => this.serializer.fromJson(data) as T));
	}

	public updateOne(id: any,item: T): Observable < T > {
		let uri = `${this.url}/${this.endpoint}`;
		if(id != null && id != undefined)
			uri = `${this.url}/${this.endpoint}/${id}`;
		return this.httpClient
			.put <T> (uri, this.serializer.toJson(item))
			.pipe(map((data: any) => this.serializer.fromJson(data) as T));
	}

	public deleteOne(id: number) {
		return this.httpClient
			.delete(`${this.url}/${this.endpoint}/${id}`);
	}

	private convertData(data: any): T[] {
		return data.map(item => this.serializer.fromJson(item));
	}
}