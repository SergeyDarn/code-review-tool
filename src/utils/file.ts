export function getExtensionFromFile(file: string): string {
    if (!file) {
        return '';
    }

    const extensionRegexp = /\.(.*?)(((\:.*)|(\?.*)))?$/
    const extensionMatch = file.match(extensionRegexp);

    return extensionMatch ? extensionMatch[1] : '';
}

export function downloadJson(
    data: object,
    fileName: string
) {
    const dataStr = JSON.stringify(data);
    const dataHref = `data:text/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const el = document.createElement('a');
    el.setAttribute('href', dataHref);
    el.setAttribute('download', `${fileName}.json`);

    document.body.appendChild(el);
    el.click();
    el.remove();
}

const READ_FILE_ERROR = 'Ошибка при чтении файла'
const NOT_JSON_ERROR = 'Файл не является json';
const JSON_PARSE_ERROR = 'Ошибка при чтении файла как json';

export async function readFile(file: File, isJson = false): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (ev) {
            const fileContent = ev.target?.result;

            if (!fileContent) {
                reject(READ_FILE_ERROR);
            }

            if (!isJson) {
                resolve(fileContent);
            }

            if (typeof fileContent !== 'string') {
                reject(NOT_JSON_ERROR);
            }

            try {
                const result = JSON.parse(fileContent as string);

                resolve(result);
            } catch (err) {
                console.error(`${JSON_PARSE_ERROR}: ${err}`)
                reject(JSON_PARSE_ERROR);
            }
        };

        reader.onerror = function (ev) {
            console.error(`${READ_FILE_ERROR}: ${ev.target?.error}`);
            reject(READ_FILE_ERROR);
        }

        reader.readAsText(file);
    })
}
