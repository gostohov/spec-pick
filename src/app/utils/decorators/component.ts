const _defineProperty = (target: Object, name: string | symbol, action: Function) => {
    (
        Object.defineProperty(target, name, {
            value: action,
            configurable: false,
            enumerable: false,
            writable: false,
        })
    );
};

function _template(html: string, css: string) {
    return `
      <style> ${css} </style>
      ${html}
    `;
}

interface ComponentParams {
    tag: string,
    templateUrl: string,
    styleUrl: string,
    mode?: 'open' | 'closed',
    extends?: boolean,
    shadow?: boolean,
    define?: boolean,
}

export function Component(params: ComponentParams) {
    if (!('define' in params)) {
        params['define'] = true;
    }

    return function (target: any) {
        const wcShadowCreated = Symbol('wc__shadowCreated');
        const tag = params.tag;
        
        const template = document.createElement('template');
        template.innerHTML = _template(params.templateUrl, params.styleUrl);
        
        function viewShadow(this: any) {
            if (!this.shadowRoot) this.attachShadow({ mode: params.mode });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        const newConstructor = class extends target {
            constructor(...args: []) {
                const self = super() as any;
                    
                self.initProperty();
                
                if (!params.extends) {
                    if (params.shadow) {
                        self[wcShadowCreated]();
                    } else {
                        self.appendChild(template.content.cloneNode(true));
                    }
                }

                return self;
            }
                
            initProperty() {
                super.initProperty
                && super.initProperty();
            }
            
            connectedCallback() {
                super.connectedCallback
                && super.connectedCallback();
            }
            
            disconnectedCallback() {
                super.disconnectedCallback
                && super.disconnectedCallback();
            }
            
            beforeAttributeChanged() {
                super.beforeAttributeChanged
                && super.beforeAttributeChanged();
            }
            
            attributeChangedCallback(name: any, old: any, value: any) {
                this.beforeAttributeChanged();
                super.attributeChangedCallback
                && super.attributeChangedCallback(name, old, value);
                this.afterAttributeChanged();
            }
            
            
            afterAttributeChanged() {
                super.afterAttributeChanged
                && super.afterAttributeChanged();
            }
            
            adoptedCallback() {
                super.adoptedCallback
                && super.adoptedCallback();
            }
        } as any; // Ненавижу ts

        _defineProperty(newConstructor.prototype, wcShadowCreated, viewShadow);
        if (params.define) window.customElements.define(tag, newConstructor);
    }
}