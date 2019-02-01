export class ScheduleItem {
  constructor(
    public $key: string,
    public id: number,
    public name: string,
    public fullName: string,
    public day: {
      name: string,
      fullName: string
    },
    public receptums: any,
    public week: any,
    public date: any) { }

    // get isRed () {
    //   return this.color && this.color.includes('red');
    // }

    static fromJsonList(array): ScheduleItem[] {
      return array.map(json => ScheduleItem.fromJson(json));
    }

    static fromJson({
      $key,
      id,
      name,
      fullName,
      day,
      receptums,
      week,
      date
    }): ScheduleItem {
      return new ScheduleItem(
        $key,
        id,
        name,
        fullName,
        day,
        receptums,
        week,
        date
      );
    }
}
