import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
export class Action {
  actionType: string;
  func: (..._args: any) => any;

  constructor(name: string, func: () => any) {
    this.actionType = name;
    this.func = func;
  }
}

export const ActionsFactory = {
  _internel: {} as { [key: string]: (..._args: any) => any },
  register(name: string, func: (..._args: any) => any) {
    if (this.get(name)) {
      console.log('Action重复注册，覆盖已有Action:', name);
    }
    this._internel[name] = func;
  },
  get(name: string) {
    return this._internel[name];
  }
};

ActionsFactory.register('alert', (config: any, ev: any) => {
  ElMessage.success(config.body);
});
