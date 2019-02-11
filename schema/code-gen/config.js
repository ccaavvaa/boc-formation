exports.entities = {
    Person: {
        properties: {
            initials: { type: "string", isCalculated: true }
        },
        links: {
            getFullName: {
                returnType: 'string'
            }
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