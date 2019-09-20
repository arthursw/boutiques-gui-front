import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { ToolInfo } from './tool.model';
import { EntityService } from './shared/components/entity/entity.abstract.service';
import { ServiceLocator } from './utils/locator.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService extends EntityService<ToolInfo> {

  API_URL = 'http://localhost:9000/tool';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
    super()
  }

  getEntityInstance(entity?: ToolInfo): ToolInfo
  {
    return new ToolInfo(this);
  }

  search(query: string): Promise<ToolInfo[]> {

    let queryParameters = new HttpParams({encoder: new HttpUrlEncodingCodec()});
    if (query) {
      queryParameters = queryParameters.append('query', <any>query);
    }

    // let headers = this.defaultHeaders;


    // // to determine the Accept header
    // let httpHeaderAccepts: string[] = [
    //     'application/json',
    //     'application/xml'
    // ];
    // const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    // if (httpHeaderAcceptSelected != undefined) {
    //     headers = headers.set('Accept', httpHeaderAcceptSelected);
    // }


    return this.httpClient.get<ToolInfo[]>(`${this.API_URL}/search`,
      {
        params: queryParameters,
      }
    ).toPromise();
  }

  getAll(): Promise<ToolInfo[]> {
    return this.httpClient.get<Array<ToolInfo>>(`${this.API_URL}/all`).toPromise();
  }

  getDescriptor(toolInfoId: number): Promise<any> {
    return this.httpClient.get<any>(`${this.API_URL}/${encodeURIComponent(toolInfoId)}/descriptor`).toPromise();
  }

  getInvocation(toolInfoId: number): Promise<string> {
    return this.httpClient.get<string>(`${this.API_URL}/${encodeURIComponent(toolInfoId)}/invocation`).toPromise();
  }

  generateCommand(toolInfoId: number, invocation: string): Promise<string> {
    return this.httpClient.post<string>(`${this.API_URL}/${encodeURIComponent(toolInfoId)}/generate-command`, { invocation: invocation }, this.httpOptions).toPromise();
  }

  execute(toolInfoId: number, invocation: string): Promise<string> {
    return this.httpClient.post<string>(`${this.API_URL}/${encodeURIComponent(toolInfoId)}/execute`, { invocation: invocation }, this.httpOptions).toPromise();
  }
}
