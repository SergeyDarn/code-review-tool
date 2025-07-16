export function getExtensionFromFile(file: string): string {
    if (!file) {
        return '';
    }

    const extensionRegexp = /\.(.*?)(((\:.*)|(\?.*)))?$/
    const extensionMatch = file.match(extensionRegexp);

    return extensionMatch ? extensionMatch[1] : '';
}
