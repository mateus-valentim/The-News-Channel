import Image from '@tiptap/extension-image';

export const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            align: {
                default: 'center',
                parseHTML: (element) => element.getAttribute('data-align') || 'center',
                renderHTML: (attributes) => {
                    if (attributes.align === 'left') {
                        return {
                            'data-align': 'left',
                            style: 'float: left; margin: 0.5rem 1rem 0.5rem 0; clear: none;',
                        };
                    }
                    if (attributes.align === 'right') {
                        return {
                            'data-align': 'right',
                            style: 'float: right; margin: 0.5rem 0 0.5rem 1rem; clear: none;',
                        };
                    }
                    return {
                        'data-align': 'center',
                        style: 'display: block; margin: 1rem auto; clear: both;',
                    };
                },
            },
            width: {
                default: '100%',
                parseHTML: (element) => element.getAttribute('width') || '100%',
                renderHTML: (attributes) => {
                    return {
                        width: attributes.width,
                    };
                },
            }
        };
    },
});