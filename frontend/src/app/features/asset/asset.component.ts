import { Component, inject, OnInit } from '@angular/core';
import { FileListService } from '../../core/service/file-list.service';
import { FileDownloadService } from '../../core/service/file-download.service';
import { AssetService } from '../../core/service/asset.service';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '../../core/model/entities/asset';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset',
  imports: [CommonModule],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss'
})
export class AssetComponent implements OnInit{

  fileListService = inject(FileListService);
  fileDownloadService = inject(FileDownloadService);
  assetService = inject(AssetService);
  private route = inject(ActivatedRoute);
  id: string = "";
  fileNames: string[] = [];

  asset:Asset |undefined;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id!;
    this.assetService.getAssetById(+id!).subscribe({
      next: (asset) =>{
        this.asset=asset;
        this.fileListService.getAssetFilesList(asset.course.id!, asset.name).subscribe({
          next: (assets) => {
            this.fileNames = assets;
            console.log(assets);
          }
        })
      }
    })
  }
    downloadFile(fileName: string) {
   
        this.fileDownloadService.downloadAsset(
         this.asset?.course.id!,
         fileName+"/"+fileName,
         this.asset?.name!
        ).subscribe({
          next: (blob) => {
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
          },
          error: (err) => {
            console.error('Download failed', err);
          }
        });
  }
}
