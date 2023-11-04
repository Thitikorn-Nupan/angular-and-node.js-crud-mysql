class Tutorial {

  private _tid! : number
  private _title! : string
  private _description! : string
  private _published! : boolean
  /*
    Tutorial {_tid: 8, _title: 'Kotlin + Andriod Studio', _description: 'https://github.com/ttknpde-v', _published: 'true'}
  */

  get tid(): number {
    return this._tid;
  }
  set tid(value: number) {
    this._tid = value;
  }
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
  get published(): boolean {
    return this._published;
  }
  set published(value: boolean) {
    this._published = value;
  }
}

export {
  Tutorial
}
