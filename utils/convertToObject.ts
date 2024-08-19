export function convertToSerializableObject(leanDocument: any) {
    for (const key of Object.keys(leanDocument)) {
        if (leanDocument[key].toJSON && leanDocument[key].toString) {
            leanDocument[key] = leanDocument[key].toString();
        }
    }
    return leanDocument;
}