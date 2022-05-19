
class Hanshan {
    private _template: object;
    private _container: HTMLElement | null;

    constructor(tpl: object) {
        this._template = tpl
        this._container = document.body
    }

    render() {

    }

    mount(root: string | HTMLElement) {
        if (typeof root == 'string') {
            this._container = document.querySelector(root)
        } else {
            this._container = root
        }
    }
}

export default Hanshan