import {loginHandler} from './login'

// TODO: return promise from subscribe and publish
let mediator = function () {
    let subscribe = function (channel, fn)  {

        if (!mediator.channels[channel])
            mediator.channels[channel] = []

        mediator.channels[channel].push({ context: this, callback: fn })
        return this
    }

    let publish = function(channel, ...args) {
        if (!mediator.channels[channel])
            return

        return mediator.channels[channel].map(signatory =>
            signatory.callback.apply(signatory.context, args)
        )
    }

    return {
        channels: {},
        subscribe,
        publish,
    }
}()

mediator.subscribe('LOGIN', loginHandler)

export default mediator
