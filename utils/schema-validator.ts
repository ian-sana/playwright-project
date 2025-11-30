import fs from 'fs/promises';
import path from 'path';
import Ajv from 'ajv';

const SCHEMA_DIR = path.resolve("./response-schemas");
const ajv = new Ajv({ allErrors: true });

export async function validateSchema(schemaFile: string, data: object) {
    const schema = await loadSchema(schemaFile);
    const validate = ajv.compile(schema);

    const valid = validate(data);
    if (!valid) {
        // console.log(validate.errors)
        const errorMessage = ajv.errorsText(validate.errors, { separator: "\n" });
        throw new Error(`Schema validation failed in ${schemaFile}_schema.json:\n${errorMessage}` +
        `\n\nResponse Data:\n${JSON.stringify(data, null, 4)}`);
    }
}

async function loadSchema(schemaFile: string) {
    const fullPath = path.join(SCHEMA_DIR, `${schemaFile}_schema.json`);
    try {
        const schemaData = await fs.readFile(fullPath, 'utf-8');
        return JSON.parse(schemaData);
    } catch (error) {
        throw new Error(`Failed to load schema from ${fullPath}: ${error}`);
    }
}