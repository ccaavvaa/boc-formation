exports.entities = {
    Person: {
        properties: {
            initials: { type: "string", isCalculated: true }
        }
    },
    Project: {
        properties: {
            isDone: {
                type: "boolean"
            }
        }
    }
}