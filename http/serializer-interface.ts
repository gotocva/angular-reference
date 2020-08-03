
import { ResponseInterface } from "./response-interface";

export interface Serializer {
    fromJson(json: any): ResponseInterface;
    toJson(resource: ResponseInterface): any;
}