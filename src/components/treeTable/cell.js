export default {
    name: 'cell',
    functional: true,
    props: {
        row: Object,
        parentNode: Object,
        render: Function,
        index: Number,
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            parentNode: ctx.props.parentNode || '',
            index: ctx.props.index
        }

        return ctx.props.render(h, params)
    }
};