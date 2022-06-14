interface Widget {
  type: string;
  body?: Widget;
}

interface CheckBox extends Widget {
  label: string;
  disabled: boolean;
}
interface InputWidget extends Widget {}
