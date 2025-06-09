import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../model/entities/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAssets(): Observable<Asset[]>
  {
    return this.http.get<Asset[]>(`${this.apiServerUrl}/asset/all`);
  }

  public getAssetsByCourse(id: number): Observable<Asset[]>
  {
    return this.http.get<Asset[]>(`${this.apiServerUrl}/asset/find/course/${id}`);
  }

  public getAssetById(id: number): Observable<Asset>
  {
   return this.http.get<Asset>(`${this.apiServerUrl}/asset/find/${id}`); 
  }

  public addAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(`${this.apiServerUrl}/asset/add`, asset);
  }

  public updateAsset(asset: Asset): Observable<Asset>{
    return this.http.put<Asset>(`${this.apiServerUrl}/asset/update`, asset)
  }

  public deleteAsset(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/asset/delete/${id}`)
  }

}
