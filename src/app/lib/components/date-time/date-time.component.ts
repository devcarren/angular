import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeComponent
  extends BaseFormControlComponent
  implements OnInit
{
  @Input() defaulDTM = false;
  dateTxt!: Date | undefined | null;
  hh = '00';
  mm = '00';

  constructor(private _cdRef: ChangeDetectorRef) {
    super();
    this._cDref = _cdRef;
  }

  override ngOnInit() {
    if (this.getFieldValue()) {
      let txt = this.getFieldValueToken(' ', 0);
      this.dateTxt = this.getDateFromTxt(txt);
      let other = this.getFieldValueToken(' ', 1);
      this.hh = super.getTxtTokenValue(other, ':', 0);
      this.mm = super.getTxtTokenValue(other, ':', 1);
    } else if (this.defaulDTM) {
      this.setToCurrentDateTime();
    }
  }

  setDateTime(dateStr: string) {
    let txt = this.getTxtTokenValue(dateStr, ' ', 0);
    this.dateTxt = this.getDateFromTxt(txt);
    let other = this.getTxtTokenValue(dateStr, ' ', 1);
    this.hh = super.getTxtTokenValue(other, ':', 0);
    this.mm = super.getTxtTokenValue(other, ':', 1);
  }

  setToCurrentDateTime() {
    const d = new Date();
    this.dateTxt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    this.hh = d.getHours() + '';
    this.mm = d.getMinutes() + '';
    this.setFieldValue(this.getDateString() + ' ' + this.hh + ':' + this.mm);
  }

  getDateFromTxt(txt: string) {
    if (txt !== null && txt.trim() !== '')
      return new Date(
        parseInt(super.getTxtTokenValue(txt, '/', 2)),
        parseInt(super.getTxtTokenValue(txt, '/', 1)) - 1,
        parseInt(super.getTxtTokenValue(txt, '/', 0))
      );
    else return null;
  }

  dtBlur(event: any) {
    let d = this.getDateFromTxt(event.currentTarget.value);
    if (!d || !d.getDate()) {
      this.dateTxt = null;
      super.setFieldValue('');
    } else {
      this.dateTxt = new Date(
        parseInt(super.getTxtTokenValue(event.currentTarget.value, '/', 2)),
        parseInt(super.getTxtTokenValue(event.currentTarget.value, '/', 1)) - 1,
        parseInt(super.getTxtTokenValue(event.currentTarget.value, '/', 0))
      );
      super.setFieldValue(
        event.currentTarget.value + ' ' + this.hh + ':' + this.mm
      );
    }
  }

  dtDown(event: any) {
    if (
      !super.isClearKeys(event) &&
      !super.isNumberPressed(event) &&
      !super.isFowardSlash(event) &&
      !super.isHelperKeys(event)
    ) {
      super.stopDefaultBehaviour(event);
      return false;
    }
    return true;
  }

  dtUp(event: any) {
    // if (super.isClearKeys(event) || super.isNumberPressed(event)) {
    //   this.dateTxt = event.currentTarget.value;
    //   super.setFieldValue(event.currentTarget.value + ' ' + this.hh + ':' + this.mm);
    // }
  }

  hhDown(event: any) {
    if (
      !super.isClearKeys(event) &&
      !super.isNumberPressed(event) &&
      !super.isHelperKeys(event)
    ) {
      super.stopDefaultBehaviour(event);
      return false;
    }
    return true;
  }

  hhUp(event: any) {
    if (super.isClearKeys(event) || super.isNumberPressed(event)) {
      this.hh = event.currentTarget.value;
      super.setFieldValue(this.getDateString() + ' ' + this.hh + ':' + this.mm);
    } else if (!super.isHelperKeys(event)) {
      super.stopDefaultBehaviour(event);
    }
  }

  mmDown(event: any) {
    if (
      !super.isClearKeys(event) &&
      !super.isNumberPressed(event) &&
      !super.isHelperKeys(event)
    ) {
      super.stopDefaultBehaviour(event);
      return false;
    }
    return true;
  }

  mmUp(event: any) {
    if (super.isClearKeys(event) || super.isNumberPressed(event)) {
      this.mm = event.currentTarget.value;
      let str = this.getDateString() + ' ' + this.hh + ':' + this.mm;
      super.setFieldValue(str);
    } else if (!super.isHelperKeys(event)) {
      super.stopDefaultBehaviour(event);
    }
  }

  getDateString() {
    try {
      let str =
        this.dateTxt?.getDate() +
        '/' +
        (this.dateTxt!.getMonth() + 1) +
        '/' +
        this.dateTxt?.getFullYear();
      return str;
    } catch (e) {}
    return '';
  }

  dateUpdate(event: any) {
    if (event.value !== null) {
      let day = event.value.date();
      let month = event.value.month();
      let year = event.value.year();
      let dstr = day + '/' + month + '/' + year;
      this.dateTxt = new Date(year, month, day);
      super.setFieldValue(dstr + ' ' + this.hh + ':' + this.mm);
    } else {
      this.dateTxt = null;
      super.setFieldValue('');
    }
  }
}
