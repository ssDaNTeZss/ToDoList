import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateConvert"
})
export class DateConvertPipe implements PipeTransform {

  transform(value: string): string {

    let date = {
      Year: new Date().getFullYear(),
      Month: new Date().getMonth() + 1,
      Date: new Date().getDate(),
    };

    let dateString = date.Year + "-";

    if (date.Month < 10) {
      dateString = dateString + "0" + String(date.Month);
    } else {
      dateString = dateString + String(date.Month);
    }
    dateString = dateString + "-" + date.Date;

    const str = value.split(".");
    const valueStr = str[2] + "-" + str[1] + "-" + str[0];

    const newDate = new Date(dateString);
    const valueDate = new Date(valueStr);
    const differenceInDays = (newDate.getTime() - valueDate.getTime()) / (1000 * 60 * 60 * 24);

    if (differenceInDays === 0) {
      return "сегодня";
    }
    if (differenceInDays === 1) {
      return "вчера";
    }
    if (differenceInDays > 1 && differenceInDays < 5) {
      return `${differenceInDays} дня назад`;
    }
    if (differenceInDays < 14) {
      return `${differenceInDays} дней назад`;
    }

    return value;
  }
}
