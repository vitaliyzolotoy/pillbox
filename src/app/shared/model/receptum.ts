export class Receptum {
  constructor(
    public $key: string,
    public scheduleItemId: string,
    public name: string,
    public dose: number,
    public quantity: number,
    public repeat: boolean,
    public day: string,
    public type: string,
    public unit: string) { }

    // get isRed () {
    //   return this.color && this.color.includes('red');
    // }

    static fromJsonList(array): Receptum[] {
      return array.map(json => Receptum.fromJson(json));
    }

    static fromJson({
      $key,
      scheduleItemId,
      name,
      dose,
      quantity,
      repeat,
      day,
      type,
      unit
    }): Receptum {
      return new Receptum(
        $key,
        scheduleItemId,
        name,
        dose,
        quantity,
        repeat,
        day,
        type,
        unit
      );
    }
}
