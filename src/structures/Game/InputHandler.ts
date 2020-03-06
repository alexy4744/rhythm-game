import Staff from "@/structures/Staff";

class InputHandler {
  public constructor(private _staff: Staff) {}

  public get staff() {
    return this._staff;
  }
}

export default InputHandler;
