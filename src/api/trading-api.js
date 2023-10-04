export default function(instance) {
    return {
        createLimit(body) {
            return instance.post(`/orders/build/limit`, body)
        },
    }
}

