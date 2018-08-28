let mediator = function () {
    let subscribe = (channel, fn) => {
        if (!mediator.channels[channel])
            mediator.channels[channel] = []

        mediator.channels[channel].push({ context: this, callback: fn })
        return this
    }

    let publish = (channel, ...args) => {
        if (!mediator.channels[channel])
            return

        mediator.channels[channel].map(signatory =>
            signatory.callback.apply(signatory.context, ...args)
        )
        return this
    }

    return {
        channels: {},
        subscribe,
        publish,
    }
}()
