import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private _toastr: ToastrService) {}

  succesToastr(msg: any) {
    this._toastr.success(msg);
  }

  errorToaster(msg: any) {
    this._toastr.error(msg);
  }
}
