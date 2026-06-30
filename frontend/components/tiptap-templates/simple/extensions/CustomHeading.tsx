import Heading from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/core';


export const CustomHeading = Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel ? node.attrs.level : this.options.levels[0];


        const classes: Record<number, string> = {
            1: 'text-4xl font-bold mt-8 mb-4 text-gray-900 font-title',
            2: 'text-3xl font-semibold mt-6 mb-3 text-gray-900 font-title',
            3: 'text-2xl font-semibold mt-4 mb-2 text-gray-900 font-title',
            4: 'text-xl font-semibold mt-4 mb-2 text-gray-900 font-title',
        };

        return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: classes[level],
            }),
            0,
        ];
    },
});
